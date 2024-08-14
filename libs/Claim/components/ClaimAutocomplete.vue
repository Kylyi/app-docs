<script setup lang="ts">
// Types
import type { ISelectorProps } from '~/components/Selector/types/selector-props.type'

// Functions
import { useClaimApi } from '~/libs/Claim/functions/useClaimApi'

type IProps = {
  modelValue?: any
  selectorProps?: ISelectorProps
}

defineProps<IProps>()

// Utils
const { claimFindMany } = useClaimApi()

// Layout
const model = defineModel()

const loadData: ISelectorProps['loadData'] = {
  fnc: opts =>
    claimFindMany(
      {
        args: {
          ...(opts.options?.fetchMore && {
            skip: opts.options?.currentRowsCount,
          }),
          take: 50,
        },
        search: opts.search,
        includeCount: !opts.options?.fetchMore,
      },
      { signal: opts.abortController?.signal },
    ),
  onSearch: true,
}
</script>

<template>
  <Selector
    v-bind="selectorProps"
    v-model="model"
    :label="selectorProps?.label ?? $t('claim.self', 2)"
    :load-data="loadData"
    no-filter
    option-label="name"
  />
</template>
