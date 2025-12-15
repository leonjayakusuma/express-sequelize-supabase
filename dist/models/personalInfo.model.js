"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalInfoTable = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("./user.model");
const activityLevel_model_1 = require("./activityLevel.model");
const healthGoal_model_1 = require("./healthGoal.model");
const dietaryPreference_model_1 = require("./dietaryPreference.model");
let PersonalInfoTable = class PersonalInfoTable extends sequelize_typescript_1.Model {
    userId;
    isMale;
    age;
    weight;
    weightGoal;
    weightGainPerWeek;
    height;
    bodyFatPerc;
    activityLevelName;
    healthGoalName;
    dietaryPreferenceName;
    user;
    activityLevel;
    healthGoal;
    dietaryPreference;
};
exports.PersonalInfoTable = PersonalInfoTable;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.UserTable),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], PersonalInfoTable.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false })
], PersonalInfoTable.prototype, "isMale", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.SMALLINT,
        validate: { min: 1 },
        allowNull: false,
    })
], PersonalInfoTable.prototype, "age", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.SMALLINT,
        validate: { min: 1 },
        allowNull: false,
    })
], PersonalInfoTable.prototype, "weight", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.SMALLINT,
        validate: { min: 1 },
        allowNull: false,
    })
], PersonalInfoTable.prototype, "weightGoal", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.SMALLINT,
        validate: { min: 1 },
        allowNull: false,
    })
], PersonalInfoTable.prototype, "weightGainPerWeek", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.SMALLINT,
        validate: { min: 1 },
        allowNull: false,
    })
], PersonalInfoTable.prototype, "height", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.SMALLINT,
        validate: { max: 100 },
        allowNull: false,
    })
], PersonalInfoTable.prototype, "bodyFatPerc", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => activityLevel_model_1.ActivityLevelTable),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(21), allowNull: false }) // +1 for null terminator in mysql because it fails 20 character limit
], PersonalInfoTable.prototype, "activityLevelName", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => healthGoal_model_1.HealthGoalTable),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(21), allowNull: false }) // +1 for null terminator in mysql because it fails 20 character limit
], PersonalInfoTable.prototype, "healthGoalName", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => dietaryPreference_model_1.DietaryPreferenceTable),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(21), allowNull: false }) // +1 for null terminator in mysql because it fails 20 character limit
], PersonalInfoTable.prototype, "dietaryPreferenceName", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.UserTable, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
], PersonalInfoTable.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => activityLevel_model_1.ActivityLevelTable, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
], PersonalInfoTable.prototype, "activityLevel", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => healthGoal_model_1.HealthGoalTable, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
], PersonalInfoTable.prototype, "healthGoal", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => dietaryPreference_model_1.DietaryPreferenceTable, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
], PersonalInfoTable.prototype, "dietaryPreference", void 0);
exports.PersonalInfoTable = PersonalInfoTable = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: false, tableName: "PersonalInfos" })
], PersonalInfoTable);
//# sourceMappingURL=personalInfo.model.js.map