<script setup lang="ts">
import type { LogOptionalDefaults } from '~/prisma/generated/zod'

// Types
import type { ITableDataFetchFncInput } from '~/components/Table/types/table-query.type'

// Models
import { TableColumn } from '~/components/Table/models/table-column.model'

// Functions
import { useLogApi } from '~/libs/Log/functions/useLogApi'

type IProps = {
  entityId: number
  entityName: string
}

const props = defineProps<IProps>()

// Utils
const { logFindMany } = useLogApi()

// Table
const columns = computed(() => {
  return [
    // Entity
    new TableColumn({
      field: 'entity',
      label: $t('log.entity'),
      alwaysSelected: true,
      nonInteractive: true,
    }),

    // Operation
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
})

// Data fetching
function getData(opts: ITableDataFetchFncInput) {
  opts.prismaQuery.args.where = {
    ...opts.prismaQuery.args.where,

    entityId: props.entityId,
    entity: props.entityName,
  }

  return logFindMany(opts.prismaQuery)
}
</script>

<template>
  <Btn
    :label="$t('general.history')"
    icon="i-solar:history-bold"
  >
    <Dialog
      w="screen-xl"
      min-h="9/10"
    >
      <Table
        :columns="columns"
        :get-data="{ fnc: getData }"
        :use-url="false"
        no-state-save
      >
        <template #diff="{ row }">
          <LogDiff
            p="2"
            :log="row"
          />
        </template>
      </Table>
    </Dialog>
  </Btn>
</template>
