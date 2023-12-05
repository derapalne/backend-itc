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
  Request,
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
import { Request as ExpressRequest } from 'express';
import { UserSearchService } from 'src/services/userSearch.service';
import { CreateUserSearchDto } from 'src/dtos/userSearch.dto';
import { ProductPointService } from 'src/services/productPoint.service';
// import { extname } from 'path';

@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService,
    private productPointService: ProductPointService,
    private userSearchService: UserSearchService,
  ) {}

  @Get()
  async getAll(
    @Query('n') name: string,
    @Query('d') description: string,
    @Query('b') brand: string,
    @Request() req,
  ) {
    try {
      if ((name || description || brand) && req.user.userId) {
        console.log('Creating search object...');
        console.log(req.user);
        const newSearch: CreateUserSearchDto = {
          title: name,
          // Url reformatted
          value: `?n=${name ? name : ''}&d=${
            description ? description : ''
          }&b=${brand ? brand : ''}`,
          user_id: req.user.userId,
        };
        console.log('Created Search object, saving...');
        const search = await this.userSearchService.createSearch(newSearch);
        console.log(search);
      }
      return this.productService.findAll(name, description, brand);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Get('/listing')
  async getForListings(
    @Query('n') name: string,
    @Query('d') description: string,
    @Query('l') limit: number,
  ) {
    try {
      console.log('listing');
      return this.productService.findForListing(name, description, limit);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Get('/random')
  async getOneRandom() {
    try {
      return await this.productService.findRandom();
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  @Get(':id')
  async getOneById(@Param('id') id: number) {
    try {
      const lastProductPoint =
        await this.productPointService.getLastPointByProductId(id);
      const aMinuteAgo = new Date(Date.now() - 60000);
      if (!lastProductPoint || lastProductPoint.creationDate < aMinuteAgo)
        this.productPointService.createProductPoint({
          product_id: id,
          reason: 'visit',
          value: 1,
        });
      return await this.productService.findById(id);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Request() req,
  ) {
    try {
      createProductDto.creator_user_id = req.user.userId;
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
    @Req() req: ExpressRequest,
    @UploadedFile() image: Express.Multer.File,
    @Param() params: any,
  ) {
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
