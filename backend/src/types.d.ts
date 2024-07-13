export interface Group {
    _id: object;
    name: string;
    members: string[];
    groupType: 'water' | 'steps';
    ownerId: string;
    groupCode: string;
    stakes: string;
}
export type GroupsPatch = Partial<Group>;
