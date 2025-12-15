import {
    Table,
    Column,
    Model,
    DataType,
    HasMany,
    BelongsToMany,
    PrimaryKey,
} from "sequelize-typescript";
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

@Table({ timestamps: false, tableName: "Recipes" })
export class RecipeTable extends Model<Recipe, CreateRecipe> {
    @PrimaryKey
    @Column({ type: DataType.SMALLINT, autoIncrement: true })
    declare id: Recipe["id"];

    @Column({
        type: DataType.TEXT("tiny"),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Email cannot be empty" },
        },
    })
    name!: Recipe["name"];

    @Column({
        type: DataType.TEXT("tiny"),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Email cannot be empty" },
        },
    })
    link!: Recipe["link"];

    @Column({ type: DataType.SMALLINT, allowNull: false })
    calories!: Recipe["calories"];

    @Column({ type: DataType.SMALLINT, allowNull: false })
    carbs!: Recipe["carbs"];

    @Column({ type: DataType.SMALLINT, allowNull: false })
    fat!: Recipe["fat"];

    @Column({ type: DataType.SMALLINT, allowNull: false })
    protein!: Recipe["protein"];

    @BelongsToMany(() => IngredientTable, () => RecipeIngredientTable)
    ingredients!: Array<
        IngredientTable & { RecipeIngredient: RecipeIngredientTable }
    >;

    @HasMany(() => InstructionTable)
    instructions!: InstructionTable[];
}
