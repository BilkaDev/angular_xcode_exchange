import { Component } from '@angular/core';
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
  ],
  templateUrl: './currency-table.component.html',
  styleUrl: './currency-table.component.scss',
})
export class CurrencyTableComponent {
  displayedColumns: string[] = ['name', 'currency', 'value', 'date'];

  dataSource = [
    {
      currency: 'EUR',
      name: 'Jan Nowak',
      date: '2022-01-01T10:00:00.000Z',
      value: 4.2954,
    },
    {
      currency: 'USD',
      name: 'Jan Nowak',
      date: '2022-01-01T10:00:00.000Z',
      value: 3.7954,
    },
  ];
}
