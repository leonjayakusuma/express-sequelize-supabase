import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    PrimaryKey,
    BelongsTo,
} from "sequelize-typescript";
import { UserTable } from "./user.model";

export type Follow = {
    followerId: number;
    followingId: number;
};

@Table({ timestamps: false, tableName: "Follows" })
export class FollowTable extends Model<Follow> {
    @PrimaryKey
    @ForeignKey(() => UserTable)
    @Column(DataType.INTEGER)
    followerId!: Follow["followerId"];

    @PrimaryKey
    @ForeignKey(() => UserTable)
    @Column(DataType.INTEGER)
    followingId!: Follow["followingId"];

    @BelongsTo(() => UserTable, {
        foreignKey: "followingId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    followingUser!: UserTable;

    @BelongsTo(() => UserTable, {
        foreignKey: "followerId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    followerUser!: UserTable;
}
