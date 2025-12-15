import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    BelongsToMany,
} from "sequelize-typescript";
import { ItemTable } from "./item.model";
import { ItemTagTable } from "./itemTag.model";

export type Tag = {
    name: string;
};

@Table({ timestamps: false, tableName: "Tags" })
export class TagTable extends Model<Tag> {
    @PrimaryKey
    @Column({ type: DataType.STRING(51) }) // +1 for null terminator in mysql because it fails 50 character limit
    name!: Tag["name"];

    @BelongsToMany(() => ItemTable, () => ItemTagTable)
    items!: Array<ItemTable & { ItemTag: ItemTagTable }>;
}
