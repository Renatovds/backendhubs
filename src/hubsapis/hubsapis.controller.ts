import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HubsapisService } from './hubsapis.service';
import { CreateHubsapiDto } from './dto/create-hubsapi.dto';
import { UpdateHubsapiDto } from './dto/update-hubsapi.dto';

@Controller('hubsapis')
export class HubsapisController {
  constructor(private readonly hubsapisService: HubsapisService) {}

  @Post()
  create(@Body() createHubsapiDto: CreateHubsapiDto) {
    return this.hubsapisService.create(createHubsapiDto);
  }

  @Get()
  findAll() {
    return this.hubsapisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hubsapisService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateHubsapiDto: UpdateHubsapiDto,
  ) {
    return await this.hubsapisService.update(id, updateHubsapiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hubsapisService.remove(id);
  }
}
