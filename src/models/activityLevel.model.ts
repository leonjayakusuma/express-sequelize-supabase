import {
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";

export type ActivityLevel = {
    name: "low" | "med" | "high";
}

@Table({ timestamps: false, tableName: "ActivityLevels" })
export class ActivityLevelTable extends Model<ActivityLevel> {
    @PrimaryKey
    @Column({
        type: DataType.STRING(21), // +1 for null terminator in mysql because it fails 20 character limit
        validate: { notEmpty: { msg: "Name cannot be empty" } },
    })
    name!: ActivityLevel["name"];
}
