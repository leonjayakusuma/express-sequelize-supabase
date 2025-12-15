import { Model } from "sequelize-typescript";
export type HealthGoal = {
    name: "weight loss" | "health improvements" | "muscle gain";
};
export declare class HealthGoalTable extends Model<HealthGoal> {
    name: HealthGoal["name"];
}
//# sourceMappingURL=healthGoal.model.d.ts.map