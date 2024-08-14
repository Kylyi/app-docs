<script setup lang="ts">
import type { [FTName | PascalCase]OptionalDefaults } from '~z'

type IProps = {
  editable?: boolean
  [FTName | camelCase]: Pick<
    [FTName | PascalCase]OptionalDefaults,
    ''
  >
}

const props = defineProps<IProps>()

// Layout
const [FTName | camelCase] = toRef(props, '[FTName | camelCase]')

// Validation
useZod()
</script>

<template>
  <pre>{{ [FTName | camelCase] }}</pre>
</template>
