import { user } from "../../entity/user.entity";

export type UserResponse=Omit<user,'pwd'|'rtHash'>