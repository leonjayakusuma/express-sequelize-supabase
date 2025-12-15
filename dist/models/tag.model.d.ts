import { Model } from "sequelize-typescript";
import { ItemTable } from "./item.model";
import { ItemTagTable } from "./itemTag.model";
export type Tag = {
    name: string;
};
export declare class TagTable extends Model<Tag> {
    name: Tag["name"];
    items: Array<ItemTable & {
        ItemTag: ItemTagTable;
    }>;
}
//# sourceMappingURL=tag.model.d.ts.map