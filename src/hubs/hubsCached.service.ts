import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { HubsService } from './hubs.service';

@Injectable()
export class HubsCached {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private hubService: HubsService,
  ) {}
  async setValue(data) {
    await this.cacheManager.del('hubs');
    await this.cacheManager.set('hubs', data);
  }

  async getValue(key) {
    const response = await this.cacheManager.get(key);

    return response;
  }
}
