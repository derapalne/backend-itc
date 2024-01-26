import { Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { CreateBrandDto } from 'src/brand/brand.dto';
import { CreateProductDto } from 'src/product/product.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { BrandService } from 'src/brand/brand.service';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { TagService } from 'src/tag/tag.service';
import { CreateTagDto } from 'src/tag/tag.dto';
import { Product } from 'src/product/product.model';
import { ProductTagService } from 'src/product/tag/productTag.service';

@Controller('init')
export class InitController {
  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private userService: UserService,
    private tagService: TagService,
    private productTagService: ProductTagService,
  ) {}

  @Post()
  async initDatabase() {
    // Search for default user and if not exists create one
    let defaultUser = await this.userService.findByUsername('default');
    if (!defaultUser)
      defaultUser = await this.userService.createUser({
        username: 'default',
        password: 'defaultuser5',
        matchingPassword: 'defaultuser5',
      });
    // Search for existing brands and products
    const existingBrands = await this.brandService.findAll();
    const existingProducts = await this.productService.findAll();
    // Terminate execution if there are existing brands and products
    if (existingBrands.length && existingProducts.length)
      return { error: 'Database already initialized' };
    // Create tags
    const tag1: CreateTagDto = {
      name: 'beach',
      active: true,
    };
    const tag2: CreateTagDto = {
      name: 'space',
      active: true,
    };
    const tag3: CreateTagDto = {
      name: 'bullying',
      active: true,
    };
    const tag4: CreateTagDto = {
      name: 'confusion',
      active: true,
    };
    const tag5: CreateTagDto = {
      name: 'appliance',
      active: true,
    };
    const savedTag1 = await this.tagService.createTag(tag1);
    const savedTag2 = await this.tagService.createTag(tag2);
    const savedTag3 = await this.tagService.createTag(tag3);
    const savedTag4 = await this.tagService.createTag(tag4);
    const savedTag5 = await this.tagService.createTag(tag5);
    if (!savedTag1 || !savedTag2 || !savedTag3 || !savedTag4 || !savedTag5)
      return { error: 'Error saving tags' };
    // Create Brands
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
      creator_user_id: defaultUser.id,
      tags_ids: [savedTag4.id, savedTag3.id],
    };
    const product2: CreateProductDto = {
      name: 'Hearing Loss',
      description: 'Eventually, you will stop hearing.',
      price: 5200,
      image_url:
        'https://pics.freeicons.io/uploads/icons/png/20026720911684167748-512.png',
      brand_id: savedBrand2.id,
      creator_user_id: defaultUser.id,
      tags_ids: [savedTag4.id, savedTag3.id, savedTag2.id],
    };
    const product3: CreateProductDto = {
      name: 'Fix The Snakes',
      description:
        "Fix all snakes with a wrench. Otherwise they'd be too powerful. This was kind of a bug. Now you have to pay to fix it.",
      price: 16000,
      image_url:
        'https://pics.freeicons.io/uploads/icons/png/2301764921684167749-512.png',
      brand_id: savedBrand3.id,
      creator_user_id: defaultUser.id,
      tags_ids: [savedTag4.id, savedTag5.id],
    };
    const product4: CreateProductDto = {
      name: 'Eat So Much You No-Clip Into The Walls',
      description: 'No further explanation needed.',
      price: 784999,
      image_url:
        'https://pics.freeicons.io/uploads/icons/png/11687572861684167751-512.png',
      brand_id: savedBrand4.id,
      creator_user_id: defaultUser.id,
      tags_ids: [
        savedTag1.id,
        savedTag2.id,
        savedTag3.id,
        savedTag4.id,
        savedTag5.id,
      ],
    };
    const product5: CreateProductDto = {
      name: 'A Big B',
      description:
        'Just a big letter B to accompany you in your darkest, saddest moments. Very comforting. May cuddle if requested to.',
      price: 14999,
      image_url:
        'https://pics.freeicons.io/uploads/icons/png/2990294221684167750-512.png',
      brand_id: savedBrand1.id,
      creator_user_id: defaultUser.id,
      tags_ids: [savedTag5.id],
    };
    const product6: CreateProductDto = {
      name: 'Antique Radio',
      description:
        'Only plays hits from 1959 to 1976. Contact seller for showcase before purchasing.',
      price: 2500,
      image_url:
        'https://pics.freeicons.io/uploads/icons/png/19957571011684167751-512.png',
      brand_id: savedBrand1.id,
      creator_user_id: defaultUser.id,
      tags_ids: [savedTag5.id, savedTag4.id],
    };
    const product7: CreateProductDto = {
      name: 'Cursed Parasol',
      description:
        'This parasol gets smaller everytime you use it until it reaches the floor, then it will revert to its original height.',
      price: 1890,
      image_url:
        'https://pics.freeicons.io/uploads/icons/png/456725181684167750-512.png',
      brand_id: savedBrand2.id,
      creator_user_id: defaultUser.id,
      tags_ids: [savedTag1.id, savedTag3.id],
    };
    const product8: CreateProductDto = {
      name: 'Hyper Bullying',
      description:
        'The unfortunate person who is gifted this exquisite Hyper Bullying will be the reciever of extreme, goofy, unstoppable bullying for at least 3 to 5 years. 1 year redeem warranty.',
      price: 85900,
      image_url:
        'https://pics.freeicons.io/uploads/icons/png/11803857551684167754-512.png',
      brand_id: savedBrand3.id,
      creator_user_id: defaultUser.id,
      tags_ids: [savedTag3.id],
    };
    const product9: CreateProductDto = {
      name: 'Ban Spaceships',
      description:
        'Stop all spaceships flying on national airspace for 35 years.',
      price: 150000,
      image_url:
        'https://pics.freeicons.io/uploads/icons/png/15181181791684167751-512.png',
      brand_id: savedBrand4.id,
      creator_user_id: defaultUser.id,
      tags_ids: [savedTag2.id],
    };
    const product10: CreateProductDto = {
      name: 'Indestructible Brick Wall',
      description:
        'A big indestructible, impossible to tresspass brick wall. 10 meters wide 3 meters high, prebuilt and delivered straight to your home.',
      price: 8950,
      image_url:
        'https://pics.freeicons.io/uploads/icons/png/15370948411684167753-512.png',
      brand_id: savedBrand1.id,
      creator_user_id: defaultUser.id,
      tags_ids: [savedTag5.id, savedTag2.id],
    };
    // Save Products
    const savedProduct1 = await this.productService.create(product1 as any);
    const savedProduct2 = await this.productService.create(product2 as any);
    const savedProduct3 = await this.productService.create(product3 as any);
    const savedProduct4 = await this.productService.create(product4 as any);
    const savedProduct5 = await this.productService.create(product5 as any);
    const savedProduct6 = await this.productService.create(product6 as any);
    const savedProduct7 = await this.productService.create(product7 as any);
    const savedProduct8 = await this.productService.create(product8 as any);
    const savedProduct9 = await this.productService.create(product9 as any);
    const savedProduct10 = await this.productService.create(product10 as any);
    // Verify
    if (
      !savedProduct1 ||
      !savedProduct2 ||
      !savedProduct3 ||
      !savedProduct4 ||
      !savedProduct5 ||
      !savedProduct6 ||
      !savedProduct7 ||
      !savedProduct8 ||
      !savedProduct9 ||
      !savedProduct10
    )
      return { error: 'Error saving products' };
    const products: CreateProductDto[] = [
      product1,
      product2,
      product3,
      product4,
      product5,
      product6,
      product7,
      product8,
      product9,
      product10,
    ];
    const savedProducts: Product[] = [
      savedProduct1,
      savedProduct2,
      savedProduct3,
      savedProduct4,
      savedProduct5,
      savedProduct6,
      savedProduct7,
      savedProduct8,
      savedProduct9,
      savedProduct10,
    ];
    products.forEach((p, i) => {
      p.tags_ids.forEach(async (t) => {
        await this.productTagService.assignTagToProductById(
          savedProducts[i].id,
          t,
        );
      });
    });
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
