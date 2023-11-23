import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('uploads')
export class UploadController {
  @Get(':filename')
  getFile(@Param() params: any): StreamableFile {
    const file = createReadStream(
      join(process.cwd(), `/uploads/${params.filename}`),
    );
    return new StreamableFile(file);
  }
}
