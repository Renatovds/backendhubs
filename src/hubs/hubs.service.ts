import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { DataHub } from '../interfaces/dataHub.interface';
import { HubsapisService } from '../hubsapis/hubsapis.service';

@Injectable()
export class HubsService {
    constructor(private hubsapisService: HubsapisService) {}
    async execute() {
        const dataHubs: Array<DataHub> = [];
        const hubs = await this.hubsapisService.findAll();
        const hubsResponses = hubs.map((hub) => {
            return {
                responseDataHub: axios.get(hub.url),
                id: hub.id,
                name: hub.name,
                url_hub: hub.url_hub,
                url_icon: hub.url_icon,
            };
        });
        for await (const response of hubsResponses) {
            const dataHub: DataHub = {
                id_HUB: response.id,
                name: response.name,
                error: false,
                url_hub: response.url_hub,
                url_icon: response.url_icon,
                tasks: [],
            };
            try {
                await (
                    await response.responseDataHub
                ).data.map((item) =>
                    Object.keys(item).map((key) =>
                        dataHub.tasks.push(item[key]),
                    ),
                );

                if (dataHub.tasks.length <= 0) {
                    dataHub.error = true;
                }
                dataHubs.push(dataHub);
            } catch (err) {
                console.error(err);
                dataHub.error = true;
                dataHubs.push(dataHub);
            }
        }

        return dataHubs;
    }
}
