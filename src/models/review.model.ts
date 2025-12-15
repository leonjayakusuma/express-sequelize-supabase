import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    PrimaryKey,
    AutoIncrement,
} from "sequelize-typescript";
import { ItemTable } from "./item.model";
import { UserTable } from "./user.model";

export type Review = {
    id: number;
    userId: number;
    itemId: number;
    rating: number;
    reviewTxt?: string;
    dateCreated?: Date;
    isDeleted: boolean;
    isFlagged: boolean;
};

export interface CreateReview
    extends Omit<Review, "id" | "dateCreated" | "isDeleted" | "isFlagged"> {
    isFlagged?: boolean;
}

@Table({ timestamps: false, tableName: "Reviews" })
export class ReviewTable extends Model<Review, CreateReview> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: Review["id"];

    @ForeignKey(() => UserTable)
    @Column(DataType.INTEGER)
    userId!: Review["userId"];

    @ForeignKey(() => ItemTable)
    @Column(DataType.INTEGER)
    itemId!: Review["itemId"];

    @Column({
        type: DataType.FLOAT(10),
        allowNull: false,
        validate: {
            min: 0,
            max: 5,
        },
    })
    rating!: Review["rating"];

    @Column({
        type: DataType.STRING(1001), // +1 for null terminator in mysql because it fails 1000 character limit
        validate: {
            notEmpty: true,
        },
    })
    reviewTxt!: Review["reviewTxt"];

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
        allowNull: false,
    })
    dateCreated!: Date;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    })
    isDeleted!: boolean;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    })
    isFlagged!: boolean;

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
