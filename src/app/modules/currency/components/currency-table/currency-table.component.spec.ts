import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyTableComponent } from './currency-table.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('CurrencyTableComponent', () => {
  let component: CurrencyTableComponent;
  let fixture: ComponentFixture<CurrencyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyTableComponent],
      providers: [provideAnimationsAsync()],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have displayed columns', () => {
    expect(component.displayedColumns).toEqual(['name', 'currency', 'value', 'date']);
  });

  it('should have data source', () => {
    component.dataSource = [
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

    expect(component.dataSource).toEqual([
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
    ]);
  });
});
