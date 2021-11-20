import { Controller, Get } from '@nestjs/common';
import { HubsCached } from './hubsCached.service';
import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
@Controller('hubs')
export class HubsController {
  constructor(
    private hubsCached: HubsCached,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  @Get('/')
  async gethubs() {
    const response = await this.cacheManager.get('hubs');
    console.log('chamou');
    return response;
  }
}
