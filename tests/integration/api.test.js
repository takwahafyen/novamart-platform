import request from 'supertest';
import app from '../../backend/app.js';

describe('API Integration Tests', () => {
  describe('GET /api/health', () => {
    test('should return 200 with health metrics', async () => {
      const res = await request(app).get('/api/health');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('status', 'healthy');
      expect(res.body).toHaveProperty('timestamp');
      expect(res.body).toHaveProperty('uptime');
      expect(res.body).toHaveProperty('database');
    });
  });

  describe('404 Route Handler', () => {
    test('should return 404 for unknown API endpoints', async () => {
      const res = await request(app).get('/api/does-not-exist');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Route /api/does-not-exist not found');
    });
  });

  describe('Authentication Guard Integration', () => {
    test('GET /api/orders should reject unauthorized requests with 401', async () => {
      const res = await request(app).get('/api/orders');

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message');
    });

    test('GET /api/dashboard/dashboard-data should reject unauthorized requests with 401', async () => {
      const res = await request(app).get('/api/dashboard/dashboard-data');

      expect(res.status).toBe(401);
    });

    test('POST /api/categories should reject unauthorized requests with 401', async () => {
      const res = await request(app).post('/api/categories').send({ name: 'Electronics' });

      expect(res.status).toBe(401);
    });

    test('POST /api/products should reject unauthorized requests with 401', async () => {
      const res = await request(app).post('/api/products').send({ name: 'Sneakers' });

      expect(res.status).toBe(401);
    });
  });

  describe('Input Validation Integration', () => {
    test('POST /api/users/register should reject empty body with 400 and validation errors', async () => {
      const res = await request(app).post('/api/users/register').send({});

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Validation failed');
      expect(Array.isArray(res.body.errors)).toBe(true);
      expect(res.body.errors.length).toBeGreaterThanOrEqual(1);
    });

    test('POST /api/users/register should reject weak password with 400', async () => {
      const res = await request(app).post('/api/users/register').send({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        password: 'weak',
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Validation failed');
      expect(res.body.errors.some((e) => e.field === 'password')).toBe(true);
    });

    test('POST /api/users/login should reject invalid email with 400', async () => {
      const res = await request(app).post('/api/users/login').send({
        email: 'not-an-email',
        password: 'SomePassword1',
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Validation failed');
      expect(res.body.errors.some((e) => e.field === 'email')).toBe(true);
    });
  });
});
