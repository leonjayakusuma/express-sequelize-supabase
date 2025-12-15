"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTable = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const cartItem_model_1 = require("./cartItem.model");
const personalInfo_model_1 = require("./personalInfo.model");
const item_model_1 = require("./item.model");
const follow_model_1 = require("./follow.model");
let UserTable = class UserTable extends sequelize_typescript_1.Model {
    email;
    name;
    pswdHash; // TODO: maybe pswdHash can be smaller
    dateJoined;
    isBlocked;
    cart;
    personalInfo;
    followings;
    followers;
};
exports.UserTable = UserTable;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, autoIncrement: true })
], UserTable.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255), // https://stackoverflow.com/a/574698/23929926 // +1 for null terminator in mysql because it fails 254 character limit
        allowNull: false,
        validate: {
            notEmpty: { msg: "Email cannot be empty" },
            isEmail: { msg: "Must be a valid email address" },
        },
        // unique: true,
    })
], UserTable.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(16),
        allowNull: false,
        validate: { notEmpty: { msg: "Name cannot be empty" } },
        // unique: true,
    })
], UserTable.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT("tiny"),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Password hash cannot be empty" },
        },
    })
], UserTable.prototype, "pswdHash", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
        allowNull: false,
    })
], UserTable.prototype, "dateJoined", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    })
], UserTable.prototype, "isBlocked", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => item_model_1.ItemTable, () => cartItem_model_1.CartItemTable)
], UserTable.prototype, "cart", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => personalInfo_model_1.PersonalInfoTable, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
], UserTable.prototype, "personalInfo", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => UserTable, () => follow_model_1.FollowTable, "followerId", "followingId")
], UserTable.prototype, "followings", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => UserTable, () => follow_model_1.FollowTable, "followingId", "followerId")
], UserTable.prototype, "followers", void 0);
exports.UserTable = UserTable = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        indexes: [
            { unique: true, fields: ["name"] },
            { unique: true, fields: ["email"] },
        ], // https://github.com/sequelize/sequelize/issues/8984 - a 6 year old issue still hasn't been fixed ¯\_(ツ)_/¯
        tableName: "Users",
    })
], UserTable);
//# sourceMappingURL=user.model.js.map