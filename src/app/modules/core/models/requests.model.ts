export class Requests {
  constructor(
    public currency: string,
    public value: string,
    public name: string,
    public date: string
  ) {}
}

export interface RequestsDetailsResponse {
  value: string;
  currency: string;
  name: string;
  date: string;
}
