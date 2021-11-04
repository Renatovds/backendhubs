import { PartialType } from '@nestjs/mapped-types';
import { CreateFilterDto } from './create-filter.dto';

export class UpdateFilterDto extends PartialType(CreateFilterDto) {
  name: string;
  id_hub: string;
  tasks: string[];
}
