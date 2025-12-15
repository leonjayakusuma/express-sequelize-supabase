import { Model } from "sequelize-typescript";
import { UserTable } from "./user.model";
import { ItemTable } from "./item.model";
export interface CartItem {
    userId: number;
    itemId: number;
    quantity: number;
}
export interface CreateCartItem extends Omit<CartItem, "quantity"> {
    quantity?: number;
}
export declare class CartItemTable extends Model<CartItem, CreateCartItem> {
    userId: CartItem["userId"];
    itemId: CartItem["itemId"];
    quantity: CartItem["quantity"];
    user: UserTable;
    item: ItemTable;
}
//# sourceMappingURL=cartItem.model.d.ts.map