import { Table, Model ,Column, CreatedAt, UpdatedAt, HasMany } from "sequelize-typescript";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";

//entities can also be turned into graphql types
//act as tables in sql
@ObjectType()
@Table
export class Role extends Model {
  @Field()
  @Column({primaryKey:true})
  key: number;

  @Field()
  @Column
  name!: string;

  // @ManyToOne(type => User,(user)=>user.role)
  // @JoinColumn()
  // owner: User;

  @Field(()=>[User])
  @HasMany(()=>User)
  owner:User[];

  @Field()
  @CreatedAt
  createdAt: Date;

  @Field()
  @UpdatedAt
  updatedAt: Date;

}