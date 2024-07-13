// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/schema'
import type { FromSchema } from '@feathersjs/schema'
import { passwordHash } from '@feathersjs/authentication-local'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { UserService } from './users.class'

// Main data model schema
export const userSchema = {
  $id: 'User',
  type: 'object',
  additionalProperties: false,
  required: ['_id', 'email'],
  properties: {
    _id: ObjectIdSchema(),
    email: { type: 'string' },
    password: { type: 'string' },
    name: { type: 'string' },
    stepsTaken: { type: 'number' },
    waterIntake: { type: 'number' },
    groups: { type: 'array', items: { type: 'string' } }
  }
} as const
export type User = FromSchema<typeof userSchema>
export const userValidator = getValidator(userSchema, dataValidator)
export const userResolver = resolve<User, HookContext<UserService>>({})

export const userExternalResolver = resolve<User, HookContext<UserService>>({
  // The password should never be visible externally
  password: async () => undefined
})

// Schema for creating new data
export const userDataSchema = {
  $id: 'UserData',
  type: 'object',
  additionalProperties: false,
  required: ['email', 'name', 'password'],
  properties: {
    ...userSchema.properties
  }
} as const
export type UserData = FromSchema<typeof userDataSchema>
export const userDataValidator = getValidator(userDataSchema, dataValidator)
export const userDataResolver = resolve<UserData, HookContext<UserService>>({
  password: passwordHash({ strategy: 'local' }),
  waterIntake: async () => 0, // Set default value for waterIntake on user creation
  stepsTaken: async () => 0 // Set default value for stepsTaken on user creation
})

// Schema for updating existing data
export const userPatchSchema = {
  $id: 'UserPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...userSchema.properties
  }
} as const
export type UserPatch = FromSchema<typeof userPatchSchema>
export const userPatchValidator = getValidator(userPatchSchema, dataValidator)
export const userPatchResolver = resolve<UserPatch, HookContext<UserService>>({
  password: passwordHash({ strategy: 'local' })
})

// Schema for allowed query properties
export const userQuerySchema = {
  $id: 'UserQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(userSchema.properties)
  }
} as const
export type UserQuery = FromSchema<typeof userQuerySchema>
export const userQueryValidator = getValidator(userQuerySchema, queryValidator)
export const userQueryResolver = resolve<UserQuery, HookContext<UserService>>({
  // If there is a user (e.g. with authentication), they are only allowed to see their own data
  _id: async (value, user, context) => {
    if (context.params.user) {
      return context.params.user._id
    }

    return value
  }
})
