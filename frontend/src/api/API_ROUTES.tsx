export const usersPath = 'users';
export const userMethods = ['find', 'get', 'create', 'patch', 'remove'] as const;

export const groupsPath = 'groups';
export const groupMethods = [
  'find',
  'get',
  'create',
  'patch',
  'remove',
  'joinGroup',
  'leaveGroup',
  'leaderboard',
] as const;
