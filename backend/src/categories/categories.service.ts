import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // =========================================================
  // CREATE CATEGORY
  // =========================================================

  async create(createCategoryDto: CreateCategoryDto) {
    const {
      category_number,
      name,
      active = true,
    } = createCategoryDto;

    // Check duplicate category number
    const existingNumber =
      await this.prisma.category.findUnique({
        where: {
          category_number,
        },
      });

    if (existingNumber) {
      throw new ConflictException(
        'Category number already exists',
      );
    }

    // Check duplicate category name
    const existingName =
      await this.prisma.category.findFirst({
        where: {
          name: {
            equals: name,
            mode: 'insensitive',
          },
        },
      });

    if (existingName) {
      throw new ConflictException(
        'Category name already exists',
      );
    }

    const category =
      await this.prisma.category.create({
        data: {
          category_number,
          name: name.trim(),
          active,
        },
      });

    return {
      message: 'Category created successfully',
      category,
    };
  }

  // =========================================================
  // GET ALL CATEGORIES
  // =========================================================

  async findAll() {
    const categories =
      await this.prisma.category.findMany({
        orderBy: {
          category_number: 'asc',
        },
        include: {
          _count: {
            select: {
              projects: true,
            },
          },
        },
      });

    return {
      categories: categories.map((category) => ({
        id: category.id,
        category_number:
          category.category_number,
        name: category.name,
        active: category.active,
        projectCount: category._count.projects,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      })),
    };
  }

  // =========================================================
  // GET ONE CATEGORY
  // =========================================================

  async findOne(id: number) {
    const category =
      await this.prisma.category.findUnique({
        where: {
          id,
        },
        include: {
          _count: {
            select: {
              projects: true,
            },
          },
        },
      });

    if (!category) {
      throw new NotFoundException(
        'Category not found',
      );
    }

    return {
      category: {
        id: category.id,
        category_number:
          category.category_number,
        name: category.name,
        active: category.active,
        projectCount:
          category._count.projects,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      },
    };
  }

  // =========================================================
  // UPDATE CATEGORY
  // =========================================================

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    // Check category exists
    const existingCategory =
      await this.prisma.category.findUnique({
        where: {
          id,
        },
      });

    if (!existingCategory) {
      throw new NotFoundException(
        'Category not found',
      );
    }

    const {
      category_number,
      name,
      active,
    } = updateCategoryDto;

    // Check duplicate category number
    if (
      category_number !== undefined &&
      category_number !==
        existingCategory.category_number
    ) {
      const duplicateNumber =
        await this.prisma.category.findUnique({
          where: {
            category_number,
          },
        });

      if (duplicateNumber) {
        throw new ConflictException(
          'Category number already exists',
        );
      }
    }

    // Check duplicate category name
    if (
      name !== undefined &&
      name.trim().toLowerCase() !==
        existingCategory.name.toLowerCase()
    ) {
      const duplicateName =
        await this.prisma.category.findFirst({
          where: {
            name: {
              equals: name.trim(),
              mode: 'insensitive',
            },
            NOT: {
              id,
            },
          },
        });

      if (duplicateName) {
        throw new ConflictException(
          'Category name already exists',
        );
      }
    }

    const category =
      await this.prisma.category.update({
        where: {
          id,
        },
        data: {
          ...(category_number !== undefined && {
            category_number,
          }),

          ...(name !== undefined && {
            name: name.trim(),
          }),

          ...(active !== undefined && {
            active,
          }),
        },
      });

    return {
      message: 'Category updated successfully',
      category,
    };
  }

  // =========================================================
  // DELETE CATEGORY
  // =========================================================

  async remove(id: number) {
    // Check category exists
    const existingCategory =
      await this.prisma.category.findUnique({
        where: {
          id,
        },
        include: {
          _count: {
            select: {
              projects: true,
            },
          },
        },
      });

    if (!existingCategory) {
      throw new NotFoundException(
        'Category not found',
      );
    }

    // Prevent deleting a category that has projects
    if (existingCategory._count.projects > 0) {
      throw new ConflictException(
        `Cannot delete this category because it has ${existingCategory._count.projects} project(s). Move or delete the projects first.`,
      );
    }

    await this.prisma.category.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Category deleted successfully',
    };
  }
}