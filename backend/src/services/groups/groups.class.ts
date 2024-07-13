// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Groups, GroupsData, GroupsPatch, GroupsQuery } from './groups.schema'

export type { Groups, GroupsData, GroupsPatch, GroupsQuery }

export interface GroupsParams extends MongoDBAdapterParams<GroupsQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class GroupsService<ServiceParams extends Params = GroupsParams> extends MongoDBService<
  Groups,
  GroupsData,
  GroupsParams,
  GroupsPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('groups'))
  }
}
