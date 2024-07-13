// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Groups, GroupsData, GroupsPatch, GroupsQuery } from './groups.schema'
import {Group, User} from "../../types";
import {UserPatch, UserService} from "../users/users.class";

export type { Groups, GroupsData, GroupsPatch, GroupsQuery }

export interface GroupsParams extends MongoDBAdapterParams<GroupsQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class GroupsService<ServiceParams extends Params = GroupsParams> extends MongoDBService<
  Groups,
  GroupsData,
  GroupsParams,
  GroupsPatch
> {
  app: Application;

  constructor(options: MongoDBAdapterOptions, app: Application) {
    super(options);
    this.app = app;
  }
  async joinGroup(data: {groupCode: string , userId: string}){
    const groupQuery =  await this.find({query:{groupCode: data.groupCode}})
    const group = groupQuery.data[0] as Group;
    group.members = group.members || []
    group.members.push(data.userId)
    const groupId = typeof group._id === 'object' ? group._id.toString() : group._id

   const result= await this.app.service('users').addGroupToUser({
      groupId: groupId,
     userId: data.userId})
    try{
      return await this.patch(groupId, <GroupsPatch>{
        name: group.name,
        members: group.members,
        groupType: group.groupType,
        ownerId: group.ownerId,
        groupCode: group.groupCode,
        stakes: group.stakes,
      })
    } catch{
      throw new Error('Error joining group')
    }
  }

  async leaveGroup(data: {groupCode: string , userId: string}){
    const groupQuery =  await this.find({query:{groupCode: data.groupCode}})
    const group = groupQuery.data[0] as Group;
    group.members = group.members || []
    const index = group.members.indexOf(data.userId, 0)
    if (index !== -1) {
      group.members.splice(index, 1)
    } else {
      throw new Error('Entered user to remove was not found')
    }
    const groupId = typeof group._id === 'object' ? group._id.toString() : group._id
    const result= await this.app.service('users').removeGroupFromUser({
      groupId: groupId,
      userId: data.userId})
    try{
      return await this.patch(groupId, <GroupsPatch>{
        name: group.name,
        members: group.members,
        groupType: group.groupType,
        ownerId: group.ownerId,
        groupCode: group.groupCode,
        stakes: group.stakes,
      })
    } catch{
      throw new Error('Error leaving group')
    }
  }

  async leaderboard(data:{groupCode:string}){
    const waterIntakes = []
    const groupQuery =  await this.find({query:{groupCode: data.groupCode}})
    const group = groupQuery.data[0] as Group;
    group.members = group.members || []

    for(let member of group.members){
       const { _id, name, waterIntake } = await this.app.service('users').get(member)
waterIntakes.push({userId: _id.toString(), name, waterIntake})

    }
    waterIntakes.sort((a, b) => {
      // Handle cases where waterIntake might be undefined
      const waterIntakeA = a.waterIntake !== undefined ? a.waterIntake : 0;
      const waterIntakeB = b.waterIntake !== undefined ? b.waterIntake : 0;

      return waterIntakeB - waterIntakeA;
    });
return waterIntakes
  }

}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('groups'))
  }
}
