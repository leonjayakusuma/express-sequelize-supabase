import { Model } from "sequelize-typescript";
export type DietaryPreference = {
    name: "any" | "vegetarian" | "vegan";
};
export declare class DietaryPreferenceTable extends Model<DietaryPreference> {
    name: DietaryPreference["name"];
}
//# sourceMappingURL=dietaryPreference.model.d.ts.map