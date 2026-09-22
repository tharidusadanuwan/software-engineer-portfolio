import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const password = await bcrypt.hash('Admin@12345', 10);

  const admin = await prisma.admin.upsert({
    where: {
      email: 'admin@portfolio.com',
    },

    update: {},

    create: {
      name: 'Portfolio Admin',
      email: 'admin@portfolio.com',
      password,
    },
  });

  console.log('-----------------------------------');
  console.log('Admin account created successfully');
  console.log('Email:', admin.email);
  console.log('-----------------------------------');
}

main()
  .catch((error) => {
    console.error('Seed error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });