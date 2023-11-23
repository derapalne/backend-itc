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
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { ProductService } from 'src/services/product.service';
import {
  CreateProductDto,
  DeleteProductDto,
  UpdateProductDto,
} from 'src/dtos/product.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request } from 'express';
// import { extname } from 'path';

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
      if (id === 'random') return this.productService.findRandom();
      return this.productService.findById(id);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      return await this.productService.create(createProductDto);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id/image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, f: Express.Multer.File, cb) => {
          return cb(null, `${Date.now()}_${f.originalname.replace(' ', '_')}`);
        },
      }),
    }),
  )
  async updateProductImage(
    @Req() req: Request,
    @UploadedFile() image: Express.Multer.File,
    @Param() params: any,
  ) {
    console.log(image);
    console.log(params.id);
    const imagePath = `${req.protocol}://${req.get('Host')}/${image.path}`;
    console.log(imagePath);
    return await this.productService.updateImageById(imagePath, params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateProduct(@Body() updateProductDto: UpdateProductDto) {
    try {
      return await this.productService.updateById(updateProductDto);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteProduct(@Body() deleteProductDto: DeleteProductDto) {
    try {
      return await this.productService.deleteById(deleteProductDto.id);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
