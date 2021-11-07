import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Task } from '../interfaces/task.interface';
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
      };
    });
    for await (const response of hubsResponses) {
      const dataHub: DataHub = {
        id_HUB: response.id,
        name: response.name,
        tasks: [],
      };
      await (
        await response.responseDataHub
      ).data.map((item) =>
        Object.keys(item).map((key) => dataHub.tasks.push(item[key])),
      );
      dataHubs.push(dataHub);
      console.log(dataHub);
    }

    return dataHubs;
  }
}
