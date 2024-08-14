<script setup lang="ts">
// Types
import type { ITableDataFetchFncInput } from '~/components/Table/types/table-query.type'
import type { IQueryBuilderItem } from '~/components/QueryBuilder/types/query-builder-item-props.type'

// Functions
import { useUserApi } from '~/libs/User/functions/useUserApi'
import { useUserUtils } from '~/libs/User/functions/useUserUtils'

// Components
import Table from '~/components/Table/Table.vue'

// Utils
const { userFindMany } = useUserApi()

// Table
const queryBuilder = ref<IQueryBuilderItem[]>([])
const { getUserColumnDefinitions, getUserLink } = useUserUtils()

const columns = computed(() => getUserColumnDefinitions())

function getData(opts: ITableDataFetchFncInput) {
  return userFindMany(opts.prismaQuery)
}
</script>

<template>
  <Table
    v-model:query-builder="queryBuilder"
    :columns="columns"
    :get-data="{ fnc: getData }"
    :to="getUserLink"
  />
</template>
