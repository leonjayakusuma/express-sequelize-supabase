import { CreationOptional } from "sequelize";
import {
    Table,
    Column,
    Model,
    DataType,
    BelongsToMany,
    PrimaryKey,
} from "sequelize-typescript";
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

@Table({ timestamps: false, tableName: "Items" })
export class ItemTable extends Model<Item, CreateItem> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, autoIncrement: true })
    declare id: CreationOptional<number>;

    @Column({
        type: DataType.TEXT("tiny"),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Email cannot be empty" },
        },
    })
    title!: Item["title"];

    @Column({
        type: DataType.STRING(1001), // +1 for null terminator in mysql because it fails 1000 character limit
        allowNull: false,
        validate: {
            notEmpty: { msg: "description cannot be empty" },
        },
    })
    description!: Item["description"];

    @Column({ type: DataType.FLOAT(10), allowNull: false })
    price!: Item["price"];

    @Column({ type: DataType.SMALLINT, allowNull: false })
    discount!: Item["discount"];

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    isSpecial!: boolean;

    @Column({ type: DataType.STRING(1001) })
    imgUrl!: Item["imgUrl"];

    @BelongsToMany(() => UserTable, () => CartItemTable)
    users!: Array<UserTable & { CartItem: CartItemTable }>;

    @BelongsToMany(() => TagTable, () => ItemTagTable)
    tags!: Array<TagTable & { ItemTag: ItemTagTable }>;
}
