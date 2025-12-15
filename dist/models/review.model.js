"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewTable = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const item_model_1 = require("./item.model");
const user_model_1 = require("./user.model");
let ReviewTable = class ReviewTable extends sequelize_typescript_1.Model {
    userId;
    itemId;
    rating;
    reviewTxt;
    dateCreated;
    isDeleted;
    isFlagged;
    user;
    item;
};
exports.ReviewTable = ReviewTable;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], ReviewTable.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.UserTable),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], ReviewTable.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => item_model_1.ItemTable),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], ReviewTable.prototype, "itemId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.FLOAT(10),
        allowNull: false,
        validate: {
            min: 0,
            max: 5,
        },
    })
], ReviewTable.prototype, "rating", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(1001), // +1 for null terminator in mysql because it fails 1000 character limit
        validate: {
            notEmpty: true,
        },
    })
], ReviewTable.prototype, "reviewTxt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
        allowNull: false,
    })
], ReviewTable.prototype, "dateCreated", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    })
], ReviewTable.prototype, "isDeleted", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    })
], ReviewTable.prototype, "isFlagged", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.UserTable, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
], ReviewTable.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => item_model_1.ItemTable, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
], ReviewTable.prototype, "item", void 0);
exports.ReviewTable = ReviewTable = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: false, tableName: "Reviews" })
], ReviewTable);
//# sourceMappingURL=review.model.js.map