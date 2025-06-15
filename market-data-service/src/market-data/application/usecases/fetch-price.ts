import { UseCase } from 'src/lib/usecase';
import { Inject, Injectable } from '@nestjs/common';
import { GoldPriceRepository } from '../../domain/repositories/gold-price';

type Input = undefined;
type Output = {
  price: number;
};

@Injectable()
export class FetchPriceUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('GoldPriceRepository')
    private readonly goldPriceRepository: GoldPriceRepository,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(input?: undefined): Promise<Output> {
    const result = await this.goldPriceRepository.get();
    return { price: result };
  }
}
