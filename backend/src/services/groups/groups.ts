// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  groupsDataValidator,
  groupsPatchValidator,
  groupsQueryValidator,
  groupsResolver,
  groupsExternalResolver,
  groupsDataResolver,
  groupsPatchResolver,
  groupsQueryResolver
} from './groups.schema'

import type { Application } from '../../declarations'
import { GroupsService, getOptions } from './groups.class'
import {groupCode} from "../../hooks/group-code";

export const groupsPath = 'groups'
export const groupsMethods: Array<keyof GroupsService> = ['find', 'get', 'create', 'patch', 'remove']

export * from './groups.class'
export * from './groups.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const groups = (app: Application) => {
  // Register our service on the Feathers application
  app.use(groupsPath, new GroupsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: groupsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(groupsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(groupsExternalResolver),
        schemaHooks.resolveResult(groupsResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(groupsQueryValidator), schemaHooks.resolveQuery(groupsQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(groupsDataValidator), schemaHooks.resolveData(groupsDataResolver), groupCode],
      patch: [schemaHooks.validateData(groupsPatchValidator), schemaHooks.resolveData(groupsPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [groupsPath]: GroupsService
  }
}
