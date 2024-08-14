<script setup lang="ts">
// Types
import type { ITableDataFetchFncInput } from '~/components/Table/types/table-query.type'

// Functions
import { use[FTName | PascalCase]Api } from '~/libs/[FTName | PascalCase]/functions/use[FTName | PascalCase]Api'
import { use[FTName | PascalCase]Utils } from '~/libs/[FTName | PascalCase]/functions/use[FTName | PascalCase]Utils'

// Components
import Table from '~/components/Table/Table.vue'

// Utils
const { [FTName | camelCase]FindMany } = use[FTName | PascalCase]Api()

// Table
const { get[FTName | PascalCase]ColumnDefinitions, get[FTName | PascalCase]Link } = use[FTName | PascalCase]Utils()

const columns = computed(() => get[FTName | PascalCase]ColumnDefinitions())

function getData(opts: ITableDataFetchFncInput) {
  return [FTName | camelCase]FindMany(opts.prismaQuery)
}
</script>

<template>
  <Table
    :columns="columns"
    :get-data="{ fnc: getData}"
    :to="get[FTName | PascalCase]Link"
  />
</template>
