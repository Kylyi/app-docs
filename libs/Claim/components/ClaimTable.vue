<script setup lang="ts">
// Types
import type { ITableDataFetchFncInput } from '~/components/Table/types/table-query.type'

// Functions
import { useClaimApi } from '~/libs/Claim/functions/useClaimApi'
import { useClaimUtils } from '~/libs/Claim/functions/useClaimUtils'

// Components
import Table from '~/components/Table/Table.vue'

// Utils
const { claimFindMany } = useClaimApi()

// Table
const { getClaimColumnDefinitions, getClaimLink } = useClaimUtils()

const columns = computed(() => getClaimColumnDefinitions())

function getData(opts: ITableDataFetchFncInput) {
  return claimFindMany(opts.prismaQuery)
}
</script>

<template>
  <Table
    :columns="columns"
    :get-data="{ fnc: getData }"
    :to="getClaimLink"
  />
</template>
