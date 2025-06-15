import { Response } from 'express';
import { DomainException } from '../exceptions/domain';
import { InfrastructureException } from '../exceptions/infrastructure';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    if (exception instanceof DomainException) {
      return res.status(400).json({
        code: exception.code,
        message: exception.message,
      });
    }

    if (exception instanceof InfrastructureException) {
      return res.status(503).json({
        code: 'SERVICE_UNAVAILABLE',
        message: 'Temporary issue, try again later',
      });
    }

    return res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'Something went wrong',
    });
  }
}
