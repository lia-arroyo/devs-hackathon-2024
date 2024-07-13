// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/schema'
import type { FromSchema } from '@feathersjs/schema'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { GroupsService } from './groups.class'
const groupTypes = ['water', 'steps'];
// Main data model schema
export const groupsSchema = {
  $id: 'Groups',
  type: 'object',
  additionalProperties: false,
  required: ['_id', 'name', 'groupType', 'ownerId', 'groupCode'],
  properties: {
    _id: ObjectIdSchema(),
    name: {type: 'string'},
    members: {type: 'array', items: {type: 'string'}},
    groupType: { type: 'string', enum: groupTypes },
    ownerId:{ type: 'string' },
    groupCode: { type: 'string' },
    stakes: { type: 'string' },
  }
} as const
export type Groups = FromSchema<typeof groupsSchema>
export const groupsValidator = getValidator(groupsSchema, dataValidator)
export const groupsResolver = resolve<Groups, HookContext<GroupsService>>({})

export const groupsExternalResolver = resolve<Groups, HookContext<GroupsService>>({})

// Schema for creating new data
export const groupsDataSchema = {
  $id: 'GroupsData',
  type: 'object',
  additionalProperties: false,
  required: ['name', 'groupType', 'ownerId'],
  properties: {
    ...groupsSchema.properties
  }
} as const
export type GroupsData = FromSchema<typeof groupsDataSchema>
export const groupsDataValidator = getValidator(groupsDataSchema, dataValidator)
export const groupsDataResolver = resolve<GroupsData, HookContext<GroupsService>>({})

// Schema for updating existing data
export const groupsPatchSchema = {
  $id: 'GroupsPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...groupsSchema.properties
  }
} as const
export type GroupsPatch = FromSchema<typeof groupsPatchSchema>
export const groupsPatchValidator = getValidator(groupsPatchSchema, dataValidator)
export const groupsPatchResolver = resolve<GroupsPatch, HookContext<GroupsService>>({})

// Schema for allowed query properties
export const groupsQuerySchema = {
  $id: 'GroupsQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(groupsSchema.properties)
  }
} as const
export type GroupsQuery = FromSchema<typeof groupsQuerySchema>
export const groupsQueryValidator = getValidator(groupsQuerySchema, queryValidator)
export const groupsQueryResolver = resolve<GroupsQuery, HookContext<GroupsService>>({})
