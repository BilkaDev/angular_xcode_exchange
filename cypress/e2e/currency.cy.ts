import { environment } from '../../src/environments/environment';
import { CurrencyPostResponse } from '../../src/app/modules/core/models/currency.model';
import { RequestsDetailsResponse } from '../../src/app/modules/core/models/requests.model';

const apiUrl = environment.apiUrl;
const postEp = apiUrl + '/currencies/get-current-currency-value-command';
const getEp = apiUrl + '/currencies/requests';

describe('Currency Page', () => {
  beforeEach(() => {
    cy.visit('');
  });
  it('should display two input fields', () => {
    cy.get('form input').should('have.length', 2);
  });
  it('should display error snackbar when server is off', () => {
    cy.get('form input').first().type('name');
    cy.get('form input').eq(1).type('eur');
    cy.get('button:contains(Sprawdź)').click();
    cy.contains('Coś Poszło Nie Tak: Wystąpił nieoczekiwany błąd. Proszę spróbować ponownie.');
  });
  it('should button by disabled when is invalid inputs', () => {
    cy.get('form input').first().type('n');
    cy.get('form input').eq(1).type('eur');
    cy.get('button:contains(Sprawdź)').should('be.disabled');

    cy.get('form input').first().type('name');
    cy.get('form input').eq(1).clear();
    cy.get('button:contains(Sprawdź)').should('be.disabled');
  });
  it('should display result when post is success', () => {
    const body: CurrencyPostResponse = {
      value: '0.12345',
    };
    const mockResponse = {
      statusCode: 201,
      body,
    };
    cy.intercept('POST', postEp, mockResponse).as('postData');

    cy.get('form input').first().type('name');
    cy.get('form input').eq(1).type('eur');
    cy.get('button:contains(Sprawdź)').click();
    cy.wait('@postData');
    cy.contains('Kurs: 0.12345');
  });
  it('should display error message "" post date return status 400', () => {
    const mockResponse = {
      statusCode: 400,
      body: {
        messages: 'invalid currency code',
      },
    };
    cy.intercept('POST', postEp, mockResponse).as('postData');
    cy.get('form input').first().type('name');
    cy.get('form input').eq(1).type('xxz');
    cy.get('button:contains(Sprawdź)').click();
    cy.wait('@postData');
    cy.contains('Niepoprawna waluta.');
  });
  it('should display table with one items', () => {
    const bodyPost: CurrencyPostResponse = {
      value: '0.12345',
    };
    const mockPostResponse = {
      statusCode: 201,
      bodyPost,
    };
    const requestsDetailsResponses: RequestsDetailsResponse[] = [
      {
        currency: 'EUR',
        name: 'Jan Nowak',
        date: '2022-01-01T10:00:00.000Z',
        value: '4.2954',
      },
    ];

    const mockGetResponse = {
      statusCode: 200,
      body: requestsDetailsResponses,
    };

    cy.intercept('POST', postEp, mockPostResponse).as('postData');
    cy.intercept('GET', getEp, mockGetResponse).as('getData');

    cy.get('form input').first().type('name');
    cy.get('form input').eq(1).type('eur');
    cy.get('button:contains(Sprawdź)').click();
    cy.wait('@postData');
    cy.wait('@getData');
    cy.contains('Jan Nowak');
    cy.contains('1.01.2022 11:00');
  });
});
