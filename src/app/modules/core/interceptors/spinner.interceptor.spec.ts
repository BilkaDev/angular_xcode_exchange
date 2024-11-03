import { TestBed } from '@angular/core/testing';
import { HttpEvent, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';

import { spinnerInterceptor } from './spinner.interceptor';
import { SpinnerService } from '../services/spinner.service';
import { finalize, Observable, of } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const nextMock = (req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> => {
  return of(new HttpResponse<unknown>({ status: 200, body: null }));
};

describe('spinnerInterceptor', () => {
  let spinnerServiceSpy: jasmine.SpyObj<SpinnerService>;
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => spinnerInterceptor(req, next));

  beforeEach(() => {
    spinnerServiceSpy = jasmine.createSpyObj('SpinnerService', ['show', 'hide']);
    TestBed.configureTestingModule({
      providers: [{ provide: SpinnerService, useValue: spinnerServiceSpy }],
    });
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should show and then hide spinner on request completion', (done) => {
    interceptor({} as HttpRequest<unknown>, nextMock)
      .pipe(
        finalize(() => {
          expect(spinnerServiceSpy.hide).toHaveBeenCalled();
          done();
        })
      )
      .subscribe({
        next: () => {
          expect(spinnerServiceSpy.show).toHaveBeenCalled();
        },
        error: done.fail,
      });
  });
});
