import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
} from "sequelize-typescript";

export type RefreshToken = {
    userId: number;
    refreshToken: string;
    expiration: Date;
};

export type CreateRefreshToken = Omit<RefreshToken, "expiration">;

@Table({ timestamps: false, tableName: "RefreshTokens" })
export class RefreshTokenTable extends Model<RefreshToken> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER })
    userId!: RefreshToken["userId"];

    @PrimaryKey
    @Column({
        type: DataType.STRING(256), // +1 for null terminator in mysql because it fails 255 character limit
        validate: {
            notEmpty: { msg: "Email cannot be empty" },
        },
    })
    refreshToken!: RefreshToken["refreshToken"];

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    expiration!: RefreshToken["expiration"];
}
