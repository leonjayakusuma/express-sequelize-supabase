import { Model } from "sequelize-typescript";
import { ItemTable } from "./item.model";
import { TagTable, Tag } from "./tag.model";
export type ItemTag = {
    itemId: number;
    tagName: Tag["name"];
};
export declare class ItemTagTable extends Model<ItemTag> {
    itemId: ItemTag["itemId"];
    tagName: ItemTag["tagName"];
    item: ItemTable;
    tag: TagTable;
}
//# sourceMappingURL=itemTag.model.d.ts.map