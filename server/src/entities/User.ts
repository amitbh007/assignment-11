import { Column, Table,Model, ForeignKey, BelongsTo, CreatedAt, UpdatedAt } from "sequelize-typescript";
import { Field, ObjectType } from "type-graphql";
// import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Customer } from "./Customer";
import {Role} from './Role'
//entities can also be turned into graphql types
//act as tables in sql
@Table
@ObjectType()
export class User extends Model {
  @Field()
  // @PrimaryGeneratedColumn()
  id:number

  @Field()
  @Column
  firstName!: string;

  @Field({nullable:true})
  @Column
  middleName?: string;

  @Field()
  @Column
  lastName!: string;

  @Field()
  @Column
  email!: string;

  @Field()
  @Column({unique:true})
  phone!: string;

  @Field()
  @ForeignKey(()=>Role)
  roleKey:number

  @Field()
  @BelongsTo(()=>Role)
  role:Role

  @Field()
  @ForeignKey(()=>Customer)
  customerId:number

  @Field(()=>Customer)
  @BelongsTo(()=>Customer,'customerId')
  customer:Customer;

  @Field()
  @Column
  address!: string;
        
  @Field()
  @CreatedAt
  createdAt: Date;

  @Field()
  @UpdatedAt
  updatedAt: Date;
}