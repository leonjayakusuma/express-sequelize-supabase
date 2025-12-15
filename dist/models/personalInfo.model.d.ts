import { Model } from "sequelize-typescript";
import { UserTable } from "./user.model";
import { ActivityLevelTable, ActivityLevel } from "./activityLevel.model";
import { HealthGoalTable, HealthGoal } from "./healthGoal.model";
import { DietaryPreferenceTable, DietaryPreference } from "./dietaryPreference.model";
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
export declare class PersonalInfoTable extends Model<PersonalInfo> {
    userId: PersonalInfo["userId"];
    isMale: PersonalInfo["isMale"];
    age: PersonalInfo["age"];
    weight: PersonalInfo["weight"];
    weightGoal: PersonalInfo["weightGoal"];
    weightGainPerWeek: PersonalInfo["weightGainPerWeek"];
    height: PersonalInfo["height"];
    bodyFatPerc: PersonalInfo["bodyFatPerc"];
    activityLevelName: PersonalInfo["activityLevelName"];
    healthGoalName: PersonalInfo["healthGoalName"];
    dietaryPreferenceName: PersonalInfo["dietaryPreferenceName"];
    user: UserTable;
    activityLevel: ActivityLevelTable;
    healthGoal: HealthGoalTable;
    dietaryPreference: DietaryPreferenceTable;
}
//# sourceMappingURL=personalInfo.model.d.ts.map