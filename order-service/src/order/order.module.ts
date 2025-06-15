import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricingPort } from './domain/ports/pricing';
import { OrderOrmEntity } from './dal/orm-entities/order';
import { OrderRepository } from './dal/repositories/order';
import { OrderController } from './interfaces/http/controller';
import { InventoryRepository } from './dal/repositories/inventory';
import { GetOrderUseCase } from './application/usecases/get-order';
import { HttpPricingAdapter } from './infrastructure/adaptors/pricing';
import { PlaceOrderUseCase } from './application/usecases/place-order';
import { GetInventoryUseCase } from './application/usecases/get-inventory';
import { InventoryOrmEntity } from './dal/orm-entities/inventory';
import { InventorySeeds } from './dal/seeds/inventory';

@Module({
  controllers: [OrderController],
  imports: [TypeOrmModule.forFeature([InventoryOrmEntity, OrderOrmEntity])],
  providers: [
    InventorySeeds,
    PlaceOrderUseCase,
    GetInventoryUseCase,
    GetOrderUseCase,
    { provide: PricingPort, useClass: HttpPricingAdapter },
    { provide: 'InventoryRepository', useClass: InventoryRepository },
    { provide: 'OrderRepository', useClass: OrderRepository },
  ],
})
export class OrderModule {}
