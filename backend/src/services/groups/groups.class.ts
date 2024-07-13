// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Groups, GroupsData, GroupsPatch, GroupsQuery } from './groups.schema'
import {Group} from "../../types";

export type { Groups, GroupsData, GroupsPatch, GroupsQuery }

export interface GroupsParams extends MongoDBAdapterParams<GroupsQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class GroupsService<ServiceParams extends Params = GroupsParams> extends MongoDBService<
  Groups,
  GroupsData,
  GroupsParams,
  GroupsPatch
> {
  async joinGroup(data: {groupCode: string , userId: string}){
    const groupQuery =  await this.find({query:{groupCode: data.groupCode}})
    const group = groupQuery.data[0] as Group;
    group.members = group.members || []
    group.members.push(data.userId)

    const groupId = typeof group._id === 'object' ? group._id.toString() : group._id

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

}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('groups'))
  }
}
