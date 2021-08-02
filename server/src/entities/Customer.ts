import { Model, Table,Column, CreatedAt, UpdatedAt, AllowNull, HasOne } from "sequelize-typescript";
import { Field, Int, ObjectType } from "type-graphql";
// import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

//entities can also be turned into graphql types
//act as tables in sql
@ObjectType()
@Table
export class Customer extends Model {
    
  @Field(()=>Int)
  id:number

  @Field()
  @Column({unique:true})
  name!: string;

  @Field({nullable:true})
  @Column
  website?: string;

  @Field()
  @Column
  address!: string;  

  @Field()
  @AllowNull(true)
  @Column
  ownerId:string;
  
  @Field(()=>User)
  // @AllowNull(true)
  @HasOne(()=>User,'customerId')
  owner:User;

  @Field()
  @CreatedAt
  createdAt: Date;

  @Field()
  @UpdatedAt
  updatedAt: Date;

}