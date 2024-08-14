<script setup lang="ts">
import type { Log } from '~z'

type IValueHandlerPayload = Partial<{ field: string, oldValue: string, newValue: string }>

type IProps = {
  log: Log
  valueResolver?: (field: string, diff: string, isCreate: boolean) => void | IValueHandlerPayload
}

const props = defineProps<IProps>()

const diff = computed(() => {
  const diff = (props.log.diff ?? '').split(';')
  const isCreate = diff[0] === '<Created>'
  const field = diff[0]
    ? `[${translateNestedKey(`${props.log.entity}.${diff[0]}`)}]`
    : ''

  const valueResolved = props.valueResolver?.(diff[0], props.log.diff, isCreate)

  if (isCreate) {
    return {
      field: $t('general.created'),
      oldValue: valueResolved?.oldValue ?? '',
      newValue: valueResolved?.newValue ?? '',
      isCreated: true,
    }
  }

  return {
    field: valueResolved?.field ?? field,
    oldValue: valueResolved?.oldValue ?? diff[1],
    newValue: valueResolved?.newValue ?? diff[2],
    isCreated: false,
  }
})
</script>

<template>
  <div
    flex="~ col gap-1"
    max-w="full"
    overflow="auto"
  >
    <!-- Field -->
    <span
      v-if="diff.field"
      class="log-text"
      font="semibold"
    >
      {{ diff.field }}
    </span>

    <div
      v-if="!diff.isCreated"
      flex="~ gap-1"
    >
      <!-- Old value | Message -->
      <span
        class="log-text"
        color="gray-500"
      >
        {{ diff.oldValue || `<${$t('general.isEmpty')}>` }}
      </span>

      <template v-if="diff.newValue">
        <!-- Arrow -->
        <span
          text="caption"
          color="gray-500"
        >
          →
        </span>

        <!-- New value -->
        <span class="log-text">
          {{ diff.newValue }}
        </span>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.log-text {
  @apply text-caption break-words max-w-full;
}
</style>
