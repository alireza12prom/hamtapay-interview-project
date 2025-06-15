import Redis from 'ioredis';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);
  private readonly redis: Redis;

  constructor() {
    this.redis = new Redis({
      db: parseInt(process.env.REDIS_DB ?? '0'),
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT ?? '6379'),
    });

    this.redis.on('error', this.onError.bind(this));
    this.redis.on('connect', this.onConnect.bind(this));
  }

  private onConnect() {
    this.logger.log('Redis Connected');
  }

  private onError(error: Error) {
    this.logger.fatal('Redis Connection Error', { error });
  }

  get client() {
    return this.redis;
  }
}
