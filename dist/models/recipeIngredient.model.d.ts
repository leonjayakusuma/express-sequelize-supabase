import { Model } from "sequelize-typescript";
import { IngredientTable, Ingredient } from "./ingredient.model";
import { RecipeTable } from "./recipe.model";
export type RecipeIngredient = {
    recipeId: number;
    ingredientName: Ingredient["name"];
};
export declare class RecipeIngredientTable extends Model<RecipeIngredient> {
    recipeId: RecipeIngredient["recipeId"];
    ingredientName: RecipeIngredient["ingredientName"];
    recipe: RecipeTable;
    ingredient: IngredientTable;
}
//# sourceMappingURL=recipeIngredient.model.d.ts.map