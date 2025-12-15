import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from "sequelize-typescript";
import { IngredientTable, Ingredient } from "./ingredient.model";
import { RecipeTable } from "./recipe.model";

export type RecipeIngredient = {
    recipeId: number;
    ingredientName: Ingredient["name"];
};

@Table({ timestamps: false, tableName: "RecipeIngredients" })
export class RecipeIngredientTable extends Model<RecipeIngredient> {
    @ForeignKey(() => RecipeTable)
    @Column({ type: DataType.SMALLINT, allowNull: false })
    recipeId!: RecipeIngredient["recipeId"];

    @ForeignKey(() => IngredientTable)
    @Column({
        type: DataType.STRING(101), // +1 for null terminator in mysql because it fails 100 character limit
        allowNull: false,
        validate: {
            notEmpty: { msg: "Ingredient name cannot be empty" },
        },
    })
    ingredientName!: RecipeIngredient["ingredientName"];

    @BelongsTo(() => RecipeTable, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    recipe!: RecipeTable;

    @BelongsTo(() => IngredientTable, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    ingredient!: IngredientTable;
}
