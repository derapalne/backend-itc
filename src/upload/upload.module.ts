import { Module } from '@nestjs/common';
import { UploadController } from 'src/upload/upload.controller';

@Module({ controllers: [UploadController] })
export class UploadModule {}
