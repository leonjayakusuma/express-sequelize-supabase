"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenTable = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let RefreshTokenTable = class RefreshTokenTable extends sequelize_typescript_1.Model {
    userId;
    refreshToken;
    expiration;
};
exports.RefreshTokenTable = RefreshTokenTable;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER })
], RefreshTokenTable.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(256), // +1 for null terminator in mysql because it fails 255 character limit
        validate: {
            notEmpty: { msg: "Email cannot be empty" },
        },
    })
], RefreshTokenTable.prototype, "refreshToken", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
    })
], RefreshTokenTable.prototype, "expiration", void 0);
exports.RefreshTokenTable = RefreshTokenTable = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: false, tableName: "RefreshTokens" })
], RefreshTokenTable);
//# sourceMappingURL=refreshToken.model.js.map