"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Customer_1 = require("./entities/Customer");
const Role_1 = require("./entities/Role");
const User_1 = require("./entities/User");
exports.sequelize = new sequelize_typescript_1.Sequelize({
    database: 'sequelize-test',
    sync: {
        alter: true
    },
    dialect: 'postgres',
    username: 'user_1',
    password: '@MITbh123',
    storage: ':memory:',
    models: [User_1.User, Role_1.Role, Customer_1.Customer]
});
//# sourceMappingURL=sequelize.js.map