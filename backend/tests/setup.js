import prisma from '../prisma/prismaClient';

beforeAll(async () => {
  // Connect to the database
  await prisma.$connect();

  // Clean up the database before tests
  // WARNING: This will delete data in your test database
  // Make sure you're using a separate test database!
  // await prisma.$executeRaw('TRUNCATE TABLE "User" CASCADE;');
  // Add other tables as needed
});

afterAll(async () => {
  // Disconnect after tests are complete
  await prisma.$disconnect();
});

// Make Prisma available globally for tests
global.prisma = prisma;
