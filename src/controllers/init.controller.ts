import { Controller, Delete, Post, Request, UseGuards } from '@nestjs/common';
import { CreateBrandDto } from 'src/dtos/brand.dto';
import { CreateProductDto } from 'src/dtos/product.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { BrandService } from 'src/services/brand.service';
import { ProductService } from 'src/services/product.service';

@Controller('init')
export class InitController {
  constructor(
    private productService: ProductService,
    private brandService: BrandService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async initDatabase(@Request() req) {
    // Fix req typing
    const activeUser = req.user;
    const existingBrands = await this.brandService.findAll();
    const existingProducts = await this.productService.findAll();
    if (existingBrands.length && existingProducts.length)
      return { error: 'Database already initialized' };
    // Brands
    const brand1: CreateBrandDto = {
      name: 'Grabados LTD.',
      logo_url:
        'https://pics.freeicons.io/uploads/icons/png/16798325991695535536-512.png',
    };
    const brand2: CreateBrandDto = {
      name: 'Singing Spirits',
      logo_url:
        'https://pics.freeicons.io/uploads/icons/png/5639170651695535536-512.png',
    };
    const brand3: CreateBrandDto = {
      name: 'Makro Services United',
      logo_url:
        'https://pics.freeicons.io/uploads/icons/png/14336193601695535539-512.png',
    };
    const brand4: CreateBrandDto = {
      name: 'Angry Ninja Ferret',
      logo_url:
        'https://pics.freeicons.io/uploads/icons/png/16469620061695535538-512.png',
    };
    // Save brands
    const savedBrand1 = await this.brandService.create(brand1 as any);
    const savedBrand2 = await this.brandService.create(brand2 as any);
    const savedBrand3 = await this.brandService.create(brand3 as any);
    const savedBrand4 = await this.brandService.create(brand4 as any);
    // Verify
    if (!savedBrand1 || !savedBrand2 || !savedBrand3 || !savedBrand4)
      return { error: 'Error saving brands' };
    // Products
    const product1: CreateProductDto = {
      name: 'Discrepancy',
      description: 'Makes you confused about two conflicting facts.',
      price: 1500,
      image_url:
        'https://pics.freeicons.io/uploads/icons/png/15442581531684167749-512.png',
      brand_id: savedBrand1.id,
      creator_user_id: activeUser.userId,
    };
    const product2: CreateProductDto = {
      name: 'Hearing Loss',
      description: 'Eventually, you will stop hearing.',
      price: 5200,
      image_url:
        'https://pics.freeicons.io/uploads/icons/png/20026720911684167748-512.png',
      brand_id: savedBrand2.id,
      creator_user_id: activeUser.userId,
    };
    const product3: CreateProductDto = {
      name: 'Fix The Snakes',
      description:
        "Fix all snakes with a wrench. Otherwise they'd be too powerful. This was kind of a bug. Now you have to pay to fix it.",
      price: 16000,
      image_url:
        'https://pics.freeicons.io/uploads/icons/png/2301764921684167749-512.png',
      brand_id: savedBrand3.id,
      creator_user_id: activeUser.userId,
    };
    const product4: CreateProductDto = {
      name: 'Eat So Much You No-Clip Into The Walls',
      description: 'No further explanation needed.',
      price: 784999,
      image_url:
        'https://pics.freeicons.io/uploads/icons/png/11687572861684167751-512.png',
      brand_id: savedBrand4.id,
      creator_user_id: activeUser.userId,
    };
    const product5: CreateProductDto = {
      name: 'A Big B',
      description:
        'Just a big letter B to accompany you in your darkest, saddest moments. Very comforting. May cuddle if requested to.',
      price: 14999,
      image_url:
        'https://pics.freeicons.io/uploads/icons/png/2990294221684167750-512.png',
      brand_id: savedBrand1.id,
      creator_user_id: activeUser.userId,
    };
    // Save Products
    const savedProduct1 = this.productService.create(product1 as any);
    const savedProduct2 = this.productService.create(product2 as any);
    const savedProduct3 = this.productService.create(product3 as any);
    const savedProduct4 = this.productService.create(product4 as any);
    const savedProduct5 = this.productService.create(product5 as any);
    // Verify
    if (
      !savedProduct1 ||
      !savedProduct2 ||
      !savedProduct3 ||
      !savedProduct4 ||
      !savedProduct5
    )
      return { error: 'Error saving products' };
    console.log(req.user.userId);
    return { success: 'Database initialized' };
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async truncateDatabase() {
    const productsDeleted = await this.productService.truncateTable();
    const brandsDeleted = await this.brandService.truncateTable();
    return {
      success: `${productsDeleted} products and ${brandsDeleted} brands deleted`,
    };
  }
}
