import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { Requests } from '../../../core/models/requests.model';
import { Subscription } from 'rxjs';
import { CurrencyService } from '../../services/currency.service';
import { NgIf } from '@angular/common';
import { DatePipe } from '../../../core/pipes/date.pipe';

@Component({
  selector: 'app-currency-table',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    NgIf,
    DatePipe,
  ],
  templateUrl: './currency-table.component.html',
  styleUrl: './currency-table.component.scss',
})
export class CurrencyTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'currency', 'value', 'date'];
  dataSource: Requests[] | null = null;
  sub!: Subscription;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getRequestsDetail().subscribe();
    this.sub = this.currencyService.requestsResult.subscribe({
      next: (value) => (this.dataSource = value),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
