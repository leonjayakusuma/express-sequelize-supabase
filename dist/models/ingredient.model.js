"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientTable = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const recipeIngredient_model_1 = require("./recipeIngredient.model");
const recipe_model_1 = require("./recipe.model");
let IngredientTable = class IngredientTable extends sequelize_typescript_1.Model {
    name;
    recipes;
};
exports.IngredientTable = IngredientTable;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(101), // +1 for null terminator in mysql because it fails 100 character limit
        validate: {
            notEmpty: { msg: "Ingredient name cannot be empty" },
        },
    })
], IngredientTable.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => recipe_model_1.RecipeTable, () => recipeIngredient_model_1.RecipeIngredientTable)
], IngredientTable.prototype, "recipes", void 0);
exports.IngredientTable = IngredientTable = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: false, tableName: "Ingredients" })
], IngredientTable);
//# sourceMappingURL=ingredient.model.js.map