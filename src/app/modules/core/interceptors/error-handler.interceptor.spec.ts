import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { finalize, Observable, of, throwError } from 'rxjs';

import { errorHandlerInterceptor } from './error-handler.interceptor';
import { ErrorParserService } from '../services/error-parser.service';

describe('errorHandlerInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => errorHandlerInterceptor(req, next));

  it('should parse and rethrow error', (done) => {
    const nextMock = (): Observable<HttpEvent<unknown>> => {
      return throwError(() => new HttpErrorResponse({ status: 500, statusText: 'error', error: null }));
    };
    const parsedMessage = 'Parsed Error Message';
    const errorParserService = TestBed.inject(ErrorParserService);
    spyOn(errorParserService, 'parseError' as never).and.returnValue(parsedMessage as never);

    interceptor({} as HttpRequest<unknown>, nextMock).subscribe({
      next: () => done.fail('Expected error, but got success response'),
      error: (err) => {
        expect(err.message).toBe(parsedMessage);
        done();
      },
    });
  });

  it('should pass through successful response', (done) => {
    const nextMock = (): Observable<HttpEvent<unknown>> => {
      return of(new HttpResponse<unknown>({ status: 200, body: null }));
    };
    interceptor({} as HttpRequest<unknown>, nextMock)
      .pipe(
        finalize(() => {
          done();
        })
      )
      .subscribe({
        error: done.fail,
      });
  });
});
