"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const user_1 = require("./resolvers/user");
const role_1 = require("./resolvers/role");
const sequelize_1 = require("./sequelize");
const test_1 = require("./resolvers/test");
const customer_1 = require("./resolvers/customer");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelize_1.sequelize.sync({ alter: true });
    const app = express_1.default();
    app.use(cors_1.default({
        origin: 'http://localhost:4200',
    }));
    const appoloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [user_1.UserResolver, role_1.RoleResolver, customer_1.CustomerResolver, test_1.TestResolver],
            validate: false
        }),
    });
    appoloServer.applyMiddleware({ app, cors: false });
    app.listen(4000, () => {
        console.log("server started at localhost 4000");
    });
});
main();
//# sourceMappingURL=index.js.map