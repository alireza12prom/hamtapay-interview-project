import { ValueObject } from 'src/lib/value-object';

export class DateTime extends ValueObject<Date> {
  validate(): void {
    const date = new Date(this.value);
    if (isNaN(date.getTime())) throw new Error('Date is not a valid VO');
  }
}
