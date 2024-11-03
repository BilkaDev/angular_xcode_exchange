import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { Currency, CurrencyData, CurrencyPostResponse } from '../../core/models/currency.model';
import { SnackbarService } from '../../../shared/ui/snackbar/snackbar.service';
import { Requests, RequestsDetailsResponse } from '../../core/models/requests.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  requestsResult = new BehaviorSubject<Requests[] | null>(null);
  private apiUrl = environment.apiUrl;
  private currencyEP = 'currencies/get-current-currency-value-command';
  private requestsDetailEP = 'currencies/requests';
  private invalidCurrencyMessage = 'Niepoprawna waluta.';

  constructor(
    private http: HttpClient,
    private snackbar: SnackbarService
  ) {}

  postCurrency(currencyDto: CurrencyData): Observable<Currency> {
    return this.http.post<CurrencyPostResponse>(`${this.apiUrl}/${this.currencyEP}`, currencyDto).pipe(
      map((value) => {
        const currencyDto = value.value;
        return new Currency(currencyDto);
      }),
      catchError((err) => {
        if (err.status === 400) {
          this.snackbar.openSnackBar(this.invalidCurrencyMessage, true);
        } else {
          this.snackbar.openSnackBar(err.message, true);
        }
        return throwError(err);
      })
    );
  }

  getRequestsDetail(): Observable<Requests[]> {
    return this.http.get<RequestsDetailsResponse[]>(`${this.apiUrl}/${this.requestsDetailEP}`).pipe(
      map((value) => {
        return value.map((request) => new Requests(request.currency, request.value, request.name, request.date));
      }),
      tap((request) => this.requestsResult.next(request)),
      catchError((err) => {
        this.snackbar.openSnackBar(err.message, true);
        return throwError(err);
      })
    );
  }
}
