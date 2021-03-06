import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { DataHub } from 'src/interfaces/dataHub.interface';
import { HubCachedLog } from 'src/interfaces/hubCachedLog.interface';
import { ITaskLogInterface } from 'src/interfaces/ITaskLogInterface';
import { HubsService } from './hubs.service';

@Injectable()
export class HubsCached {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private hubService: HubsService,
    ) {}
    async setValueHubs(data) {
        await this.cacheManager.del('hubs');
        await this.cacheManager.set('hubs', data, { ttl: 0 });
        const resp = await this.cacheManager.get('hubs');
        console.log(resp);
    }

    async getValueHubs(key): Promise<DataHub[]> {
        const response: DataHub[] = await this.cacheManager.get(key);

        return response;
    }

    async setValueLog(key: string, data) {
        await this.cacheManager.del(key);
        await this.cacheManager.set(key, data, { ttl: 0 });
    }
    async getValueLog(key): Promise<ITaskLogInterface[]> {
        const response: ITaskLogInterface[] = await this.cacheManager.get(key);

        return response;
    }
}
