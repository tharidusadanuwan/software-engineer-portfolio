import {
  Module,
  OnModuleInit,
} from '@nestjs/common';

import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  controllers: [
    ProjectsController,
  ],

  providers: [
    ProjectsService,
  ],

  exports: [
    ProjectsService,
  ],
})
export class ProjectsModule
  implements OnModuleInit
{
  constructor(
    private readonly projectsService: ProjectsService,
  ) {}

  async onModuleInit() {
    await this.projectsService.ensureUploadDirectory();
  }
}