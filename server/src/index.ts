import "reflect-metadata";
import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/user';
import { RoleResolver } from './resolvers/role'
import { sequelize } from "./sequelize";
import { TestResolver } from "./resolvers/test";
import { CustomerResolver } from "./resolvers/customer";


const main = async ()=>{
    //connect to db, add entities
    // const conn = await createConnection({
    //     type:"postgres",
    //     database:"test-sourcefuse",
    //     username:"user_1",
    //     password:"@MITbh123",
    //     logging:true,
    //     synchronize:true,
    //     entities:[User,Role,Customer]
    // })

    await sequelize.sync({alter:true})

    // await sequelize.addModels([__dirname, "/entities/Test.ts"]);

    // const person = Test.build({ name: 'bob'})
    // console.log(person);
    // person.save()

    // await User.delete({});
    const app = express();

    app.use(cors({
        origin:'http://localhost:4200',
    }))

    // await User.delete({});

    const appoloServer = new ApolloServer({
        schema:await buildSchema({
            resolvers:[UserResolver,RoleResolver,CustomerResolver,TestResolver],
            validate:false
        }),
        
    })

    //add the express server as middleware and enable /graphql playground
    appoloServer.applyMiddleware({app,cors:false});

    app.listen(4000,()=>{   
        console.log("server started at localhost 4000")
    })
}

main();