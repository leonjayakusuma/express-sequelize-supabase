import {
    BelongsToMany,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import { RecipeIngredientTable } from "./recipeIngredient.model";
import { RecipeTable } from "./recipe.model";

export type Ingredient = {
    name: string;
};

@Table({ timestamps: false, tableName: "Ingredients" })
export class IngredientTable extends Model<Ingredient> {
    @PrimaryKey
    @Column({
        type: DataType.STRING(101), // +1 for null terminator in mysql because it fails 100 character limit
        validate: {
            notEmpty: { msg: "Ingredient name cannot be empty" },
        },
    })
    name!: Ingredient["name"];

    @BelongsToMany(() => RecipeTable, () => RecipeIngredientTable)
    recipes!: Array<RecipeTable & { RecipeIngredient: RecipeIngredientTable }>;
}
