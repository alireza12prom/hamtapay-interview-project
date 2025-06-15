import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from '../../domain/repositories/order';
import { UseCase } from 'src/lib/usecase';

type Input = {
  orderId: string;
};

type Output = {
  id: string;
  symbol: string;
  unit: number;
  price: number;
  createdAt: Date;
};

@Injectable()
export class GetOrderUseCase extends UseCase<Input, Output | null> {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
  ) {
    super();
  }

  async execute(input: Input) {
    const order = await this.orderRepository.getById(input.orderId);
    if (!order) return null;

    return {
      id: order.ID.getValue(),
      symbol: order.Symbol.getValue(),
      unit: order.Unit.getValue(),
      price: order.Price.getValue(),
      createdAt: order.CreatedAt.getValue(),
    };
  }
}
