import {
    Table,
    Column,
    Model,
    DataType,
    HasOne,
    BelongsToMany,
    PrimaryKey,
} from "sequelize-typescript";
import { CartItemTable } from "./cartItem.model";
import { PersonalInfoTable } from "./personalInfo.model";
import { ItemTable } from "./item.model";
import { FollowTable } from "./follow.model";

export type User = {
    id: number;
    email: string;
    name: string;
    pswdHash: string;
    dateJoined: Date;
    isBlocked: boolean;
};

export type CreateUser = Omit<User, "id" | "dateJoined" | "isBlocked">;

@Table({
    timestamps: false,
    indexes: [
        { unique: true, fields: ["name"] },
        { unique: true, fields: ["email"] },
    ], // https://github.com/sequelize/sequelize/issues/8984 - a 6 year old issue still hasn't been fixed ¯\_(ツ)_/¯
    tableName: "Users",
})
export class UserTable extends Model<User, CreateUser> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, autoIncrement: true })
    declare id: User["id"];

    @Column({
        type: DataType.STRING(255), // https://stackoverflow.com/a/574698/23929926 // +1 for null terminator in mysql because it fails 254 character limit
        allowNull: false,
        validate: {
            notEmpty: { msg: "Email cannot be empty" },
            isEmail: { msg: "Must be a valid email address" },
        },
        // unique: true,
    })
    email!: User["email"];

    @Column({
        type: DataType.STRING(16),
        allowNull: false,
        validate: { notEmpty: { msg: "Name cannot be empty" } },
        // unique: true,
    })
    name!: User["name"];

    @Column({
        type: DataType.TEXT("tiny"),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Password hash cannot be empty" },
        },
    })
    pswdHash!: User["pswdHash"]; // TODO: maybe pswdHash can be smaller

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
        allowNull: false,
    })
    dateJoined!: User["dateJoined"];

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    })
    isBlocked!: User["isBlocked"];

    @BelongsToMany(() => ItemTable, () => CartItemTable)
    cart!: Array<ItemTable & { CartItem: CartItemTable }>;

    @HasOne(() => PersonalInfoTable, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    personalInfo!: PersonalInfoTable;

    @BelongsToMany(
        () => UserTable,
        () => FollowTable,
        "followerId",
        "followingId",
    )
    followings!: Array<UserTable & { Follow: FollowTable }>;

    @BelongsToMany(
        () => UserTable,
        () => FollowTable,
        "followingId",
        "followerId",
    )
    followers!: Array<UserTable & { Follow: FollowTable }>;
}
