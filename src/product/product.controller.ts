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
import { ProductService } from 'src/product/product.service';
import {
  CreateProductDto,
  DeleteProductDto,
  UpdateProductDto,
} from 'src/product/product.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request as ExpressRequest } from 'express';
import { UserSearchService } from 'src/user/search/userSearch.service';
import { CreateUserSearchDto } from 'src/user/search/userSearch.dto';
import { ProductPointService } from 'src/product/point/productPoint.service';
import { CartProductService } from 'src/cart/product/cartProduct.service';
import { ProductTagService } from './tag/productTag.service';

@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService,
    private productPointService: ProductPointService,
    private userSearchService: UserSearchService,
    private cartProductService: CartProductService,
    private productTagService: ProductTagService,
  ) {}

  @Get()
  async getAll(
    @Query('n') name: string,
    @Query('d') description: string,
    @Query('b') brand: string,
    @Query('t') tag: string,
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
          }&b=${brand ? brand : ''}&t=${tag ? tag : ''}`,
          user_id: req.user.userId,
        };
        console.log('Created Search object, saving...');
        const search = await this.userSearchService.createSearch(newSearch);
        console.log(search);
      }
      return this.productService.findAll(name, description, brand, tag);
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
  async getOneById(@Param('id') id: number, @Request() req) {
    try {
      console.log('Entered execution of controller.product.getOneById');
      // Bring last point added to product
      const lastProductPoint =
        await this.productPointService.getLastPointByProductId(id);
      // Get the timestamp from a minute ago
      const aMinuteAgo = new Date(Date.now() - 60000);
      // If the last point was added more than a minute ago, add a new point
      console.log(
        'About to check if the last product point was added less than a minute ago',
      );
      if (!lastProductPoint || lastProductPoint.creationDate < aMinuteAgo)
        this.productPointService.createProductPoint({
          product_id: id,
          reason: 'visit',
          value: 1,
        });
      console.log('About to get the product data');
      const product = await this.productService.findById(id);
      let isOnCart = false;
      console.log(req.user);
      if (req.user.userId) {
        console.log('About to check if the user has the product on cart');
        console.log(
          await this.cartProductService.isProductOnUsersCart(
            id,
            req.user.userId,
          ),
          'Is on cart',
        );
        isOnCart = await this.cartProductService.isProductOnUsersCart(
          id,
          req.user.userId,
        );
      }
      const response = { ...product.dataValues, is_on_cart: isOnCart };
      return response;
    } catch (error) {
      if (error.message) throw new HttpException(error.message, 500);
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
      const product = await this.productService.create(createProductDto);
      if (createProductDto.tags_ids) {
        createProductDto.tags_ids.forEach(
          async (tag) =>
            await this.productTagService.assignTagToProductById(
              product.id,
              tag,
            ),
        );
      }
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
    return await this.productService.updateImageById(imagePath, params.id);
  }

  // TODO: Fix inefficient code on deleting and iterating through tags
  @UseGuards(JwtAuthGuard)
  @Put()
  async updateProduct(@Body() updateProductDto: UpdateProductDto) {
    try {
      // Update product data
      await this.productService.updateById(updateProductDto);
      // If tags were present
      if (updateProductDto.tags_ids) {
        // Delete all previous tags (to ensure not-present tags are removed)
        await this.productTagService.removeAllTagsFromProductById(
          updateProductDto.id,
        );
        // Iterate through new tags and add them
        updateProductDto.tags_ids.forEach(
          async (tag) =>
            await this.productTagService.assignTagToProductById(
              updateProductDto.id,
              tag,
            ),
        );
      }
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
