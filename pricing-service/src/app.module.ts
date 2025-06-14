import { Module } from '@nestjs/common';
import { PricingModule } from './pricing/pricing.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), PricingModule],
  providers: [],
})
export class AppModule {}
