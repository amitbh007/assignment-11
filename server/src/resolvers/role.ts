import { Field, InputType, Mutation, Query,Resolver } from "type-graphql";
import { Role } from "../entities/Role";

@InputType()
class RoleInputType{
    @Field()
    name!: string;

    @Field()
    key?: number;
}

@Resolver()
export class RoleResolver{
    @Query(()=>[Role])
    async getRoles():Promise<Role[]>{
        return Role.findAll();
    }

    @Mutation(()=>[Role])
    async addRole(
    ):Promise<Role>{
        const newRole:RoleInputType = {
            key:2,
            name:"SUBSCRIBER",
        }

        const role = Role.build(newRole);
        // console.log(role);
        // await person.save()
        return await role.save()

        // await Role.create(newRole).save();
        
        // return await Role.find()

    } 

    

}