"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemTagTable = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const item_model_1 = require("./item.model");
const tag_model_1 = require("./tag.model");
let ItemTagTable = class ItemTagTable extends sequelize_typescript_1.Model {
    itemId;
    tagName;
    item;
    tag;
};
exports.ItemTagTable = ItemTagTable;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => item_model_1.ItemTable),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER })
], ItemTagTable.prototype, "itemId", void 0);
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => tag_model_1.TagTable),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(51)) // +1 for null terminator in mysql because it fails 50 character limit
], ItemTagTable.prototype, "tagName", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => item_model_1.ItemTable, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
], ItemTagTable.prototype, "item", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => tag_model_1.TagTable, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
], ItemTagTable.prototype, "tag", void 0);
exports.ItemTagTable = ItemTagTable = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: false, tableName: "ItemTags" })
], ItemTagTable);
//# sourceMappingURL=itemTag.model.js.map