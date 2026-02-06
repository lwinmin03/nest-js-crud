import { user } from "src/features/user/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {type Url } from "url";

@Entity()
export class Idea {
   
    @PrimaryGeneratedColumn('identity')
    id:number

    @Column()
    img:Url
    
    @Column({nullable:false})
    name:string

    @Column({nullable:false})
    desc:string

    @Column()
    createdBy:number

    @ManyToOne(()=>user,user=>user.id)
    user:user

}