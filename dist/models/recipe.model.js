"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeTable = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const recipeIngredient_model_1 = require("./recipeIngredient.model");
const ingredient_model_1 = require("./ingredient.model");
const instruction_model_1 = require("./instruction.model");
let RecipeTable = class RecipeTable extends sequelize_typescript_1.Model {
    name;
    link;
    calories;
    carbs;
    fat;
    protein;
    ingredients;
    instructions;
};
exports.RecipeTable = RecipeTable;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.SMALLINT, autoIncrement: true })
], RecipeTable.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT("tiny"),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Email cannot be empty" },
        },
    })
], RecipeTable.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT("tiny"),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Email cannot be empty" },
        },
    })
], RecipeTable.prototype, "link", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.SMALLINT, allowNull: false })
], RecipeTable.prototype, "calories", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.SMALLINT, allowNull: false })
], RecipeTable.prototype, "carbs", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.SMALLINT, allowNull: false })
], RecipeTable.prototype, "fat", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.SMALLINT, allowNull: false })
], RecipeTable.prototype, "protein", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => ingredient_model_1.IngredientTable, () => recipeIngredient_model_1.RecipeIngredientTable)
], RecipeTable.prototype, "ingredients", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => instruction_model_1.InstructionTable)
], RecipeTable.prototype, "instructions", void 0);
exports.RecipeTable = RecipeTable = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: false, tableName: "Recipes" })
], RecipeTable);
//# sourceMappingURL=recipe.model.js.map