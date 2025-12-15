"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemTable = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("./user.model");
const item_model_1 = require("./item.model");
let CartItemTable = class CartItemTable extends sequelize_typescript_1.Model {
    userId;
    itemId;
    quantity;
    user;
    item;
};
exports.CartItemTable = CartItemTable;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.UserTable),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], CartItemTable.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => item_model_1.ItemTable),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], CartItemTable.prototype, "itemId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.SMALLINT,
        validate: {
            min: 1,
        },
        defaultValue: 1,
        allowNull: false,
    })
], CartItemTable.prototype, "quantity", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.UserTable, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
], CartItemTable.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => item_model_1.ItemTable, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
], CartItemTable.prototype, "item", void 0);
exports.CartItemTable = CartItemTable = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: false, tableName: "CartItems" })
], CartItemTable);
//# sourceMappingURL=cartItem.model.js.map