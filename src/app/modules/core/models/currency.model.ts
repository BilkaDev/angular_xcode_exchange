export interface CurrencyData {
  currency: string;
  name: string;
}

export class Currency {
  constructor(public currency: string) {}
}

export interface CurrencyPostResponse {
  value: string;
}
