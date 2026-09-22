import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // =========================
  // ADMIN SIGN UP
  // =========================
  async signup(
    name: string,
    email: string,
    password: string,
  ) {
    // Check if admin already exists
    const existingAdmin = await this.prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (existingAdmin) {
      throw new ConflictException(
        'An admin with this email already exists',
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const admin = await this.prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Create JWT
    const payload = {
      sub: admin.id,
      email: admin.email,
    };

    const accessToken =
      await this.jwtService.signAsync(payload);

    return {
      message: 'Admin account created successfully',
      accessToken,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    };
  }

  // =========================
  // ADMIN LOGIN
  // =========================
  async login(email: string, password: string) {
    const admin = await this.prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (!admin) {
      throw new UnauthorizedException(
        'Invalid email or password',
      );
    }

    const passwordValid = await bcrypt.compare(
      password,
      admin.password,
    );

    if (!passwordValid) {
      throw new UnauthorizedException(
        'Invalid email or password',
      );
    }

    const payload = {
      sub: admin.id,
      email: admin.email,
    };

    const accessToken =
      await this.jwtService.signAsync(payload);

    return {
      message: 'Login successful',
      accessToken,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    };
  }
}