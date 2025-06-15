import { IsInt, Min } from 'class-validator';

export class PlaceOrderDto {
  @IsInt()
  @Min(1)
  units: number;
}
