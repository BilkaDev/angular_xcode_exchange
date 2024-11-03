import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyFormComponent } from './currency-form.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('CurrencyFormComponent', () => {
  let component: CurrencyFormComponent;
  let fixture: ComponentFixture<CurrencyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyFormComponent],
      providers: [provideAnimationsAsync()],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('disables submit button when form is invalid', () => {
    component.currencyForm.controls['name'].setValue('a');
    component.currencyForm.controls['currencyCode'].setValue('a');
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.actions button').disabled).toBeTrue();
  });

  it('enables submit button when form is valid', () => {
    component.currencyForm.controls['name'].setValue('Jan Nowak');
    component.currencyForm.controls['currencyCode'].setValue('EUR');
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.actions button').disabled).toBeFalse();
  });

  it('calls onSubmit method when form is submitted', () => {
    spyOn(component, 'onSubmit' as never);
    component.currencyForm.controls['name'].setValue('Jan Nowak');
    component.currencyForm.controls['currencyCode'].setValue('EUR');
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    compiled.querySelector('.actions button').click();
    expect(component.onSubmit).toHaveBeenCalled();
  });
});
