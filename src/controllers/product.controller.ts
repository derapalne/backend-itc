import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  HttpException,
} from '@nestjs/common';
import { ProductService } from 'src/services/product.service';
import {
  CreateProductDto,
  DeleteProductDto,
  UpdateProductDto,
} from 'src/dtos/product.dto';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getAll(@Query('n') name: string, @Query('d') description: string) {
    try {
      return this.productService.findAll(name, description);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  @Get(':id')
  async getOneById(@Param() params: any) {
    try {
      const id = params.id;
      return this.productService.findById(id);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      return await this.productService.create(createProductDto);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  @Put()
  async updateProduct(@Body() updateProductDto: UpdateProductDto) {
    try {
      return await this.productService.updateById(updateProductDto);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  @Delete()
  async deleteProduct(@Body() deleteProductDto: DeleteProductDto) {
    try {
      return await this.productService.deleteById(deleteProductDto.id);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
