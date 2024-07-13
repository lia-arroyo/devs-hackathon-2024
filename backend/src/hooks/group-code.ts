// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext } from '../declarations'

export const groupCode = async (context: HookContext) => {
    context.data.groupCode = Math.floor(Math.random() * 100000000).toString() // Use Math.floor to get integer
    return context
}
