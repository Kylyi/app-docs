<script setup lang="ts">
// Types
import type { ITableDataFetchFncInput } from '~/components/Table/types/table-query.type'

// Functions
import { useRoleApi } from '~/libs/Role/functions/useRoleApi'
import { useRoleUtils } from '~/libs/Role/functions/useRoleUtils'

// Components
import Table from '~/components/Table/Table.vue'

// Utils
const { roleFindMany } = useRoleApi()

// Table
const { getRoleColumnDefinitions, getRoleLink } = useRoleUtils()

const columns = computed(() => getRoleColumnDefinitions())

function getData(opts: ITableDataFetchFncInput) {
  return roleFindMany(opts.prismaQuery)
}
</script>

<template>
  <Table
    :columns="columns"
    :get-data="{ fnc: getData }"
    :to="getRoleLink"
  />
</template>
