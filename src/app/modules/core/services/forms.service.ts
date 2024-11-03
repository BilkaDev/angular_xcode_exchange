import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CurrencyForm } from '../models/forms.model';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  initCurrencyForm(): FormGroup<CurrencyForm> {
    return new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(4), Validators.maxLength(50)],
        nonNullable: true,
      }),
      currencyCode: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
        nonNullable: true,
      }),
    });
  }

  getErrorMessage(control: FormControl) {
    if (control.hasError('minlength')) {
      return `Minimalna ilość znaków: ${control.errors?.['minlength']?.requiredLength}`;
    }
    if (control.hasError('maxlength')) {
      return `Maksymalna ilość znaków: ${control.errors?.['maxlength']?.requiredLength}`;
    }
    if (control.hasError('required')) {
      return 'Musisz wpisać jakąś wartość';
    }
    return '';
  }
}
