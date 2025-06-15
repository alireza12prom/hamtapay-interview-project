import { Injectable } from '@nestjs/common';
import { InventoryPort } from '../../domain/ports/inventory';
import { Inventory } from '../../domain/value-objects/inventory';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HttpInventoryAdaptor implements InventoryPort {
  private hostname: string;
  constructor(private readonly httpService: HttpService) {
    this.hostname = process.env.ORDER_SERVICE_HOSTNAME!;
  }

  async get(): Promise<Inventory> {
    const { data } = await firstValueFrom(
      this.httpService.get<{ initial: number; current: number }>(
        this.hostname + '/order/inventory',
      ),
    );

    return Promise.resolve(new Inventory(data.initial, data.current));
  }
}
