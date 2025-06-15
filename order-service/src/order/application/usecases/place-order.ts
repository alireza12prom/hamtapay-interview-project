import { randomUUID } from 'crypto';
import { DataSource } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '../../../lib/usecase';
import { PricingPort } from 'src/order/domain/ports/pricing';
import { OrderEntity } from 'src/order/domain/entities/order';
import { OrderRepository } from 'src/order/domain/repositories/order';
import { InventoryRepository } from 'src/order/domain/repositories/inventory';

export interface Input {
  unit: number;
}

export interface Output {
  orderId: string;
}

@Injectable()
export class PlaceOrderUseCase extends UseCase<Input, Output> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly pricingPort: PricingPort,
    @Inject('InventoryRepository')
    private readonly inventoryRepository: InventoryRepository,
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
  ) {
    super();
  }

  async execute(input: Input): Promise<Output> {
    const currentDate = new Date();
    const currentPrice = await this.pricingPort.get();

    return await this.dataSource.transaction(async (manager) => {
      const orderRepository = this.orderRepository.withTransaction(manager);
      const inventoryRepository =
        this.inventoryRepository.withTransaction(manager);

      const inventory = await inventoryRepository.getAndLock();
      if (!inventory.isEnough(input.unit)) {
        // FIXME: Handle errors
        throw new Error('Inventory is not enough');
      }
      inventory.decrease(input.unit);

      const order = new OrderEntity(
        randomUUID(),
        input.unit,
        currentPrice,
        currentDate,
      );

      await Promise.all([
        orderRepository.save(order),
        inventoryRepository.save(inventory),
      ]);

      return { orderId: order.ID.getValue() };
    });
  }
}
