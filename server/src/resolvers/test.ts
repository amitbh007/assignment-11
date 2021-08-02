import { Mutation, Query,Resolver } from "type-graphql";
import {Test} from '../entities/Test'



@Resolver(Test)
export class TestResolver{
    
    @Query(()=>[Test])
    async getTests():Promise<Test[]>{

        // return Test.find({relations:["customer"]});
        return Test.findAll()
    }

    @Mutation(()=>Test)
    async createTest(
    ){
        const person = Test.build({ name: 'brian'})
        console.log(person);
        // await person.save()
        return person.save()
    }   




}