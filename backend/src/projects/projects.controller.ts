import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import {
  FileInterceptor,
} from '@nestjs/platform-express';

import {
  diskStorage,
} from 'multer';

import { randomUUID } from 'crypto';

import * as path from 'path';

import { ProjectsService } from './projects.service';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

import { CreateProjectTechnologyDto } from './dto/create-project-technology.dto';
import { UpdateProjectTechnologyDto } from './dto/update-project-technology.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

const uploadDirectory = path.join(
  process.cwd(),
  'uploads',
  'project',
);

// =========================================================
// MULTER CONFIGURATION
// =========================================================

const multerOptions = {
  storage: diskStorage({
    destination: (
      req: any,
      file: Express.Multer.File,
      callback: (
        error: Error | null,
        destination: string,
      ) => void,
    ) => {
      callback(
        null,
        uploadDirectory,
      );
    },

    filename: (
      req: any,
      file: Express.Multer.File,
      callback: (
        error: Error | null,
        filename: string,
      ) => void,
    ) => {
      const extension =
        path.extname(file.originalname);

      const filename =
        `project-${randomUUID()}${extension}`;

      callback(
        null,
        filename,
      );
    },
  }),

  fileFilter: (
    req: any,
    file: Express.Multer.File,
    callback: (
      error: Error | null,
      acceptFile: boolean,
    ) => void,
  ) => {
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/gif',
    ];

    if (
      allowedTypes.includes(
        file.mimetype,
      )
    ) {
      callback(null, true);
    } else {
      callback(
        new Error(
          'Only JPG, JPEG, PNG, WEBP and GIF images are allowed',
        ),
        false,
      );
    }
  },

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
};

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
  ) {}

  // =========================================================
  // PROJECT CRUD
  // =========================================================

  @Post()
  create(
    @Body()
    dto: CreateProjectDto,
  ) {
    return this.projectsService.create(
      dto,
    );
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,
  ) {
    return this.projectsService.findOne(
      id,
    );
  }

  @Patch(':id')
  update(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,

    @Body()
    dto: UpdateProjectDto,
  ) {
    return this.projectsService.update(
      id,
      dto,
    );
  }

  @Delete(':id')
  remove(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,
  ) {
    return this.projectsService.remove(
      id,
    );
  }

  // =========================================================
  // PROJECT IMAGES
  // =========================================================

  @Post(':projectId/images')
  @UseInterceptors(
    FileInterceptor(
      'image',
      multerOptions,
    ),
  )
  addImage(
    @Param(
      'projectId',
      ParseIntPipe,
    )
    projectId: number,

    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.projectsService.addImage(
      projectId,
      file,
    );
  }

  @Get(':projectId/images')
  findImages(
    @Param(
      'projectId',
      ParseIntPipe,
    )
    projectId: number,
  ) {
    return this.projectsService.findImages(
      projectId,
    );
  }

  @Put(':projectId/images/:imageId')
  @UseInterceptors(
    FileInterceptor(
      'image',
      multerOptions,
    ),
  )
  updateImage(
    @Param(
      'projectId',
      ParseIntPipe,
    )
    projectId: number,

    @Param(
      'imageId',
      ParseIntPipe,
    )
    imageId: number,

    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.projectsService.updateImage(
      projectId,
      imageId,
      file,
    );
  }

  @Delete(':projectId/images/:imageId')
  removeImage(
    @Param(
      'projectId',
      ParseIntPipe,
    )
    projectId: number,

    @Param(
      'imageId',
      ParseIntPipe,
    )
    imageId: number,
  ) {
    return this.projectsService.removeImage(
      projectId,
      imageId,
    );
  }

  // =========================================================
  // PROJECT TECHNOLOGIES
  // =========================================================

  @Post(':projectId/technologies')
  addTechnology(
    @Param(
      'projectId',
      ParseIntPipe,
    )
    projectId: number,

    @Body()
    dto: CreateProjectTechnologyDto,
  ) {
    return this.projectsService.addTechnology(
      projectId,
      dto,
    );
  }

  @Get(':projectId/technologies')
  findTechnologies(
    @Param(
      'projectId',
      ParseIntPipe,
    )
    projectId: number,
  ) {
    return this.projectsService.findTechnologies(
      projectId,
    );
  }

  @Patch(
    ':projectId/technologies/:technologyId',
  )
  updateTechnology(
    @Param(
      'projectId',
      ParseIntPipe,
    )
    projectId: number,

    @Param(
      'technologyId',
      ParseIntPipe,
    )
    technologyId: number,

    @Body()
    dto: UpdateProjectTechnologyDto,
  ) {
    return this.projectsService.updateTechnology(
      projectId,
      technologyId,
      dto,
    );
  }

  @Delete(
    ':projectId/technologies/:technologyId',
  )
  removeTechnology(
    @Param(
      'projectId',
      ParseIntPipe,
    )
    projectId: number,

    @Param(
      'technologyId',
      ParseIntPipe,
    )
    technologyId: number,
  ) {
    return this.projectsService.removeTechnology(
      projectId,
      technologyId,
    );
  }
}