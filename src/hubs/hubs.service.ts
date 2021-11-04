import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Task } from '../interfaces/task.interface';
import * as hubData from './dataHUB.json';
import { HubsapisService } from '../hubsapis/hubsapis.service';

@Injectable()
export class HubsService {
  constructor(private hubsapisService: HubsapisService) {}
  async execute() {
    const dataHubs: Array<Task[]> = [];
    const hubs = await this.hubsapisService.findAll();
    const hubsLinks = hubs.map((hub) => hub.url);
    axios.all(hubsLinks.map((url) => axios.get(url))).then(
      axios.spread((...responses) => {
        responses.map((response) => {
          const dataTask: Task[] = [];
          response.data.map((item) =>
            Object.keys(item).map((key) => dataTask.push(item[key])),
          );
          dataHubs.push(dataTask);
          console.log(dataHubs);
        });
      }),
    );
    return dataHubs;
  }
}
