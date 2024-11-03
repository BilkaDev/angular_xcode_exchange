import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyComponent } from './currency.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';

describe('CurrencyComponent', () => {
  let component: CurrencyComponent;
  let fixture: ComponentFixture<CurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyComponent, HttpClientModule],
      providers: [provideAnimationsAsync()],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render app-currency-form', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-currency-form')).toBeTruthy();
  });

  it('should render app-currency-table', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-currency-form')).toBeTruthy();
  });
});
