<script setup lang="ts">
// Types
import type { ISelectorProps } from '~/components/Selector/types/selector-props.type'

// Functions
import { useUserApi } from '~/libs/User/functions/useUserApi'

type IProps = {
  modelValue?: any
  selectorProps?: ISelectorProps
}

defineProps<IProps>()

// Utils
const { userFindMany } = useUserApi()

// Layout
const model = defineModel()

const loadData: ISelectorProps['loadData'] = {
  fnc: opts =>
    userFindMany(
      {
        args: {
          // Fetch more
          ...(opts.options?.fetchMore && {
            skip: opts.options?.currentRowsCount,
          }),
          take: 50,
          include: {
            avatar: { select: { id: true, path: true } },
          },
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
    :label="selectorProps?.label ?? $t('user.self', 2)"
    :load-data="loadData"
    no-filter
    :option-label="getFullName"
  >
    <template #item="{ item }">
      <UserChip
        :user="item"
      />
    </template>
  </Selector>
</template>
