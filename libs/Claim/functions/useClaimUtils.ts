import type { Claim, ClaimOptionalDefaultsWithRelations } from '~z'

// Models
import { TableColumn } from '~/components/Table/models/table-column.model'

export function useClaimUtils() {
  function getClaimColumnDefinitions() {
    return [
      // ID
      new TableColumn({
        field: 'id',
        label: $t('claim.id'),
        dataType: 'number',
        alwaysSelected: true,
      }),

      // Name
      new TableColumn({
        field: 'name',
        label: $t('claim.name'),
      }),

      // Description
      new TableColumn({
        field: 'description',
        label: $t('claim.description'),
      }),

      // Roles - ID
      new TableColumn({
        field: 'roles.id',
        filterField: 'roles.some.id',
        label: $t('role.id2'),
        dataType: 'number',
        valueGetter: row => row.roles,
        format: (_, role) => role?.id,
      }),

      // Roles - Name
      new TableColumn({
        field: 'roles.name',
        filterField: 'roles.some.name',
        label: $t('role.name2'),
        valueGetter: row => row.roles,
        format: (_, role) => role?.name,
      }),
    ] as TableColumn<ClaimOptionalDefaultsWithRelations>[]
  }

  /** Details page link */
  function getClaimLink(claim: Claim) {
    return $p(`/claims/${claim.id}`)
  }

  return {
    getClaimColumnDefinitions,
    getClaimLink,
  }
}
