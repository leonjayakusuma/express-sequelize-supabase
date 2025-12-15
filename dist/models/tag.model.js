"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagTable = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const item_model_1 = require("./item.model");
const itemTag_model_1 = require("./itemTag.model");
let TagTable = class TagTable extends sequelize_typescript_1.Model {
    name;
    items;
};
exports.TagTable = TagTable;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(51) }) // +1 for null terminator in mysql because it fails 50 character limit
], TagTable.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => item_model_1.ItemTable, () => itemTag_model_1.ItemTagTable)
], TagTable.prototype, "items", void 0);
exports.TagTable = TagTable = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: false, tableName: "Tags" })
], TagTable);
//# sourceMappingURL=tag.model.js.map