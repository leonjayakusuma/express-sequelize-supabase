import { Model } from "sequelize-typescript";
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
export interface CreateReview extends Omit<Review, "id" | "dateCreated" | "isDeleted" | "isFlagged"> {
    isFlagged?: boolean;
}
export declare class ReviewTable extends Model<Review, CreateReview> {
    id: Review["id"];
    userId: Review["userId"];
    itemId: Review["itemId"];
    rating: Review["rating"];
    reviewTxt: Review["reviewTxt"];
    dateCreated: Date;
    isDeleted: boolean;
    isFlagged: boolean;
    user: UserTable;
    item: ItemTable;
}
//# sourceMappingURL=review.model.d.ts.map