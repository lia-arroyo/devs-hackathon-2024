export interface Group {
    _id: object,
    name: string,
    members: string[],
    groupType: 'water' | 'steps'
    ownerId: string,
    groupCode : string,
    stakes: string | ''

}

export interface User{
   _id: object,
   email: string,
   name:string,
   stepsTaken: number,
   waterIntake: number,
   groups: string[]
}
export type GroupsPatch = Partial<Group>;
export type UserPatch = Partial<User>;
