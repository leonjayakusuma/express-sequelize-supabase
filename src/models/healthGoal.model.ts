import {
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";

export type HealthGoal = {
    name: "weight loss" | "health improvements" | "muscle gain";
};

@Table({ timestamps: false, tableName: "HealthGoals" })
export class HealthGoalTable extends Model<HealthGoal> {
    @PrimaryKey
    @Column({
        type: DataType.STRING(21), // +1 for null terminator in mysql because it fails 20 character limit
        validate: { notEmpty: { msg: "Name cannot be empty" } },
    })
    name!: HealthGoal["name"];
}
