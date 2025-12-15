"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructionTable = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const recipe_model_1 = require("./recipe.model");
let InstructionTable = class InstructionTable extends sequelize_typescript_1.Model {
    recipeId;
    stepNo;
    instruction;
    recipe;
};
exports.InstructionTable = InstructionTable;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => recipe_model_1.RecipeTable),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.SMALLINT, primaryKey: true })
], InstructionTable.prototype, "recipeId", void 0);
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.SMALLINT, validate: { min: 1 } })
], InstructionTable.prototype, "stepNo", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(1001), // +1 for null terminator in mysql because it fails 1000 character limit
        allowNull: false,
        validate: {
            notEmpty: { msg: "Instruction cannot be empty" },
        },
    })
], InstructionTable.prototype, "instruction", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => recipe_model_1.RecipeTable, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
], InstructionTable.prototype, "recipe", void 0);
exports.InstructionTable = InstructionTable = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: false, tableName: "Instructions" })
], InstructionTable);
//# sourceMappingURL=instruction.model.js.map