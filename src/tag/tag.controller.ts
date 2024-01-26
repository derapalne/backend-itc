import { Controller, HttpException, Query } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  async getTagsByName(@Query('n') name: string, @Query('l') limit: number) {
    try {
      return await this.tagService.findByName(name, limit);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
