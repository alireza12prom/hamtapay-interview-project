import { Injectable } from '@nestjs/common';
import { RedisService } from '../../../infrastructure/redis/redis.service';
import { GoldPriceRepository as Base } from '../../domain/repositories/gold-price';

@Injectable()
export class GoldPriceRepository implements Base {
  private key: string = 'market:gold-price';
  constructor(private readonly redis: RedisService) {}

  async save(price: number) {
    await this.redis.client.set(this.key, String(price));
  }

  async get() {
    const result = await this.redis.client.get(this.key);
    return parseInt(result ?? '0');
  }
}
