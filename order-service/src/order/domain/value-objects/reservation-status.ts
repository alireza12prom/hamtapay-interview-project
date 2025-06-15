import { ValueObject } from 'src/lib/value-object';

export class ReservationStatus extends ValueObject<
  'Pending' | 'Confirmed' | 'Canceled'
> {}
