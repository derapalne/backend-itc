import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { literal } from 'sequelize';
import { CreateCartDto } from 'src/dtos/cart.dto';
import { Brand } from 'src/models/brand.model';
import { Cart } from 'src/models/cart.model';
import { CartProduct } from 'src/models/cartProduct.model';
import { Product } from 'src/models/product.model';
import { User } from 'src/models/user.model';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart) private cartModel: typeof Cart,
    @InjectModel(CartProduct) private cartProductModel: typeof CartProduct,
  ) {}

  async createCart(createCartDto: CreateCartDto): Promise<Cart> {
    return await this.cartModel.create<Cart>(createCartDto as any);
  }

  async addProductToCart(
    cartId: number,
    productId: number,
  ): Promise<CartProduct> {
    return await this.cartProductModel.create({
      cart_id: cartId,
      product_id: productId,
    });
  }

  async removeProductFromCart(
    cartId: number,
    productId: number,
  ): Promise<number> {
    return await this.cartProductModel.destroy({
      where: {
        cart_id: cartId,
        product_id: productId,
      },
    });
  }

  async getOrderedCartsByUserId(userId: number): Promise<Cart[]> {
    return await this.cartModel.findAll({
      where: { user_id: userId, is_active: false },
      include: [
        {
          model: Product,
          include: [
            Brand,
            {
              model: User,
              attributes: [
                'id',
                'username',
                [
                  literal(
                    `(SELECT COUNT(p.id) FROM product as p WHERE p.creator_user_id = 'products->user'.'id' AND p.deletedAt IS NULL)`,
                  ),
                  'n_products',
                ],
              ],
            },
          ],
        },
      ],
    });
  }

  async getActiveCartByUserId(userId: number): Promise<Cart> {
    return await this.cartModel.findOne({
      where: { user_id: userId, is_active: true },
      include: [
        {
          model: Product,
          include: [
            Brand,
            {
              model: User,
              attributes: [
                'id',
                'username',
                [
                  literal(
                    `(SELECT COUNT(p.id) FROM product as p WHERE p.creator_user_id = 'products->user'.'id' AND p.deletedAt IS NULL)`,
                  ),
                  'n_products',
                ],
              ],
            },
          ],
        },
      ],
    });
  }

  async getCartById(cartId: number): Promise<Cart> {
    return await this.cartModel.findOne({ where: { id: cartId } });
  }

  async markCartAsOrderedById(
    cartId: number,
  ): Promise<[affectedCount: number]> {
    return await this.cartModel.update(
      { is_active: false, ordered_on: Date.now() },
      { where: { id: cartId } },
    );
  }
}