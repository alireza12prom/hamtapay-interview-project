import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderOrmEntity } from './order/dal/orm-entities/order';
import { InventoryOrmEntity } from './order/dal/orm-entities/inventory';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('POSTGRES_HOST'),
        port: config.get<number>('POSTGRES_PORT'),
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASS'),
        database: config.get<string>('POSTGRES_DB'),
        entities: [OrderOrmEntity, InventoryOrmEntity],
        synchronize: true, // FIXME: Disable in production,
        logger: 'debug',
      }),
    }),
    OrderModule,
  ],
})
export class AppModule {}
