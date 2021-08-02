"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const type_graphql_1 = require("type-graphql");
const User_1 = require("./User");
let Role = class Role extends sequelize_typescript_1.Model {
};
__decorate([
    type_graphql_1.Field(),
    sequelize_typescript_1.Column({ primaryKey: true }),
    __metadata("design:type", Number)
], Role.prototype, "key", void 0);
__decorate([
    type_graphql_1.Field(),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => [User_1.User]),
    sequelize_typescript_1.HasMany(() => User_1.User),
    __metadata("design:type", Array)
], Role.prototype, "owner", void 0);
__decorate([
    type_graphql_1.Field(),
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Role.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(),
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Role.prototype, "updatedAt", void 0);
Role = __decorate([
    type_graphql_1.ObjectType(),
    sequelize_typescript_1.Table
], Role);
exports.Role = Role;
//# sourceMappingURL=Role.js.map