import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

import { DuplicatedProjectConfigurationError, UnauthorizedError } from '../../../application';


function convertApplicationError(error: unknown): unknown {
  if (
    error instanceof DuplicatedProjectConfigurationError
  ) {
    return new UnprocessableEntityException(error.originalMessage);
  }

  if(error instanceof UnauthorizedError) {
    return new UnauthorizedException(error.originalMessage)
  }

  return error;
}

@Injectable()
export class ApplicationErrorInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      catchError((error: unknown): Observable<never> => {
        return throwError(() => convertApplicationError(error));
      }),
    );
  }
}