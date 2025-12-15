import { CreationOptional } from "sequelize";
import { Model } from "sequelize-typescript";
import { CartItemTable } from "./cartItem.model";
import { TagTable } from "./tag.model";
import { ItemTagTable } from "./itemTag.model";
import { UserTable } from "./user.model";
export type Item = {
    id: number;
    title: string;
    description: string;
    price: number;
    discount: number;
    isSpecial: boolean;
    imgUrl?: string;
};
export interface CreateItem extends Omit<Item, "id" | "isSpecial"> {
    id?: number;
    isSpecial?: boolean;
}
export declare class ItemTable extends Model<Item, CreateItem> {
    id: CreationOptional<number>;
    title: Item["title"];
    description: Item["description"];
    price: Item["price"];
    discount: Item["discount"];
    isSpecial: boolean;
    imgUrl: Item["imgUrl"];
    users: Array<UserTable & {
        CartItem: CartItemTable;
    }>;
    tags: Array<TagTable & {
        ItemTag: ItemTagTable;
    }>;
}
//# sourceMappingURL=item.model.d.ts.map