import { Model } from "sequelize-typescript";
import { RecipeTable } from "./recipe.model";
export type Instruction = {
    recipeId: number;
    stepNo: number;
    instruction: string;
};
export declare class InstructionTable extends Model<Instruction> {
    recipeId: Instruction["recipeId"];
    stepNo: Instruction["stepNo"];
    instruction: Instruction["instruction"];
    recipe: RecipeTable;
}
//# sourceMappingURL=instruction.model.d.ts.map