import {Sequelize} from 'sequelize-typescript';
import { Customer } from './entities/Customer';
import { Role } from './entities/Role';
import { User } from './entities/User';

export const sequelize = new Sequelize({
    // host:"127.0.0.1:5432",
    database: 'sequelize-test',
    sync:{
        alter:true
        // force:true
    },
    dialect: 'postgres',
    username: 'user_1',
    password: '@MITbh123',
    storage: ':memory:',
    models: [User,Role,Customer] // or [Player, Team],
    
})