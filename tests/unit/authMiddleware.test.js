import { describe, test, expect, beforeEach, vi } from 'vitest';
import jwt from 'jsonwebtoken';
import { protect, admin } from '../../backend/middlewares/authMiddleware.js';
import User from '../../backend/models/User.mjs';

process.env.JWT_SECRET = 'test_secret_key_12345';

describe('Auth Middleware - protect', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    next = vi.fn();
    vi.clearAllMocks();
  });

  test('should return 401 if no authorization header is provided', async () => {
    await protect(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.stringMatching(/Not authorized/i) })
    );
    expect(next).not.toHaveBeenCalled();
  });

  test('should return 401 if authorization header does not start with Bearer', async () => {
    req.headers.authorization = 'Basic somerandomtoken';

    await protect(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  test('should return 401 if token is invalid or tampered', async () => {
    req.headers.authorization = 'Bearer invalid.token.value';

    await protect(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized, token invalid' });
    expect(next).not.toHaveBeenCalled();
  });

  test('should return 401 if token is valid but user no longer exists in database', async () => {
    const validToken = jwt.sign({ userId: '507f1f77bcf86cd799439011' }, process.env.JWT_SECRET);
    req.headers.authorization = `Bearer ${validToken}`;

    vi.spyOn(User, 'findById').mockReturnValue({
      select: vi.fn().mockResolvedValue(null),
    });

    await protect(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    expect(next).not.toHaveBeenCalled();
  });

  test('should attach user to req.user and call next() on valid token', async () => {
    const mockUser = {
      _id: '507f1f77bcf86cd799439011',
      firstName: 'Alice',
      email: 'alice@example.com',
      isAdmin: false,
    };

    const validToken = jwt.sign({ userId: mockUser._id }, process.env.JWT_SECRET);
    req.headers.authorization = `Bearer ${validToken}`;

    vi.spyOn(User, 'findById').mockReturnValue({
      select: vi.fn().mockResolvedValue(mockUser),
    });

    await protect(req, res, next);

    expect(req.user).toEqual(mockUser);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });
});

describe('Auth Middleware - admin', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    next = vi.fn();
  });

  test('should return 403 if req.user is missing', () => {
    req = {};
    admin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.stringMatching(/admin/i) })
    );
    expect(next).not.toHaveBeenCalled();
  });

  test('should return 403 if req.user.isAdmin is false', () => {
    req = { user: { isAdmin: false } };
    admin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.stringMatching(/admin/i) })
    );
    expect(next).not.toHaveBeenCalled();
  });

  test('should call next() if req.user.isAdmin is true', () => {
    req = { user: { isAdmin: true } };
    admin(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });
});
