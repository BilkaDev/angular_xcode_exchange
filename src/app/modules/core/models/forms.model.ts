import { FormControl } from '@angular/forms';

export interface CurrencyForm {
  name: FormControl<string>;
  currencyCode: FormControl<string>;
}
