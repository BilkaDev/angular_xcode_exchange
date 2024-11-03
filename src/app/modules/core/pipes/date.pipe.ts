import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date',
  standalone: true,
})
export class DatePipe implements PipeTransform {
  transform(value: string | undefined): string {
    const date = new Date(value ?? '').toLocaleDateString();
    const time = new Date(value ?? '').toLocaleTimeString().slice(0, 5);

    return `${date} ${time}`;
  }
}
