import {
    Table,
    Column,
    Model,
    DataType,
    BelongsTo,
    ForeignKey,
    PrimaryKey,
} from "sequelize-typescript";
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

@Table({ timestamps: false, tableName: "CartItems" })
export class CartItemTable extends Model<CartItem, CreateCartItem> {
    @PrimaryKey
    @ForeignKey(() => UserTable)
    @Column(DataType.INTEGER)
    userId!: CartItem["userId"];

    @PrimaryKey
    @ForeignKey(() => ItemTable)
    @Column(DataType.INTEGER)
    itemId!: CartItem["itemId"];

    @Column({
        type: DataType.SMALLINT,
        validate: {
            min: 1,
        },
        defaultValue: 1,
        allowNull: false,
    })
    quantity!: CartItem["quantity"];

    @BelongsTo(() => UserTable, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    user!: UserTable;

    @BelongsTo(() => ItemTable, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    item!: ItemTable;
}
