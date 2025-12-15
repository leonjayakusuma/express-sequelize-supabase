import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import { ItemTable } from "./item.model";
import { TagTable, Tag } from "./tag.model";

export type ItemTag = {
    itemId: number;
    tagName: Tag["name"];
};

@Table({ timestamps: false, tableName: "ItemTags" })
export class ItemTagTable extends Model<ItemTag> {
    @PrimaryKey
    @ForeignKey(() => ItemTable)
    @Column({ type: DataType.INTEGER })
    itemId!: ItemTag["itemId"];

    @PrimaryKey
    @ForeignKey(() => TagTable)
    @Column(DataType.STRING(51)) // +1 for null terminator in mysql because it fails 50 character limit
    tagName!: ItemTag["tagName"];

    @BelongsTo(() => ItemTable, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    item!: ItemTable;

    @BelongsTo(() => TagTable, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    tag!: TagTable;
}
