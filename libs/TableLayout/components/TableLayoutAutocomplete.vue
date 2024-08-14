<script setup lang="ts">
// Types
import type { ISelectorProps } from '~/components/Selector/types/selector-props.type'

// Functions
import { useTableLayoutApi } from '~/libs/TableLayout/functions/useTableLayoutApi'

type IProps = {
  modelValue?: any
  selectorProps?: ISelectorProps
}

defineProps<IProps>()

// Utils
const { tableLayoutFindMany } = useTableLayoutApi()

// Layout
const model = defineModel()

const loadData: ISelectorProps['loadData'] = {
  fnc: opts =>
    tableLayoutFindMany(
      {
        args: {
          // Fetch more
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
    :label="selectorProps?.label ?? $t('tableLayout.self', 2)"
    :load-data="loadData"
    no-filter
    option-label="name"
  />
</template>
