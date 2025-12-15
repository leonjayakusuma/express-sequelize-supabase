import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import { RecipeTable } from "./recipe.model";

export type Instruction = {
    recipeId: number;
    stepNo: number;
    instruction: string;
};

@Table({ timestamps: false, tableName: "Instructions" })
export class InstructionTable extends Model<Instruction> {
    @PrimaryKey
    @ForeignKey(() => RecipeTable)
    @Column({ type: DataType.SMALLINT, primaryKey: true })
    recipeId!: Instruction["recipeId"];

    @PrimaryKey
    @Column({ type: DataType.SMALLINT, validate: { min: 1 } })
    stepNo!: Instruction["stepNo"];

    @Column({
        type: DataType.STRING(1001), // +1 for null terminator in mysql because it fails 1000 character limit
        allowNull: false,
        validate: {
            notEmpty: { msg: "Instruction cannot be empty" },
        },
    })
    instruction!: Instruction["instruction"];

    @BelongsTo(() => RecipeTable, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    recipe!: RecipeTable;
}
