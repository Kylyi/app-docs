import type { User, UserOptionalDefaultsWithRelations } from '~z'

// Models
import { TableColumn } from '~/components/Table/models/table-column.model'

export function useUserUtils() {
  function getUserColumnDefinitions() {
    return [
      // ID
      new TableColumn({
        field: 'id',
        label: $t('user.id'),
        dataType: 'number',
        alwaysSelected: true,
      }),

      // First name
      new TableColumn({
        field: 'firstName',
        label: $t('user.firstName'),
        searchable: true,
      }),

      // Last name
      new TableColumn({
        field: 'lastName',
        label: $t('user.lastName'),
        searchable: true,
      }),

      // Roles - name
      new TableColumn({
        field: 'roles.name',
        filterField: 'roles.some.name',
        label: $t('role.name2'),
        valueGetter: row => row.roles,
        format: (_, role) => role?.name,
      }),

      // Roles - claims - ID
      new TableColumn({
        // @ts-expect-error Nested field
        field: 'roles.claims.id',
        filterField: 'roles.some.claims.some.id',
        label: $t('claim.id2'),
        dataType: 'number',
        valueGetter: row => row.roles.flatMap(r => r.claims),
        format: (_, claim) => claim?.id,
      }),

      // Roles - claims - name
      new TableColumn({
        // @ts-expect-error Nested field
        field: 'roles.claims.name',
        filterField: 'roles.some.claims.some.name',
        label: $t('claim.name2'),
        valueGetter: row => row.roles.flatMap(r => r.claims),
        format: (_, claim) => claim?.name,
      }),
    ] as TableColumn<UserOptionalDefaultsWithRelations>[]
  }

  /** Details page link */
  function getUserLink(user: User) {
    return $p(`/users/${user.id}`)
  }

  return {
    getUserColumnDefinitions,
    getUserLink,
  }
}
