import type { LogOptionalDefaults } from '~z'

// Models
import { TableColumn } from '~/components/Table/models/table-column.model'

export function useLogUtils() {
  function getLogColumnDefinitions() {
    return [
      // ID
      new TableColumn({
        field: 'id',
        label: $t('log.id'),
        nonInteractive: true,
        hidden: true,
        dataType: 'number',
        alwaysSelected: true,
      }),

      // Entity
      new TableColumn({
        field: 'entity',
        label: $t('log.entity'),
        alwaysSelected: true,
      }),

      // Entity ID
      new TableColumn({
        field: 'entityId',
        label: $t('log.entityId'),
        dataType: 'number',
      }),

      // Operator
      new TableColumn({
        field: 'operation',
        label: $t('log.operation'),
      }),

      // Diff
      new TableColumn({
        field: 'diff',
        label: $t('log.diff'),
        sortable: false,
      }),

      // Created at
      new TableColumn({
        field: 'createdAt',
        label: $t('log.createdAt'),
        dataType: 'timestamp',
        sort: 'desc',
        sortOrder: 1,
      }),
    ] as TableColumn<LogOptionalDefaults>[]
  }

  return {
    getLogColumnDefinitions,
  }
}
