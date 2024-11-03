import { Injectable } from '@angular/core';
import { ErrorResponse } from '../models/ErrorResponse';

@Injectable({
  providedIn: 'root',
})
export class ErrorParserService {
  parseErrorFromStatus(status: number, errorMessage?: string): string {
    switch (status) {
      case 400:
        return this.formatMessage(
          'Złe Żądanie',
          errorMessage,
          'Serwer nie mógł zrozumieć żądania z powodu nieprawidłowej składni.'
        );
      case 401:
        return this.formatMessage('Nieautoryzowany', errorMessage, 'Nie masz uprawnień do dostępu do tego zasobu.');
      case 403:
        return this.formatMessage('Zabronione', errorMessage, 'Nie masz pozwolenia na dostęp do tego zasobu.');
      case 404:
        return this.formatMessage(
          'Nie Znaleziono',
          errorMessage,
          'Żądany zasób nie został znaleziony na tym serwerze.'
        );
      case 500:
        return this.formatMessage(
          'Coś Poszło Nie Tak',
          errorMessage,
          'Serwer napotkał błąd i nie mógł zrealizować twojego żądania.'
        );
      case 503:
        return this.formatMessage(
          'Coś Poszło Nie Tak',
          errorMessage,
          'Serwer jest obecnie niedostępny (przeciążony lub wyłączony). Proszę spróbować ponownie później.'
        );
      default:
        return this.formatMessage(
          'Coś Poszło Nie Tak',
          errorMessage,
          'Wystąpił nieoczekiwany błąd. Proszę spróbować ponownie.'
        );
    }
  }

  parseError(
    error: unknown,
    opt?: {
      message: string;
    }
  ) {
    if (this.isErrorKey(error) && ErrorResponse.isErrorResponse(error.error)) {
      return error.error.messages.join('.\n');
    }
    return this.parseErrorFromStatus(this.isStatusKey(error) ? error.status : 0, opt?.message);
  }

  private formatMessage(title: string, serverMessage?: string, description?: string): string {
    let formattedMessage = `${title}: `;
    if (serverMessage) {
      formattedMessage += `${serverMessage}. `;
    }
    if (description) {
      formattedMessage += description;
    }
    return formattedMessage;
  }

  private isStatusKey(err: unknown): err is { status: number } {
    return typeof err === 'object' && err !== null && 'status' in err;
  }

  private isErrorKey(err: unknown): err is { error: unknown } {
    return typeof err === 'object' && err !== null && 'error' in err;
  }
}
