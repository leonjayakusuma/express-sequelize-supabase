import {
    Column,
    DataType,
    PrimaryKey,
    Table,
    Model,
    BelongsTo,
    ForeignKey,
} from "sequelize-typescript";
import { UserTable } from "./user.model";
import { ActivityLevelTable, ActivityLevel } from "./activityLevel.model";
import { HealthGoalTable, HealthGoal } from "./healthGoal.model";
import {
    DietaryPreferenceTable,
    DietaryPreference,
} from "./dietaryPreference.model";

export type PersonalInfo = {
    userId: number;
    isMale: boolean;
    age: number;
    weight: number;
    weightGoal: number;
    weightGainPerWeek: number;
    height: number;
    bodyFatPerc: number;
    activityLevelName: ActivityLevel["name"];
    healthGoalName: HealthGoal["name"];
    dietaryPreferenceName: DietaryPreference["name"];
};

@Table({ timestamps: false, tableName: "PersonalInfos" })
export class PersonalInfoTable extends Model<PersonalInfo> {
    @PrimaryKey
    @ForeignKey(() => UserTable)
    @Column(DataType.INTEGER)
    userId!: PersonalInfo["userId"];

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    isMale!: PersonalInfo["isMale"];

    @Column({
        type: DataType.SMALLINT,
        validate: { min: 1 },
        allowNull: false,
    })
    age!: PersonalInfo["age"];

    @Column({
        type: DataType.SMALLINT,
        validate: { min: 1 },
        allowNull: false,
    })
    weight!: PersonalInfo["weight"];

    @Column({
        type: DataType.SMALLINT,
        validate: { min: 1 },
        allowNull: false,
    })
    weightGoal!: PersonalInfo["weightGoal"];

    @Column({
        type: DataType.SMALLINT,
        validate: { min: 1 },
        allowNull: false,
    })
    weightGainPerWeek!: PersonalInfo["weightGainPerWeek"];

    @Column({
        type: DataType.SMALLINT,
        validate: { min: 1 },
        allowNull: false,
    })
    height!: PersonalInfo["height"];

    @Column({
        type: DataType.SMALLINT,
        validate: { max: 100 },
        allowNull: false,
    })
    bodyFatPerc!: PersonalInfo["bodyFatPerc"];

    @ForeignKey(() => ActivityLevelTable)
    @Column({ type: DataType.STRING(21), allowNull: false }) // +1 for null terminator in mysql because it fails 20 character limit
    activityLevelName!: PersonalInfo["activityLevelName"];

    @ForeignKey(() => HealthGoalTable)
    @Column({ type: DataType.STRING(21), allowNull: false }) // +1 for null terminator in mysql because it fails 20 character limit
    healthGoalName!: PersonalInfo["healthGoalName"];

    @ForeignKey(() => DietaryPreferenceTable)
    @Column({ type: DataType.STRING(21), allowNull: false }) // +1 for null terminator in mysql because it fails 20 character limit
    dietaryPreferenceName!: PersonalInfo["dietaryPreferenceName"];

    @BelongsTo(() => UserTable, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    user!: UserTable;

    @BelongsTo(() => ActivityLevelTable, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    activityLevel!: ActivityLevelTable;

    @BelongsTo(() => HealthGoalTable, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    healthGoal!: HealthGoalTable;

    @BelongsTo(() => DietaryPreferenceTable, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    dietaryPreference!: DietaryPreferenceTable;
}
