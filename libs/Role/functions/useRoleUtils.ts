import type { Role, RoleOptionalDefaultsWithRelations } from '~z'

// Models
import { TableColumn } from '~/components/Table/models/table-column.model'

export function useRoleUtils() {
  function getRoleColumnDefinitions() {
    return [
      // ID
      new TableColumn({
        field: 'id',
        label: $t('role.id'),
        dataType: 'number',
        alwaysSelected: true,
      }),

      // Name
      new TableColumn({
        field: 'name',
        label: $t('role.name'),
        searchable: true,
      }),

      // Description
      new TableColumn({
        field: 'description',
        label: $t('role.description'),
        searchable: true,
      }),

      // Claims
      new TableColumn({
        field: 'claims.name',
        filterField: 'claims.some.name',
        label: $t('claim.name2'),
        valueGetter: row => row.claims,
        format: (_, claim) => claim?.name,
      }),
    ] as TableColumn<RoleOptionalDefaultsWithRelations>[]
  }

  /** Details page link */
  function getRoleLink(role: Role) {
    return $p(`/roles/${role.id}`)
  }

  return {
    getRoleColumnDefinitions,
    getRoleLink,
  }
}
