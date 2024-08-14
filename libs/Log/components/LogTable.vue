<script setup lang="ts">
// Types
import type { ITableDataFetchFncInput } from '~/components/Table/types/table-query.type'

// Functions
import { useLogApi } from '~/libs/Log/functions/useLogApi'
import { useLogUtils } from '~/libs/Log/functions/useLogUtils'

// Utils
const { logFindMany } = useLogApi()

// Table
const { getLogColumnDefinitions } = useLogUtils()

const columns = computed(() => getLogColumnDefinitions())
function getData(opts: ITableDataFetchFncInput) {
  return logFindMany(opts.prismaQuery)
}
</script>

<template>
  <Table
    :columns="columns"
    :get-data="{ fnc: getData }"
  >
    <template #diff="{ row }">
      <LogDiff
        p="2"
        :log="row"
      />
    </template>
  </Table>
</template>
