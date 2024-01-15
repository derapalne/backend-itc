import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from 'src/models/cart.model';
import { CartProduct } from 'src/models/cartProduct.model';

@Injectable()
export class CartProductService {
  constructor(
    @InjectModel(CartProduct) private cartProductModel: typeof CartProduct,
    @InjectModel(Cart) private cartModel: typeof Cart,
  ) {}

  async isProductOnUsersCart(
    productId: number,
    userId: number,
  ): Promise<boolean> {
    console.log(productId, userId);
    const activeCart = await this.cartModel.findOne({
      where: { user_id: userId, is_active: true },
    });
    if (!activeCart) return false;
    const isInCart = await this.cartProductModel.findOne({
      where: { cart_id: activeCart.id, product_id: productId },
    });
    if (!isInCart) return false;
    return true;
  }
}
