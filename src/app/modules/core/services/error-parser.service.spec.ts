import { TestBed } from '@angular/core/testing';
import { ErrorParserService } from './error-parser.service';
import { ErrorResponse } from '../models/ErrorResponse';

describe('ErrorParserService', () => {
  let service: ErrorParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorParserService],
    });
    service = TestBed.inject(ErrorParserService);
  });

  it('should parse 400 status error', () => {
    const result = service.parseErrorFromStatus(400);
    expect(result).toEqual('Złe Żądanie: Serwer nie mógł zrozumieć żądania z powodu nieprawidłowej składni.');
  });

  it('should parse 500 status error with server message', () => {
    const result = service.parseErrorFromStatus(500, 'Server is down');
    expect(result).toEqual(
      'Coś Poszło Nie Tak: Server is down. Serwer napotkał błąd i nie mógł zrealizować twojego żądania.'
    );
  });

  it('should parse unknown status error', () => {
    const result = service.parseErrorFromStatus(999);
    expect(result).toEqual('Coś Poszło Nie Tak: Wystąpił nieoczekiwany błąd. Proszę spróbować ponownie.');
  });

  it('parses error with known error code', () => {
    const error = { error: new ErrorResponse('NOT_FOUND', ['not found item']) };
    const result = service.parseError(error);
    expect(result).toEqual('not found item');
  });

  it('parses error with unknown error code', () => {
    const error = { error: new ErrorResponse('unknown', ['unknown']) };
    const result = service.parseError(error);
    expect(result).toEqual('unknown');
  });
});
