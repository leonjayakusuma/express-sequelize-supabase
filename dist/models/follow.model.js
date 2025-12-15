"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowTable = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("./user.model");
let FollowTable = class FollowTable extends sequelize_typescript_1.Model {
    followerId;
    followingId;
    followingUser;
    followerUser;
};
exports.FollowTable = FollowTable;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.UserTable),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], FollowTable.prototype, "followerId", void 0);
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.UserTable),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], FollowTable.prototype, "followingId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.UserTable, {
        foreignKey: "followingId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
], FollowTable.prototype, "followingUser", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.UserTable, {
        foreignKey: "followerId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
], FollowTable.prototype, "followerUser", void 0);
exports.FollowTable = FollowTable = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: false, tableName: "Follows" })
], FollowTable);
//# sourceMappingURL=follow.model.js.map