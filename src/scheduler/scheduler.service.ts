import { Injectable } from '@nestjs/common';
import { HubsService } from 'src/hubs/hubs.service';
import { HubsCached } from 'src/hubs/hubsCached.service';
import { CheckLateTaskService } from 'src/check-late-task/check-late-task.service';
import { Cron } from '@nestjs/schedule';
import { Logger } from '../logs/logger.service';

@Injectable()
export class SchedulerService {
    constructor(
        private hubsService: HubsService,
        private hubsCached: HubsCached,
        private checkLateTask: CheckLateTaskService,
        private logger: Logger,
    ) {}
    @Cron(
        `${
            process.env.SCHEDULER_INTERVAL
                ? process.env.SCHEDULER_INTERVAL
                : '45 * * * * *'
        }`,
    )
    async execute() {
        const data = await this.hubsService.execute();
        console.log(data);
        const checkedData = this.checkLateTask.execute(data);
        const filteredData = this.checkLateTask.filterTasks(checkedData);
        console.log('data filtrada');
        console.log(filteredData);

        await this.logger.wrFile(filteredData);
        await this.hubsCached.setValueHubs(filteredData);
    }
}
