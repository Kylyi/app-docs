import type { Diff } from 'utility-types'

export type IPrismaResult<
  T extends IItem,
  K extends (...args: any) => any,
  U extends IItem,
> = NonNullable<Awaited<ReturnType<K>>> & Diff<T, U>

export type IPrismaResultArray<
  T extends IItem,
  K extends (...args: any) => any,
  U extends IItem,
> = Omit<NonNullable<Awaited<ReturnType<K>>>, 'data'> & {
  data: Array<NonNullable<Awaited<ReturnType<K>>>['data'][number] & Diff<T, U>>
}
