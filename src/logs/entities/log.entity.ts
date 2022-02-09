import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LogDocument = Log & Document;

@Schema({ timestamps: true })
export class Log {
  @Prop()
  hub: string;

  @Prop()
  taskNumber: string;

  @Prop()
  taskName: string;

  @Prop()
  status: string;

  @Prop()
  lastRun: string;

  @Prop()
  normalizationDate: Date;

  @Prop({ expires: 60 * 60 * 24 * 45 })
  createdAt: Date;
}
export const LogSchema = SchemaFactory.createForClass(Log);
