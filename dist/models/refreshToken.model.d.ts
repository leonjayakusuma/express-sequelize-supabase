import { Model } from "sequelize-typescript";
export type RefreshToken = {
    userId: number;
    refreshToken: string;
    expiration: Date;
};
export type CreateRefreshToken = Omit<RefreshToken, "expiration">;
export declare class RefreshTokenTable extends Model<RefreshToken> {
    userId: RefreshToken["userId"];
    refreshToken: RefreshToken["refreshToken"];
    expiration: RefreshToken["expiration"];
}
//# sourceMappingURL=refreshToken.model.d.ts.map