import { Component, OnInit } from '@angular/core';
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
import { CurrencyService } from '../../services/currency.service';
import { Subscription } from 'rxjs';
import { Currency } from '../../../core/models/currency.model';

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
export class CurrencyFormComponent implements OnInit {
  currencyForm: FormGroup<CurrencyForm>;
  matcher = new MyErrorStateMatcher();
  result: Currency | null = null;
  sub!: Subscription;

  constructor(
    private formsService: FormsService,
    private currencyService: CurrencyService
  ) {
    this.currencyForm = this.formsService.initCurrencyForm();
  }

  ngOnInit(): void {
    this.sub = this.currencyService.currencyPostResult.subscribe({
      next: (value) => (this.result = value),
    });
  }

  get controls() {
    return this.currencyForm.controls;
  }

  onSubmit() {
    this.currencyService
      .postCurrency({
        name: this.controls.name.getRawValue(),
        currency: this.controls.currencyCode.getRawValue(),
      })
      .subscribe();
  }

  clearName() {
    this.controls.name.setValue('');
  }

  getErrorMessage(control: FormControl) {
    return this.formsService.getErrorMessage(control);
  }
}
