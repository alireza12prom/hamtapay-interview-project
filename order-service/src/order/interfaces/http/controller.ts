import { PlaceOrderUseCase } from 'src/order/application/usecases/place-order';
import { GetOrderDto, PlaceOrderDto } from './dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GetInventoryUseCase } from 'src/order/application/usecases/get-inventory';
import { GetOrderUseCase } from 'src/order/application/usecases/get-order';

@Controller({ path: 'order', version: '1' })
export class OrderController {
  constructor(
    private readonly placeOrderUseCase: PlaceOrderUseCase,
    private readonly getOrderUseCase: GetOrderUseCase,
    private readonly getInventoryUseCase: GetInventoryUseCase,
  ) {}

  @Post('/')
  async placeOrder(@Body() body: PlaceOrderDto) {
    const response = await this.placeOrderUseCase.execute({
      unit: body.units,
    });
    return response;
  }

  @Get('/inventory')
  async getInventory() {
    const response = await this.getInventoryUseCase.execute();
    return response;
  }

  @Get('/:orderId')
  async getOrder(@Param() params: GetOrderDto) {
    const response = await this.getOrderUseCase.execute({
      orderId: params.orderId,
    });
    return response;
  }
}
