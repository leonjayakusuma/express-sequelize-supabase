import { Model } from "sequelize-typescript";
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
export declare class UserTable extends Model<User, CreateUser> {
    id: User["id"];
    email: User["email"];
    name: User["name"];
    pswdHash: User["pswdHash"];
    dateJoined: User["dateJoined"];
    isBlocked: User["isBlocked"];
    cart: Array<ItemTable & {
        CartItem: CartItemTable;
    }>;
    personalInfo: PersonalInfoTable;
    followings: Array<UserTable & {
        Follow: FollowTable;
    }>;
    followers: Array<UserTable & {
        Follow: FollowTable;
    }>;
}
//# sourceMappingURL=user.model.d.ts.map