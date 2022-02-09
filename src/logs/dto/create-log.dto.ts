export class CreateLogDto {
  hub: string;

  taskNumber: string;

  taskName: string;

  status: string;

  lastRun?: string;

  normalizationDate?: Date;

  created_at?: Date;
}
