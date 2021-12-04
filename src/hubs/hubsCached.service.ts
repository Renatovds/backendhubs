import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { DataHub } from 'src/interfaces/dataHub.interface';
import { HubsService } from './hubs.service';

@Injectable()
export class HubsCached {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private hubService: HubsService,
  ) {}
  async setValue(data) {
    await this.cacheManager.del('hubs');
    await this.cacheManager.set('hubs', data, { ttl: 0 });
    const resp = await this.cacheManager.get('hubs');
    console.log(resp);
  }

  async getValue(key): Promise<DataHub[]> {
    const response: DataHub[] = await this.cacheManager.get(key);

    return response;
  }
}
