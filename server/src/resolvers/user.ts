import { Customer } from "../entities/Customer";
import { Arg, Field, FieldResolver, InputType, Int, Mutation, Query,Resolver, Root } from "type-graphql";
import {User} from '../entities/User'

@InputType()
class UserInputType{
    @Field()
    firstName: string;

    @Field({nullable:true})
    middleName?: string;

    @Field()
    lastName: string;

    @Field()
    email: string;

    @Field()
    phone: string;

    @Field(()=>Int)
    roleKey: number;

    @Field({nullable:true})
    customerName?:string;


    @Field()
    address: string;
}

@Resolver(User)
export class UserResolver{

    @FieldResolver(()=>String)
    async customerName(
        @Root() root:User
    ){
        const p = await Customer.findOne({
            where:{
                id:root.customerId
            }
        });
        if(p) return p.name
        else return "none"
    }
    
    @Query(()=>[User])
    async getUsers():Promise<User[]>{
        return User.findAll();
    }

    @Mutation(()=>[User])
    async addUser(
        @Arg('newUser',()=>UserInputType) newUser:UserInputType
    ):Promise<User[]>{
        // example new user
        // const user:User = {
        //     firstName:"abhi",
        //     middleName : "dixit",
        //     lastName : "manyu",
        //     email : "abhi@gmail.com",
        //     phone : "924278354",
        //     roleKey:1,
        //     customerId:1,
        //     address:"malviya nagar"
        // }

        // const userBuild = User.build(user);
        const userBuild = User.build(newUser);

        await userBuild.save()
        
        return await User.findAll()

    } 

    @Mutation(()=>[User])
    async updateUser(
        @Arg('email') email:string,
        @Arg('newUser',()=>UserInputType) newUser:UserInputType
    ):Promise<User[]>{
        // return updateObject(email,newUser);
        if(newUser.customerName) delete newUser.customerName;
        newUser.roleKey = Number(newUser.roleKey);
        await User.update({...newUser},{
            where:{
                email
            }
        });
        return await User.findAll();
    }   

    @Mutation(()=>[User])
    async deleteUser(
        @Arg('email') email:string,
    ):Promise<User[]>{
        // return deleteObject(email);
        await User.destroy({where:{
            email
        }});
        return await User.findAll()
    }   

    @Mutation(()=>[User])
    async deleteAllUsers(
        // @Arg('email') email:string,
    ){
        return await User.destroy({
            where:{},
            truncate:true
        });
    }   




}