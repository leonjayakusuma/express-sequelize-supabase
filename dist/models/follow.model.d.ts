import { Model } from "sequelize-typescript";
import { UserTable } from "./user.model";
export type Follow = {
    followerId: number;
    followingId: number;
};
export declare class FollowTable extends Model<Follow> {
    followerId: Follow["followerId"];
    followingId: Follow["followingId"];
    followingUser: UserTable;
    followerUser: UserTable;
}
//# sourceMappingURL=follow.model.d.ts.map