import { Role } from "src/features/common/enum/user.role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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





}