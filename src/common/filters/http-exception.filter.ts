import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { error, time } from 'console';
import { request } from 'http';
import { timestamp } from 'rxjs';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal Server Error';

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `Http Status: ${status} Error Message:  ${JSON.stringify(message)} `,
      );

      if (exception instanceof Error) {
        this.logger.error(exception.stack);
      }
    }

    const errResponse = {
      code: status,
      timestamp: new Date().toISOString(),
      path: req.url,
      message:
        typeof message === 'object' && message != null
          ? (message as any)['message'] || message
          : message,
    };

    res.status(status).json(errResponse);
  }
}
