import { TestBed } from '@angular/core/testing';

import { SpinnerService } from './spinner.service';
import { Subscription } from 'rxjs';

describe('SpinnerService', () => {
  let service: SpinnerService;
  let sub: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show spinner when show is called', () => {
    service.show();
    sub = service.isLoading.subscribe((value) => {
      expect(value).toBe(true);
    });
    sub.unsubscribe();
  });

  it('should hide spinner when hide is called', () => {
    service.hide();
    sub = service.isLoading.subscribe((value) => {
      expect(value).toBe(false);
    });
    sub.unsubscribe();
  });

  it('should initialize with spinner hidden', () => {
    sub = service.isLoading.subscribe((value) => {
      expect(value).toBe(false);
    });
    sub.unsubscribe();
  });

  it('should toggle spinner visibility correctly', () => {
    service.show();
    let sub = service.isLoading.subscribe((value) => {
      expect(value).toBe(true);
    });
    sub.unsubscribe();
    service.hide();
    sub = service.isLoading.subscribe((value) => {
      expect(value).toBe(false);
    });
    sub.unsubscribe();
  });
});
