import { Role } from "src/common/enum/user.role.enum";
import { Idea } from "src/features/idea/entity/idea.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class user{

@PrimaryGeneratedColumn('identity')
id:number


@Column({unique:true})
email:string


@Column()
pwd:string



@Column({nullable:true})
rtHash:string


@Column({type:'enum',enum:Role,default:Role.User})
role:Role

@Column({default:'local'})
provider:'local' | 'github'



@OneToMany(()=>Idea,idea=>idea.id)
ideas:Idea[]





}