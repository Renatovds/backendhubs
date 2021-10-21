import { Test, TestingModule } from '@nestjs/testing';
import { HubsapisService } from './hubsapis.service';

describe('HubsapisService', () => {
  let service: HubsapisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HubsapisService],
    }).compile();

    service = module.get<HubsapisService>(HubsapisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
