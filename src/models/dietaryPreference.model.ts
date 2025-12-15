import {
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";

export type DietaryPreference = {
    name: "any" | "vegetarian" | "vegan";
};

@Table({ timestamps: false, tableName: "DietaryPreferences" })
export class DietaryPreferenceTable extends Model<DietaryPreference> {
    @PrimaryKey
    @Column({
        type: DataType.STRING(21), // +1 for null terminator in mysql because it fails 20 character limit
        validate: { notEmpty: { msg: "Name cannot be empty" } },
    })
    name!: DietaryPreference["name"];
}
