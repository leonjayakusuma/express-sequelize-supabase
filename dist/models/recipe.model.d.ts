import { Model } from "sequelize-typescript";
import { RecipeIngredientTable } from "./recipeIngredient.model";
import { IngredientTable } from "./ingredient.model";
import { InstructionTable } from "./instruction.model";
export type Recipe = {
    id: number;
    name: string;
    link: string;
    calories: number;
    carbs: number;
    fat: number;
    protein: number;
};
export type CreateRecipe = Omit<Recipe, "id">;
export declare class RecipeTable extends Model<Recipe, CreateRecipe> {
    id: Recipe["id"];
    name: Recipe["name"];
    link: Recipe["link"];
    calories: Recipe["calories"];
    carbs: Recipe["carbs"];
    fat: Recipe["fat"];
    protein: Recipe["protein"];
    ingredients: Array<IngredientTable & {
        RecipeIngredient: RecipeIngredientTable;
    }>;
    instructions: InstructionTable[];
}
//# sourceMappingURL=recipe.model.d.ts.map