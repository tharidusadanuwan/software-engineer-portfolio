import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

import { CreateProjectTechnologyDto } from './dto/create-project-technology.dto';
import { UpdateProjectTechnologyDto } from './dto/update-project-technology.dto';

import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // =========================================================
  // UPLOAD DIRECTORY
  // =========================================================

  private readonly uploadDirectory =
    path.join(
      process.cwd(),
      'uploads',
      'project',
    );

  // =========================================================
  // ENSURE UPLOAD DIRECTORY
  // =========================================================

  async ensureUploadDirectory() {
    await fs.mkdir(
      this.uploadDirectory,
      {
        recursive: true,
      },
    );
  }

  // =========================================================
  // CREATE PROJECT
  // =========================================================

  async create(
    createProjectDto: CreateProjectDto,
  ) {
    const {
      project_number,
      name,
      description,
      categoryId,
      duration,
      project_link,
      active = true,
    } = createProjectDto;

    // Check project number
    const existingProject =
      await this.prisma.project.findUnique({
        where: {
          project_number,
        },
      });

    if (existingProject) {
      throw new ConflictException(
        'Project number already exists',
      );
    }

    // Check category
    const category =
      await this.prisma.category.findUnique({
        where: {
          id: categoryId,
        },
      });

    if (!category) {
      throw new NotFoundException(
        'Category not found',
      );
    }

    const project =
      await this.prisma.project.create({
        data: {
          project_number,
          name: name.trim(),
          description:
            description?.trim() || null,
          categoryId,
          duration,
          project_link:
            project_link?.trim() || null,
          active,
        },

        include: {
          category: true,
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
      message: 'Project created successfully',
      project,
    };
  }

  // =========================================================
  // GET ALL PROJECTS
  // =========================================================

  async findAll() {
    const projects =
      await this.prisma.project.findMany({
        orderBy: {
          project_number: 'asc',
        },

        include: {
          category: true,

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

  // =========================================================
  // GET ONE PROJECT
  // =========================================================

  async findOne(id: number) {
    const project =
      await this.prisma.project.findUnique({
        where: {
          id,
        },

        include: {
          category: true,

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

    if (!project) {
      throw new NotFoundException(
        'Project not found',
      );
    }

    return {
      project,
    };
  }

  // =========================================================
  // UPDATE PROJECT
  // =========================================================

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ) {
    const existingProject =
      await this.prisma.project.findUnique({
        where: {
          id,
        },
      });

    if (!existingProject) {
      throw new NotFoundException(
        'Project not found',
      );
    }

    const {
      project_number,
      name,
      description,
      categoryId,
      duration,
      project_link,
      active,
    } = updateProjectDto;

    // Check duplicate project number
    if (
      project_number !== undefined &&
      project_number !==
        existingProject.project_number
    ) {
      const duplicate =
        await this.prisma.project.findUnique({
          where: {
            project_number,
          },
        });

      if (duplicate) {
        throw new ConflictException(
          'Project number already exists',
        );
      }
    }

    // Check category
    if (categoryId !== undefined) {
      const category =
        await this.prisma.category.findUnique({
          where: {
            id: categoryId,
          },
        });

      if (!category) {
        throw new NotFoundException(
          'Category not found',
        );
      }
    }

    const project =
      await this.prisma.project.update({
        where: {
          id,
        },

        data: {
          ...(project_number !== undefined && {
            project_number,
          }),

          ...(name !== undefined && {
            name: name.trim(),
          }),

          ...(description !== undefined && {
            description:
              description.trim() || null,
          }),

          ...(categoryId !== undefined && {
            categoryId,
          }),

          ...(duration !== undefined && {
            duration,
          }),

          ...(project_link !== undefined && {
            project_link:
              project_link.trim() || null,
          }),

          ...(active !== undefined && {
            active,
          }),
        },

        include: {
          category: true,

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
      message: 'Project updated successfully',
      project,
    };
  }

  // =========================================================
  // DELETE PROJECT
  // =========================================================

  async remove(id: number) {
    const project =
      await this.prisma.project.findUnique({
        where: {
          id,
        },

        include: {
          images: true,
        },
      });

    if (!project) {
      throw new NotFoundException(
        'Project not found',
      );
    }

    // Delete database project.
    //
    // Because Prisma has:
    // ProjectImage -> onDelete: Cascade
    // ProjectTechnology -> onDelete: Cascade
    //
    // their database records will be deleted too.
    await this.prisma.project.delete({
      where: {
        id,
      },
    });

    // Delete physical image files
    for (const image of project.images) {
      await this.deleteImageFile(
        image.image,
      );
    }

    return {
      message: 'Project deleted successfully',
    };
  }

  // =========================================================
  // ADD PROJECT IMAGE
  // =========================================================

  async addImage(
    projectId: number,
    file: Express.Multer.File,
  ) {
    const project =
      await this.prisma.project.findUnique({
        where: {
          id: projectId,
        },
      });

    if (!project) {
      throw new NotFoundException(
        'Project not found',
      );
    }

    if (!file) {
      throw new ConflictException(
        'Project image is required',
      );
    }

    const imagePath =
      `/uploads/project/${file.filename}`;

    try {
      const image =
        await this.prisma.projectImage.create({
          data: {
            projectId,
            image: imagePath,
          },
        });

      return {
        message:
          'Project image uploaded successfully',
        image,
      };
    } catch (error) {
      // If database creation fails,
      // remove uploaded file.
      await this.deleteUploadedFile(
        file.filename,
      );

      throw error;
    }
  }

  // =========================================================
  // GET PROJECT IMAGES
  // =========================================================

  async findImages(projectId: number) {
    const project =
      await this.prisma.project.findUnique({
        where: {
          id: projectId,
        },
      });

    if (!project) {
      throw new NotFoundException(
        'Project not found',
      );
    }

    const images =
      await this.prisma.projectImage.findMany({
        where: {
          projectId,
        },

        orderBy: {
          id: 'asc',
        },
      });

    return {
      images,
    };
  }

  // =========================================================
  // UPDATE / REPLACE PROJECT IMAGE
  // =========================================================

  async updateImage(
    projectId: number,
    imageId: number,
    file: Express.Multer.File,
  ) {
    const image =
      await this.prisma.projectImage.findFirst({
        where: {
          id: imageId,
          projectId,
        },
      });

    if (!image) {
      throw new NotFoundException(
        'Project image not found',
      );
    }

    if (!file) {
      throw new ConflictException(
        'New project image is required',
      );
    }

    const oldImagePath =
      image.image;

    const newImagePath =
      `/uploads/project/${file.filename}`;

    try {
      const updatedImage =
        await this.prisma.projectImage.update({
          where: {
            id: imageId,
          },

          data: {
            image: newImagePath,
          },
        });

      // Delete old physical file
      await this.deleteImageFile(
        oldImagePath,
      );

      return {
        message:
          'Project image updated successfully',
        image: updatedImage,
      };
    } catch (error) {
      // Database update failed.
      // Delete newly uploaded image.
      await this.deleteUploadedFile(
        file.filename,
      );

      throw error;
    }
  }

  // =========================================================
  // DELETE PROJECT IMAGE
  // =========================================================

  async removeImage(
    projectId: number,
    imageId: number,
  ) {
    const image =
      await this.prisma.projectImage.findFirst({
        where: {
          id: imageId,
          projectId,
        },
      });

    if (!image) {
      throw new NotFoundException(
        'Project image not found',
      );
    }

    await this.prisma.projectImage.delete({
      where: {
        id: imageId,
      },
    });

    // Delete physical file
    await this.deleteImageFile(
      image.image,
    );

    return {
      message:
        'Project image deleted successfully',
    };
  }

  // =========================================================
  // ADD TECHNOLOGY
  // =========================================================

  async addTechnology(
    projectId: number,
    dto: CreateProjectTechnologyDto,
  ) {
    const project =
      await this.prisma.project.findUnique({
        where: {
          id: projectId,
        },
      });

    if (!project) {
      throw new NotFoundException(
        'Project not found',
      );
    }

    const technology =
      dto.technology.trim();

    if (!technology) {
      throw new ConflictException(
        'Technology name is required',
      );
    }

    const existingTechnology =
      await this.prisma.projectTechnology.findFirst({
        where: {
          projectId,
          technology: {
            equals: technology,
            mode: 'insensitive',
          },
        },
      });

    if (existingTechnology) {
      throw new ConflictException(
        'This technology already exists for the project',
      );
    }

    const result =
      await this.prisma.projectTechnology.create({
        data: {
          projectId,
          technology,
        },
      });

    return {
      message:
        'Project technology added successfully',
      technology: result,
    };
  }

  // =========================================================
  // GET TECHNOLOGIES
  // =========================================================

  async findTechnologies(
    projectId: number,
  ) {
    const project =
      await this.prisma.project.findUnique({
        where: {
          id: projectId,
        },
      });

    if (!project) {
      throw new NotFoundException(
        'Project not found',
      );
    }

    const technologies =
      await this.prisma.projectTechnology.findMany({
        where: {
          projectId,
        },

        orderBy: {
          id: 'asc',
        },
      });

    return {
      technologies,
    };
  }

  // =========================================================
  // UPDATE TECHNOLOGY
  // =========================================================

  async updateTechnology(
    projectId: number,
    technologyId: number,
    dto: UpdateProjectTechnologyDto,
  ) {
    const technology =
      await this.prisma.projectTechnology.findFirst({
        where: {
          id: technologyId,
          projectId,
        },
      });

    if (!technology) {
      throw new NotFoundException(
        'Project technology not found',
      );
    }

    const newTechnology =
      dto.technology.trim();

    if (!newTechnology) {
      throw new ConflictException(
        'Technology name is required',
      );
    }

    const duplicate =
      await this.prisma.projectTechnology.findFirst({
        where: {
          projectId,
          technology: {
            equals: newTechnology,
            mode: 'insensitive',
          },
          NOT: {
            id: technologyId,
          },
        },
      });

    if (duplicate) {
      throw new ConflictException(
        'This technology already exists for the project',
      );
    }

    const updated =
      await this.prisma.projectTechnology.update({
        where: {
          id: technologyId,
        },

        data: {
          technology: newTechnology,
        },
      });

    return {
      message:
        'Project technology updated successfully',
      technology: updated,
    };
  }

  // =========================================================
  // DELETE TECHNOLOGY
  // =========================================================

  async removeTechnology(
    projectId: number,
    technologyId: number,
  ) {
    const technology =
      await this.prisma.projectTechnology.findFirst({
        where: {
          id: technologyId,
          projectId,
        },
      });

    if (!technology) {
      throw new NotFoundException(
        'Project technology not found',
      );
    }

    await this.prisma.projectTechnology.delete({
      where: {
        id: technologyId,
      },
    });

    return {
      message:
        'Project technology deleted successfully',
    };
  }

  // =========================================================
  // DELETE IMAGE FILE
  // =========================================================

  private async deleteImageFile(
    imagePath: string,
  ) {
    try {
      const filename =
        path.basename(imagePath);

      const filePath =
        path.join(
          this.uploadDirectory,
          filename,
        );

      await fs.unlink(filePath);
    } catch (error: any) {
      // File may already be missing.
      // Don't fail the API request.
      if (error?.code !== 'ENOENT') {
        console.error(
          'Failed to delete image file:',
          error,
        );
      }
    }
  }

  // =========================================================
  // DELETE NEWLY UPLOADED FILE
  // =========================================================

  private async deleteUploadedFile(
    filename: string,
  ) {
    try {
      const filePath =
        path.join(
          this.uploadDirectory,
          path.basename(filename),
        );

      await fs.unlink(filePath);
    } catch (error: any) {
      if (error?.code !== 'ENOENT') {
        console.error(
          'Failed to delete uploaded file:',
          error,
        );
      }
    }
  }
}