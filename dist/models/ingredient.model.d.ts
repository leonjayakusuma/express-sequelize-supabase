import { Model } from "sequelize-typescript";
import { RecipeIngredientTable } from "./recipeIngredient.model";
import { RecipeTable } from "./recipe.model";
export type Ingredient = {
    name: string;
};
export declare class IngredientTable extends Model<Ingredient> {
    name: Ingredient["name"];
    recipes: Array<RecipeTable & {
        RecipeIngredient: RecipeIngredientTable;
    }>;
}
//# sourceMappingURL=ingredient.model.d.ts.map