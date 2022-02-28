import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    StreamableFile,
    Response,
} from '@nestjs/common';
import { LogsService } from './logs.service';
import { CSVBuilder } from './csvBuilder.service';
import * as fs from 'fs';
import { join } from 'path';
import { CSVDTO } from 'src/interfaces/csvDTO.interface';

@Controller('logs')
export class LogsController {
    constructor(
        private readonly logsService: LogsService,
        private readonly csvBuilder: CSVBuilder,
    ) {}

    @Post()
    async findDate(@Body() csvdata: CSVDTO) {
        if (isNaN(csvdata.daysback)) {
            return 'Parametro invalido';
        } else {
            await this.csvBuilder.execute(csvdata);
        }
    }

    @Get('file/:user')
    getFile(
        @Response({ passthrough: true }) res,
        @Param('user') user: string,
    ): StreamableFile {
        if (fs.existsSync(join(process.cwd(), `${user}log.csv`))) {
            const file = fs.createReadStream(
                join(process.cwd(), `${user}log.csv`),
            );
            res.set({
                'Content-Type': 'text/csv',
                'Content-Disposition': 'attachment; filename="log.csv"',
            });
            fs.stat(join(process.cwd(), `${user}log.csv`), (err, stats) => {
                console.log(err, stats);
            });
            fs.unlinkSync(join(process.cwd(), `${user}log.csv`));
            return new StreamableFile(file);
        } else {
            return null;
        }
    }
}
