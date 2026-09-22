import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import * as nodemailer from 'nodemailer';

import { PrismaService } from '../prisma/prisma.service';

import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  private transporter: nodemailer.Transporter;

  constructor(
    private readonly prisma: PrismaService,
  ) {
    this.transporter =
      nodemailer.createTransport({
        host:
          process.env.SMTP_HOST ||
          'smtp.gmail.com',

        port: Number(
          process.env.SMTP_PORT || 465,
        ),

        secure:
          process.env.SMTP_SECURE === 'true',

        auth: {
          user:
            process.env.SMTP_USER,

          pass:
            process.env.SMTP_PASSWORD,
        },
      });
  }

  async createMessage(
    dto: CreateMessageDto,
  ) {
    /*
     * 1. Save message to PostgreSQL
     */

    const savedMessage =
      await this.prisma.message.create({
        data: {
          name: dto.name,
          email: dto.email,
          subject: dto.subject,
          message: dto.message,
        },
      });

    /*
     * 2. Send email notification
     */

    try {
      await this.transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,

        to:
          process.env.CONTACT_EMAIL ||
          'tharidusadanuwan100@gmail.com',

        replyTo: dto.email,

        subject: `Portfolio Contact: ${dto.subject}`,

        text: `
New message received from your portfolio.

Name:
${dto.name}

Email:
${dto.email}

Subject:
${dto.subject}

Message:
${dto.message}

--------------------------------
Portfolio Contact Form
        `,

        html: `
          <div style="
            font-family: Arial, sans-serif;
            background: #f4f7fb;
            padding: 30px;
          ">
            <div style="
              max-width: 650px;
              margin: auto;
              background: #ffffff;
              border-radius: 16px;
              padding: 30px;
              border: 1px solid #e5e7eb;
            ">

              <div style="
                border-bottom: 1px solid #e5e7eb;
                padding-bottom: 20px;
                margin-bottom: 25px;
              ">
                <h2 style="
                  margin: 0;
                  color: #111827;
                ">
                  New Portfolio Message
                </h2>

                <p style="
                  margin-top: 8px;
                  color: #6b7280;
                ">
                  Someone contacted you through your portfolio website.
                </p>
              </div>

              <div style="margin-bottom: 18px;">
                <strong style="color: #374151;">
                  Name
                </strong>

                <p style="
                  margin: 6px 0 0;
                  color: #111827;
                ">
                  ${dto.name}
                </p>
              </div>

              <div style="margin-bottom: 18px;">
                <strong style="color: #374151;">
                  Email
                </strong>

                <p style="
                  margin: 6px 0 0;
                  color: #2563eb;
                ">
                  ${dto.email}
                </p>
              </div>

              <div style="margin-bottom: 18px;">
                <strong style="color: #374151;">
                  Subject
                </strong>

                <p style="
                  margin: 6px 0 0;
                  color: #111827;
                ">
                  ${dto.subject}
                </p>
              </div>

              <div>
                <strong style="color: #374151;">
                  Message
                </strong>

                <div style="
                  margin-top: 10px;
                  padding: 18px;
                  background: #f8fafc;
                  border-radius: 10px;
                  color: #374151;
                  line-height: 1.7;
                  white-space: pre-wrap;
                ">
                  ${dto.message}
                </div>
              </div>

              <div style="
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                color: #9ca3af;
                font-size: 12px;
              ">
                Sent from your Software Engineer portfolio contact form.
              </div>

            </div>
          </div>
        `,
      });
    } catch (error) {
      console.error(
        'Email sending failed:',
        error,
      );

      /*
       * The message is already safely stored
       * in PostgreSQL even if email fails.
       */

      await this.prisma.message.update({
        where: {
          id: savedMessage.id,
        },

        data: {
          status: 'EMAIL_FAILED',
        },
      });

      throw new InternalServerErrorException(
        'Message was saved, but email notification could not be sent.',
      );
    }

    /*
     * 3. Return success
     */

    return {
      success: true,
      message:
        'Your message has been sent successfully.',
      data: savedMessage,
    };
  }
}