import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FilterDocument = Filter & Document;

@Schema()
export class Filter {
  @Prop()
  name: string;

  @Prop()
  id_hub: string;
  @Prop()
  tasks: string[];
}

export const FilterSchema = SchemaFactory.createForClass(Filter);
