import { TestBed } from '@angular/core/testing';

import { CurrencyService } from './currency.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { SnackbarService } from '../../../shared/ui/snackbar/snackbar.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { CurrencyData, CurrencyPostResponse } from '../../core/models/currency.model';
import { environment } from '../../../../environments/environment';
import { RequestsDetailsResponse } from '../../core/models/requests.model';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpTesting: HttpTestingController;
  let snackbarServiceSpy: jasmine.SpyObj<SnackbarService>;

  beforeEach(() => {
    snackbarServiceSpy = jasmine.createSpyObj('SnackbarService', ['openSnackBar']);
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: SnackbarService, useValue: snackbarServiceSpy },
      ],
    });
    service = TestBed.inject(CurrencyService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should post currency and update result', () => {
    const mockData: CurrencyData = { name: 'Test', currency: 'USD' };
    const mockResponse: CurrencyPostResponse = {
      value: '0.12345',
    };
    service.postCurrency(mockData).subscribe((res) => {
      expect(res.currency).toEqual('0.12345');
    });
    const req = httpTesting.expectOne(`${environment.apiUrl}/currencies/get-current-currency-value-command`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should give an error and show snackbar if post currency fails', () => {
    const mockData: CurrencyData = { name: 'Test', currency: 'USD' };

    service.postCurrency(mockData).subscribe({
      next: () => fail('the post method should be failed'),
      error: (err) => {
        expect(err.status).toBe(500);
        expect(snackbarServiceSpy.openSnackBar).toHaveBeenCalled();
      },
    });
    const req = httpTesting.expectOne(`${environment.apiUrl}/currencies/get-current-currency-value-command`);
    expect(req.request.method).toBe('POST');
    req.flush('Failed!', { status: 500, statusText: 'Internal Server Error' });
  });

  it('should get all request details', () => {
    const mockResponse: RequestsDetailsResponse[] = [
      {
        currency: 'USD',
        value: '0.12345',
        name: 'Test',
        date: '2024-01-01',
      },
    ];
    service.getRequestsDetail().subscribe((res) => {
      expect(res[0].name).toEqual('Test');
      expect(res[0].value).toEqual('0.12345');
      expect(res[0].date).toEqual('2024-01-01');
      expect(res[0].currency).toEqual('USD');
    });
    const req = httpTesting.expectOne(`${environment.apiUrl}/currencies/requests`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should give an error and show snackbar if post currency fails', () => {
    service.getRequestsDetail().subscribe({
      next: () => fail('the post method should be failed'),
      error: (err) => {
        expect(err.status).toBe(500);
        expect(snackbarServiceSpy.openSnackBar).toHaveBeenCalled();
      },
    });
    const req = httpTesting.expectOne(`${environment.apiUrl}/currencies/requests`);
    expect(req.request.method).toBe('GET');
    req.flush('Failed!', { status: 500, statusText: 'Internal Server Error' });
  });
});
