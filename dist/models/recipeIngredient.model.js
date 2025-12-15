"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeIngredientTable = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const ingredient_model_1 = require("./ingredient.model");
const recipe_model_1 = require("./recipe.model");
let RecipeIngredientTable = class RecipeIngredientTable extends sequelize_typescript_1.Model {
    recipeId;
    ingredientName;
    recipe;
    ingredient;
};
exports.RecipeIngredientTable = RecipeIngredientTable;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => recipe_model_1.RecipeTable),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.SMALLINT, allowNull: false })
], RecipeIngredientTable.prototype, "recipeId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => ingredient_model_1.IngredientTable),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(101), // +1 for null terminator in mysql because it fails 100 character limit
        allowNull: false,
        validate: {
            notEmpty: { msg: "Ingredient name cannot be empty" },
        },
    })
], RecipeIngredientTable.prototype, "ingredientName", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => recipe_model_1.RecipeTable, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
], RecipeIngredientTable.prototype, "recipe", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => ingredient_model_1.IngredientTable, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
], RecipeIngredientTable.prototype, "ingredient", void 0);
exports.RecipeIngredientTable = RecipeIngredientTable = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: false, tableName: "RecipeIngredients" })
], RecipeIngredientTable);
//# sourceMappingURL=recipeIngredient.model.js.map