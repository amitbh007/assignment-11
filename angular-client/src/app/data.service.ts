import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { User } from "./user.model";

const Get_Users = gql`
    query{
        getUsers{
            firstName
            lastName
            middleName
            roleKey
            address
            customerName
            phone
            email
        }
    }
`

const Update_User = gql`
    mutation updateUser($userInput:UserInputType!,$email:String!){
 	updateUser(newUser:$userInput,email:$email){
        firstName
        lastName
        middleName
        roleKey
        address
        customerName
        phone
        email
  }
}
`

const Delete_User = gql`
mutation deleteUser($email:String!){
  deleteUser(email:$email){
    firstName
    lastName
    middleName
    roleKey
    address
    customerName
    phone
    email
  }
}
`
@Injectable()
export class DataService<T> {
    fetchData = new EventEmitter<T[]>();

    private data:T[]=[]

    constructor(private appolo:Apollo){}

    getData(){
        //make api call
        this.appolo.watchQuery<any>({
            query:Get_Users
        }).valueChanges.subscribe((data)=>{
            this.data = data?.data?.getUsers
            this.fetchData.emit(this.data);
        })
    }

    updateData(inputUser:T,inputEmail:string){
        this.appolo.mutate({
            mutation:Update_User,
            variables:{
                userInput:inputUser,
                email:inputEmail
            }
        }).subscribe((data)=>{
            console.log("comming from graphql",data)
            this.data = (data as any).data.updateUser
            this.fetchData.emit(this.data);
        })
    }

    deleteData(inputEmail:string){
        //make call to delete data
        // this.data.splice(index,1);
        this.appolo.mutate({
            mutation:Delete_User,
            variables:{
                email:inputEmail
            }
        }).subscribe((data)=>{
            console.log("comming from graphql",data)
            this.data = (data as any).data.deleteUser
            this.fetchData.emit(this.data);
        })
        console.log("new data",this.data)
        this.fetchData.emit(this.data);
    }
}