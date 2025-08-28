import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors: string[] | null = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && (res as any).message) {
        const errMsg = (res as any).message;
        if (Array.isArray(errMsg)) {
          // kasus class-validator
          message = 'Validation failed';
          errors = errMsg;
        } else {
          message = errMsg;
        }
      }
    }

    response.status(status).json({
      success: false,
      message,
      errors,
      data: null,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
