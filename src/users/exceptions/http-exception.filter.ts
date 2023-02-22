// http-exception.filter.ts
import { ExceptionFilter, Catch, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, response) {
    const status = exception.getStatus();
    const message = exception.getResponse() as string;
    response
      .status(status)
      .json({
        statusCode: status,
        message,
      });
  }
}