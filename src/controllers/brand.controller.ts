import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  HttpException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BrandService } from 'src/services/brand.service';
import {
  CreateBrandDto,
  DeleteBrandDto,
  UpdateBrandDto,
} from 'src/dtos/brand.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('brands')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @Get()
  async getAll() {
    try {
      return this.brandService.findAll();
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  @Get(':id')
  async getOneById(@Param() params: any) {
    try {
      const id = params.id;
      return this.brandService.findById(id);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProduct(@Request() req, @Body() createBrandDto: CreateBrandDto) {
    try {
      console.log(req.user);
      return await this.brandService.create(createBrandDto);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateProduct(@Body() updateBrandDto: UpdateBrandDto) {
    try {
      return await this.brandService.updateById(updateBrandDto);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteProduct(@Body() deleteBrandDto: DeleteBrandDto) {
    try {
      return await this.brandService.deleteById(deleteBrandDto.id);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
