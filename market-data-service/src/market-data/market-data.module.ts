import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RedisModule } from '../infrastructure/redis/redis.module';
import { MarketDataController } from './interfaces/http/controller';
import { FetchPriceUseCase } from './application/usecases/fetch-price';
import { HttpGoldPriceAdaptor } from './infrastructure/adaptor/gold-price';
import { GoldPricePort } from './domain/ports/gold-price';
import { ScheduleModule } from '@nestjs/schedule';
import { UpdateGoldPriceJob } from './application/jobs/update-price';
import { GoldPriceRepository } from './dal/repositories/gold-price';

@Module({
  imports: [ScheduleModule.forRoot(), RedisModule, HttpModule],
  providers: [
    FetchPriceUseCase,
    UpdateGoldPriceJob,
    { provide: GoldPricePort, useClass: HttpGoldPriceAdaptor },
    { provide: 'GoldPriceRepository', useClass: GoldPriceRepository },
  ],
  controllers: [MarketDataController],
})
export class MarketDataModule {}
