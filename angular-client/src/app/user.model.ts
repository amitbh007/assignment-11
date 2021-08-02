export class User{
    firstName:string
    lastName:string
    middleName:string
    roleKey:number
    address:string
    customerName:string
    phone:string
    email:string

    constructor(init:string){
        this.firstName = init
        this.middleName = init
        this.lastName = init
        this.roleKey = 0
        this.address = init
        this.customerName = init
        this.phone = init
        this.email = init
    }
}

export enum Role {
    SUPER_ADMIN,
    ADMIN,
    SUBSCRIBER
}

//user interface