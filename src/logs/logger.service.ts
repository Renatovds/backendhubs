import { DataHub } from '../interfaces/dataHub.interface';
import { HubsCached } from 'src/hubs/hubsCached.service';
import { Injectable } from '@nestjs/common';
import { LogsService } from './logs.service';
import { ITaskLogInterface } from 'src/interfaces/ITaskLogInterface';

@Injectable()
export class Logger {
    constructor(
        private hubsCached: HubsCached,
        private readonly logsService: LogsService,
    ) {}

    async wrFile(data: DataHub[]) {
        const checkCachedData = await this.hubsCached.getValueHubs('hubs');
        console.log('oq tem no cache');
        console.log(checkCachedData);
        let cachedData: DataHub[] = [];

        if (checkCachedData?.length > 0) {
            cachedData = checkCachedData;
        } else {
            console.log('caiu aki');
            await this.hubsCached.setValueHubs(data);
            cachedData = await this.hubsCached.getValueHubs('hubs');
        }

        for (const hub of data) {
            let hubLogCache: ITaskLogInterface[] = [];

            const hubLogCacheCheck = await this.hubsCached.getValueLog(
                hub.name,
            );
            if (hubLogCacheCheck) {
                hubLogCache = hubLogCacheCheck;
            }
            console.log('hublogcache', hubLogCache);
            const oldHubData = cachedData.find(
                (hubcached) => hubcached.name === hub.name,
            );
            console.log('hub data', hub);
            if (hub.error && !oldHubData.error) {
                const log = await this.logsService.create({
                    hub: hub.name,
                    taskName: '',
                    taskNumber: '0',
                    status: 'Hub com erro',
                });

                hubLogCache.push(log);
            }
            if (oldHubData.error && !hub.error) {
                const cachedProblemsHub = await this.hubsCached.getValueLog(
                    hub.name,
                );
                if (cachedProblemsHub.length <= 0) {
                    return;
                }
                const cachedTask = cachedProblemsHub.find(
                    (task) => task.taskNumber === '0',
                );

                const { _id } = cachedTask;
                const log = await this.logsService.update(_id, {
                    normalizationDate: new Date(),
                });

                const indexItemDelete = hubLogCache.findIndex(
                    (obj) => obj._id == _id,
                );
                if (indexItemDelete === -1) {
                    return;
                }
                hubLogCache.splice(indexItemDelete, 1);
            }

            //adiciona ao log novos erros
            for (const task of hub.tasks) {
                if (
                    !oldHubData.tasks.some((e) => e.TarefaId === task.TarefaId)
                ) {
                    const log = await this.logsService.create({
                        hub: hub.name,
                        taskNumber: task.TarefaId,
                        taskName: task.Nome,
                        status: `${
                            task.Situacao === '0' ? 'Parada' : 'Atrasada'
                        }`,
                        lastRun: task.UltimaChamada,
                    });

                    hubLogCache.push(log);
                }
            }

            //adiciona ao log as correções
            for (const t of oldHubData.tasks) {
                if (!hub.tasks.some((e) => e.TarefaId === t.TarefaId)) {
                    const cachedProblemsTasksHub =
                        await this.hubsCached.getValueLog(hub.name);
                    if (cachedProblemsTasksHub.length <= 0) {
                        return;
                    }
                    console.log(cachedProblemsTasksHub);
                    const cachedTask = cachedProblemsTasksHub.find(
                        (task) => task.taskNumber === t.TarefaId,
                    );

                    const { _id } = cachedTask;
                    const log = await this.logsService.update(_id, {
                        normalizationDate: new Date(),
                    });

                    const indexItemDelete = hubLogCache.findIndex(
                        (obj) => obj._id == _id,
                    );
                    if (indexItemDelete === -1) {
                        return;
                    }
                    hubLogCache.splice(indexItemDelete, 1);
                }
            }
            await this.hubsCached.setValueLog(hub.name, hubLogCache);

            const cacheresult = await this.hubsCached.getValueLog(hub.name);
            console.log('chache');
            console.log(hub.name);
            console.log(cacheresult);
        }
    }
}
