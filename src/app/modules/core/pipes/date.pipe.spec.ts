import { DatePipe } from './date.pipe';

describe('DatePipe', () => {
  it('create an instance', () => {
    const pipe = new DatePipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms a valid date string', () => {
    const pipe = new DatePipe();
    const result = pipe.transform('2023-10-05 12:00');
    expect(result).toBe('5.10.2023 12:00');
  });

  it('transforms an undefined value', () => {
    const pipe = new DatePipe();
    const result = pipe.transform(undefined);
    expect(result).toBe('Invalid Date Inval');
  });

  it('transforms an empty string', () => {
    const pipe = new DatePipe();
    const result = pipe.transform('');
    expect(result).toBe('Invalid Date Inval');
  });
  //
  it('transforms a malformed date string', () => {
    const pipe = new DatePipe();
    const result = pipe.transform('not-a-date');
    expect(result).toBe('Invalid Date Inval');
  });
});
