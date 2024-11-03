import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { CurrencyForm } from '../../../core/models/forms.model';
import { FormsService } from '../../../core/services/forms.service';
import { MyErrorStateMatcher } from '../../currency.component';

@Component({
  selector: 'app-currency-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgIf,
    MatIcon,
    MatTableModule,
  ],
  templateUrl: './currency-form.component.html',
  styleUrl: './currency-form.component.scss',
})
export class CurrencyFormComponent {
  currencyForm: FormGroup<CurrencyForm>;
  matcher = new MyErrorStateMatcher();
  result = '4.3512';

  constructor(private formsService: FormsService) {
    this.currencyForm = this.formsService.initCurrencyForm();
  }

  get controls() {
    return this.currencyForm.controls;
  }

  onSubmit() {
    console.log('submit');
  }

  clearName() {
    this.controls.name.setValue('');
  }

  getErrorMessage(control: FormControl) {
    return this.formsService.getErrorMessage(control);
  }
}
