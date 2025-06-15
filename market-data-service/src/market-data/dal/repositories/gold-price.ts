import { Injectable } from '@nestjs/common';
import { RedisService } from '../../../infrastructure/redis/redis.service';
import { GoldPriceRepository as Base } from '../../domain/repositories/gold-price';
import { InfrastructureException } from '../../../common/exceptions/infrastructure';

@Injectable()
export class GoldPriceRepository implements Base {
  private key: string = 'market:gold-price';
  constructor(private readonly redis: RedisService) {}

  async save(price: number) {
    try {
      await this.redis.client.set(this.key, String(price));
    } catch (error) {
      throw new InfrastructureException('Cannot save data to DB', error);
    }
  }

  async get() {
    try {
      const result = await this.redis.client.get(this.key);
      return parseInt(result ?? '0');
    } catch (error) {
      throw new InfrastructureException('Cannot fetch data from DB', error);
    }
  }
}
