// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'
import {User as userType} from "../../types";
import type { Application } from '../../declarations'
import type { User, UserData, UserPatch, UserQuery } from './users.schema'

export type { User, UserData, UserPatch, UserQuery }

export interface UserParams extends MongoDBAdapterParams<UserQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class UserService<ServiceParams extends Params = UserParams> extends MongoDBService<
  User,
  UserData,
  UserParams,
  UserPatch
> {
  async addGroupToUser(data:{groupId: string, userId: string}){
    const user = await this.get(data.userId) as userType;
    user.groups = user.groups || []
    user.groups.push(data.groupId)
    const userId = typeof user._id === 'object' ? user._id.toString() : user._id
    try {
     return await this.patch(userId,<UserPatch>{
        email: user.email,
        name: user.name,
        stepsTaken: user.stepsTaken,
        waterIntake: user.waterIntake,
        groups: user.groups
      })
    } catch (error) {
      throw new Error('Error adding group to user profile')
    }
  }
    async removeGroupFromUser(data:{groupId: string, userId: string}){
        const user = await this.get(data.userId) as userType;
        user.groups = user.groups || []
        const index = user.groups.indexOf(data.groupId, 0)
        if (index !== -1) {
            user.groups.splice(index, 1)
        } else {
            throw new Error('Entered group to remove was not found')
        }

        const userId = typeof user._id === 'object' ? user._id.toString() : user._id
        try {
            return await this.patch(userId,<UserPatch>{
                email: user.email,
                name: user.name,
                stepsTaken: user.stepsTaken,
                waterIntake: user.waterIntake,
                groups: user.groups
            })
        } catch (error) {
            throw new Error('Error adding group to user profile')
        }
    }
}



export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('users'))
  }
}
