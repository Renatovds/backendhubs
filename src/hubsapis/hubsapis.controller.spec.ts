import { Test, TestingModule } from '@nestjs/testing';
import { HubsapisController } from './hubsapis.controller';
import { HubsapisService } from './hubsapis.service';

describe('HubsapisController', () => {
  let controller: HubsapisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HubsapisController],
      providers: [HubsapisService],
    }).compile();

    controller = module.get<HubsapisController>(HubsapisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
