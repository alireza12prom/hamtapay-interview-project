import { Cron } from '@nestjs/schedule';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { GoldPricePort } from 'src/market-data/domain/ports/gold-price';
import { GoldPriceRepository } from 'src/market-data/domain/repositories/gold-price';

@Injectable()
export class UpdateGoldPriceJob {
  private readonly logger = new Logger(UpdateGoldPriceJob.name);

  constructor(
    private readonly goldPricePort: GoldPricePort,
    @Inject('GoldPriceRepository')
    private readonly goldPriceRepository: GoldPriceRepository,
  ) {}

  @Cron('0 * * * * *')
  async handle() {
    try {
      const goldPrice = await this.goldPricePort.get();
      await this.goldPriceRepository.save(goldPrice);
      this.logger.log(`Price updated: ${goldPrice}`);
    } catch (err) {
      this.logger.error('Update failed', err);
    }
  }
}
