import type { File, User } from '~z'

export type IUserWithAvatar = Pick<User, 'id' | 'firstName' | 'lastName'>
  & { avatar?: Pick<File, 'id' | 'path'> | null }
