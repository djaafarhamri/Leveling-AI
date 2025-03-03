import request from 'supertest';
import app from '../../index'; // Adjust path to your Express app
import prisma from '../../prisma/prismaClient';

// Clean up between tests
beforeEach(async () => {
  await prisma.user.deleteMany({});
});

describe('User API', () => {
  it('should create a new user', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
    };

    const response = await request(app).post('/api/users').send(userData).expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(userData.name);
    expect(response.body.email).toBe(userData.email);
  });

  it('should get all users', async () => {
    // Create test user first
    await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'test@example.com',
      },
    });

    const response = await request(app).get('/api/users').expect(200);

    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
  });
});
