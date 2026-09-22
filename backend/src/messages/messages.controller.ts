import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { MessagesService } from './messages.service';

import { CreateMessageDto } from './dto/create-message.dto';

@Controller('public/messages')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createMessage(
    @Body() dto: CreateMessageDto,
  ) {
    return this.messagesService.createMessage(
      dto,
    );
  }
}