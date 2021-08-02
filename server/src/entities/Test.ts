import { Table, Column, Model, } from 'sequelize-typescript'
import { ObjectType,Field } from 'type-graphql'

@Table
@ObjectType()
export class Test extends Model {

    @Field()
    id:number

    @Field()
    @Column
    name: string

}