import { Model } from "sequelize-typescript";
export type ActivityLevel = {
    name: "low" | "med" | "high";
};
export declare class ActivityLevelTable extends Model<ActivityLevel> {
    name: ActivityLevel["name"];
}
//# sourceMappingURL=activityLevel.model%20copy.d.ts.map