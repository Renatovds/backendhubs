import { Test, TestingModule } from '@nestjs/testing';
import { CheckLateTaskService } from './check-late-task.service';

describe('CheckLateTaskService', () => {
  let service: CheckLateTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckLateTaskService],
    }).compile();

    service = module.get<CheckLateTaskService>(CheckLateTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
