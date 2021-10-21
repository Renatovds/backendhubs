import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HubDocument = Hub & Document;

@Schema()
export class Hub {
  @Prop()
  name: string;

  @Prop()
  url: string;
}

export const HubSchema = SchemaFactory.createForClass(Hub);
