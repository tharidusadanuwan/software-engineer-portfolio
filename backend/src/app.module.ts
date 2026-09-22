import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  ServeStaticModule,
} from '@nestjs/serve-static';

import * as path from 'path';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AdminsModule } from './admins/admins.module';
import { CategoriesModule } from './categories/categories.module';
import { ProjectsModule } from './projects/projects.module';
import { PublicModule } from './public/public.module';
import { MessagesModule } from './messages/messages.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Serve uploaded files
    ServeStaticModule.forRoot({
      rootPath: path.join(
        process.cwd(),
        'uploads',
      ),

      serveRoot: '/uploads',
    }),

    PrismaModule,

    AuthModule,

    AdminsModule,

    CategoriesModule,

    ProjectsModule,

    PublicModule,

    MessagesModule,
  ],
})
export class AppModule {}