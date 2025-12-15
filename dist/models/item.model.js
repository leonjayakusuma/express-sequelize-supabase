"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemTable = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const cartItem_model_1 = require("./cartItem.model");
const tag_model_1 = require("./tag.model");
const itemTag_model_1 = require("./itemTag.model");
const user_model_1 = require("./user.model");
let ItemTable = class ItemTable extends sequelize_typescript_1.Model {
    title;
    description;
    price;
    discount;
    isSpecial;
    imgUrl;
    users;
    tags;
};
exports.ItemTable = ItemTable;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, autoIncrement: true })
], ItemTable.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT("tiny"),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Email cannot be empty" },
        },
    })
], ItemTable.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(1001), // +1 for null terminator in mysql because it fails 1000 character limit
        allowNull: false,
        validate: {
            notEmpty: { msg: "description cannot be empty" },
        },
    })
], ItemTable.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.FLOAT(10), allowNull: false })
], ItemTable.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.SMALLINT, allowNull: false })
], ItemTable.prototype, "discount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: false })
], ItemTable.prototype, "isSpecial", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(1001) })
], ItemTable.prototype, "imgUrl", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => user_model_1.UserTable, () => cartItem_model_1.CartItemTable)
], ItemTable.prototype, "users", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => tag_model_1.TagTable, () => itemTag_model_1.ItemTagTable)
], ItemTable.prototype, "tags", void 0);
exports.ItemTable = ItemTable = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: false, tableName: "Items" })
], ItemTable);
//# sourceMappingURL=item.model.js.map