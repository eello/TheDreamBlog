import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
  ) {}

  async set(key: string, value: any, ttl: number) {
    await this.cache.set(key, value, { ttl });
  }

  async get(key: string): Promise<any> {
    return await this.cache.get(key);
  }

  async del(key: string) {
    await this.cache.del(key);
  }
}
