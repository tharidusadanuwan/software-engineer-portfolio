import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Controller('public')
export class PublicController {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // ==========================================
  // GET ALL ACTIVE CATEGORIES
  // ==========================================
  @Get('categories')
  async getCategories() {
    const categories =
      await this.prisma.category.findMany({
        where: {
          active: true,
        },

        orderBy: {
          category_number: 'asc',
        },

        select: {
          id: true,
          category_number: true,
          name: true,
        },
      });

    return {
      categories,
    };
  }

  // ==========================================
  // GET ALL ACTIVE PROJECTS
  // ==========================================
  @Get('projects')
  async getProjects() {
    const projects =
      await this.prisma.project.findMany({
        where: {
          active: true,
        },

        orderBy: {
          project_number: 'asc',
        },

        include: {
          category: {
            select: {
              id: true,
              category_number: true,
              name: true,
            },
          },

          images: {
            orderBy: {
              id: 'asc',
            },
          },

          technologies: {
            orderBy: {
              id: 'asc',
            },
          },
        },
      });

    return {
      projects,
    };
  }

  // ==========================================
  // GET SINGLE PROJECT
  // ==========================================
  @Get('projects/:id')
  async getProject(
    @Param('id', ParseIntPipe) id: number,
  ) {
    const project =
      await this.prisma.project.findFirst({
        where: {
          id,
          active: true,
        },

        include: {
          category: {
            select: {
              id: true,
              category_number: true,
              name: true,
            },
          },

          images: {
            orderBy: {
              id: 'asc',
            },
          },

          technologies: {
            orderBy: {
              id: 'asc',
            },
          },
        },
      });

    return {
      project,
    };
  }
}