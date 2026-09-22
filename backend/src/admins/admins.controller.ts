import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { Request } from 'express';

import { AdminsService } from './admins.service';

import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface AuthenticatedRequest
  extends Request {
  user: {
    sub: number;
    email: string;
  };
}

@Controller('admins')
@UseGuards(JwtAuthGuard)
export class AdminsController {
  constructor(
    private readonly adminsService: AdminsService,
  ) {}

  // =========================================================
  // GET /api/admins
  // =========================================================

  @Get()
  findAll() {
    return this.adminsService.findAll();
  }

  // =========================================================
  // GET /api/admins/:id
  // =========================================================

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.adminsService.findOne(id);
  }

  // =========================================================
  // POST /api/admins
  // =========================================================

  @Post()
  create(
    @Body() dto: CreateAdminDto,
  ) {
    return this.adminsService.create(
      dto,
    );
  }

  // =========================================================
  // PATCH /api/admins/:id
  // =========================================================

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body() dto: UpdateAdminDto,
  ) {
    return this.adminsService.update(
      id,
      dto,
    );
  }

  // =========================================================
  // DELETE /api/admins/:id
  // =========================================================

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: number,

    @Req()
    req: AuthenticatedRequest,
  ) {
    return this.adminsService.remove(
      id,
      req.user.sub,
    );
  }
}