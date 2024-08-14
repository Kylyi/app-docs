import type { [FTName | PascalCase], [FTName | PascalCase]OptionalDefaultsWithRelations } from '~z'

// Models
import { TableColumn } from '~/components/Table/models/table-column.model'

export function use[FTName | PascalCase]Utils() {
  function get[FTName | PascalCase]ColumnDefinitions() {
   return [
    // ID
    new TableColumn({
      field: 'id',
      label: $t('[FTName | camelCase].id'),
      dataType: 'number',
      alwaysSelected: true,
    }),
   ] as TableColumn<[FTName | PascalCase]OptionalDefaultsWithRelations>[]
  }

  /** Details page link */
  function get[FTName | PascalCase]Link([FTName | camelCase]: [FTName | PascalCase]) {
    return $p(`/[FTName | paramcase]s/${[FTName | camelCase].id}`)
  }

  return {
    get[FTName | PascalCase]ColumnDefinitions,
    get[FTName | PascalCase]Link
  }
}