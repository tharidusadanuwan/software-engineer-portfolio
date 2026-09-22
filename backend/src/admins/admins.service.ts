import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // =========================================================
  // GET ALL ADMINS
  // =========================================================

  async findAll() {
    const admins =
      await this.prisma.admin.findMany({
        orderBy: {
          id: 'asc',
        },

        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });

    return {
      admins,
    };
  }

  // =========================================================
  // GET SINGLE ADMIN
  // =========================================================

  async findOne(id: number) {
    const admin =
      await this.prisma.admin.findUnique({
        where: {
          id,
        },

        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });

    if (!admin) {
      throw new NotFoundException(
        'Admin not found',
      );
    }

    return {
      admin,
    };
  }

  // =========================================================
  // CREATE ADMIN
  // =========================================================

  async create(
    createAdminDto: CreateAdminDto,
  ) {
    const {
      name,
      email,
      password,
    } = createAdminDto;

    const normalizedEmail =
      email.trim().toLowerCase();

    // Check duplicate email

    const existingAdmin =
      await this.prisma.admin.findUnique({
        where: {
          email: normalizedEmail,
        },
      });

    if (existingAdmin) {
      throw new ConflictException(
        'An admin with this email already exists',
      );
    }

    // Hash password

    const hashedPassword =
      await bcrypt.hash(password, 12);

    const admin =
      await this.prisma.admin.create({
        data: {
          name: name.trim(),
          email: normalizedEmail,
          password: hashedPassword,
        },

        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });

    return {
      message: 'Admin created successfully',
      admin,
    };
  }

  // =========================================================
  // UPDATE ADMIN
  // =========================================================

  async update(
    id: number,
    updateAdminDto: UpdateAdminDto,
  ) {
    // Check admin exists

    const existingAdmin =
      await this.prisma.admin.findUnique({
        where: {
          id,
        },
      });

    if (!existingAdmin) {
      throw new NotFoundException(
        'Admin not found',
      );
    }

    const {
      name,
      email,
      password,
    } = updateAdminDto;

    // Check duplicate email

    let normalizedEmail:
      | string
      | undefined;

    if (email !== undefined) {
      normalizedEmail =
        email.trim().toLowerCase();

      if (
        normalizedEmail !==
        existingAdmin.email
      ) {
        const duplicateAdmin =
          await this.prisma.admin.findUnique({
            where: {
              email: normalizedEmail,
            },
          });

        if (duplicateAdmin) {
          throw new ConflictException(
            'An admin with this email already exists',
          );
        }
      }
    }

    // Prepare update data

    const updateData: {
      name?: string;
      email?: string;
      password?: string;
    } = {};

    if (name !== undefined) {
      updateData.name =
        name.trim();
    }

    if (normalizedEmail !== undefined) {
      updateData.email =
        normalizedEmail;
    }

    if (password !== undefined) {
      updateData.password =
        await bcrypt.hash(
          password,
          12,
        );
    }

    const admin =
      await this.prisma.admin.update({
        where: {
          id,
        },

        data: updateData,

        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });

    return {
      message: 'Admin updated successfully',
      admin,
    };
  }

  // =========================================================
  // DELETE ADMIN
  // =========================================================

  async remove(
    id: number,
    currentAdminId: number,
  ) {
    // Check admin exists

    const admin =
      await this.prisma.admin.findUnique({
        where: {
          id,
        },
      });

    if (!admin) {
      throw new NotFoundException(
        'Admin not found',
      );
    }

    // Prevent self deletion

    if (id === currentAdminId) {
      throw new ConflictException(
        'You cannot delete your own admin account',
      );
    }

    await this.prisma.admin.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Admin deleted successfully',
    };
  }
}