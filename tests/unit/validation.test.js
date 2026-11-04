import {
  registerSchema,
  loginSchema,
  createOrderSchema,
  addProductSchema,
} from '../../backend/validators/schemas.js';
import { validate } from '../../backend/middlewares/validate.js';

describe('Validation Schemas - Unit Tests', () => {
  describe('registerSchema', () => {
    test('should reject passwords shorter than 8 characters', () => {
      const payload = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'Pass1',
      };
      const result = registerSchema.safeParse(payload);
      expect(result.success).toBe(false);
      expect(result.error.issues.some((i) => i.path.includes('password'))).toBe(true);
    });

    test('should reject passwords without uppercase letter', () => {
      const payload = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
      };
      const result = registerSchema.safeParse(payload);
      expect(result.success).toBe(false);
    });

    test('should reject invalid email formats', () => {
      const payload = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'notanemail',
        password: 'Password123',
      };
      const result = registerSchema.safeParse(payload);
      expect(result.success).toBe(false);
    });

    test('should pass valid registration credentials and normalize email', () => {
      const payload = {
        firstName: 'John',
        lastName: 'Doe',
        email: '  JOHN@EXAMPLE.COM  ',
        password: 'Password123',
      };
      const result = registerSchema.safeParse(payload);
      expect(result.success).toBe(true);
      expect(result.data.email).toBe('john@example.com');
    });
  });

  describe('createOrderSchema', () => {
    test('should reject empty items array', () => {
      const payload = {
        first_name: 'John',
        last_name: 'Doe',
        phone: '12345678',
        email: 'john@example.com',
        country: 'France',
        address: '10 Rue de Paris',
        city: 'Paris',
        state: 'IDF',
        pincode: '75001',
        items: [],
        paymentMethod: 'COD',
      };
      const result = createOrderSchema.safeParse(payload);
      expect(result.success).toBe(false);
    });

    test('should reject unsupported payment method', () => {
      const payload = {
        first_name: 'John',
        last_name: 'Doe',
        phone: '12345678',
        email: 'john@example.com',
        country: 'France',
        address: '10 Rue de Paris',
        city: 'Paris',
        state: 'IDF',
        pincode: '75001',
        items: [{ productId: '507f1f77bcf86cd799439011', qty: 2 }],
        paymentMethod: 'Bitcoin',
      };
      const result = createOrderSchema.safeParse(payload);
      expect(result.success).toBe(false);
    });

    test('should pass valid order payload', () => {
      const payload = {
        first_name: 'John',
        last_name: 'Doe',
        phone: '12345678',
        email: 'john@example.com',
        country: 'France',
        address: '10 Rue de Paris',
        city: 'Paris',
        state: 'IDF',
        pincode: '75001',
        items: [{ productId: '507f1f77bcf86cd799439011', qty: 2 }],
        paymentMethod: 'COD',
      };
      const result = createOrderSchema.safeParse(payload);
      expect(result.success).toBe(true);
    });
  });

  describe('addProductSchema', () => {
    test('should coerce numeric strings to numbers for multipart form data', () => {
      const payload = {
        name: 'Running Shoes',
        brand: 'NovaBrand',
        quantity: '50',
        categoryId: '507f1f77bcf86cd799439011',
        description: 'High quality running shoes with cushioning',
        price: '99.99',
        countInStock: '20',
      };
      const result = addProductSchema.safeParse(payload);
      expect(result.success).toBe(true);
      expect(result.data.price).toBe(99.99);
      expect(result.data.countInStock).toBe(20);
      expect(result.data.quantity).toBe(50);
    });

    test('should reject negative price', () => {
      const payload = {
        name: 'Running Shoes',
        brand: 'NovaBrand',
        quantity: 50,
        categoryId: '507f1f77bcf86cd799439011',
        description: 'High quality running shoes with cushioning',
        price: -10,
        countInStock: 20,
      };
      const result = addProductSchema.safeParse(payload);
      expect(result.success).toBe(false);
    });
  });
});

describe('Validate Middleware', () => {
  test('should return 400 with structured errors on validation failure', () => {
    const middleware = validate(loginSchema);
    const req = { body: { email: 'notanemail' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Validation failed',
        errors: expect.any(Array),
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  test('should replace req.body with parsed data and call next() on success', () => {
    const middleware = validate(loginSchema);
    const req = { body: { email: 'USER@EXAMPLE.COM', password: 'secretpassword' } };
    const res = {};
    const next = jest.fn();

    middleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(req.body.email).toBe('user@example.com');
  });
});
