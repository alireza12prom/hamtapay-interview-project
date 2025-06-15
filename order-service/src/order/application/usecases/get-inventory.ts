import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/lib/usecase';
import { InventoryRepository } from 'src/order/domain/repositories/inventory';

type Input = undefined;
type Output = { inital: number; current: number };

@Injectable()
export class GetInventoryUseCase extends UseCase<Input, Output> {
  constructor(
    @Inject('InventoryRepository')
    private readonly inventoryRepository: InventoryRepository,
  ) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(input?: Input): Promise<Output> {
    const inventory = await this.inventoryRepository.get();

    if (!inventory) {
      throw new Error('inventory is not exists');
    }

    return {
      inital: inventory.Initial.getValue(),
      current: inventory.Current.getValue(),
    };
  }
}
