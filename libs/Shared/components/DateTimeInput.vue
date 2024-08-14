<script setup lang="ts">
import type { IDateInputProps } from '~/components/Inputs/DateInput/types/date-input-props.type'

type IProps = {
  editable?: boolean
  modelValue?: Datetime

  inputProps?: {
    date?: IDateInputProps & { class?: ClassType }
    time?: IDateInputProps & { class?: ClassType }
  }
}

defineProps<IProps>()

defineEmits<{
  (e: 'update:modelValue', value: Datetime): void
  (e: 'blur'): void
  (e: 'clear'): void
}>()

// Layout
const model = defineModel<Datetime>()

const datetime = computed({
  get() {
    const isSet = !isNil(model.value)
    const date = $date(model.value)

    return {
      date: isSet ? date.format('YYYY-MM-DD') : undefined,
      time: isSet ? date.format('HH:mm') : undefined,
    }
  },
  // The actual type is: payload: { value: Datetime; valueType: 'date' | 'time' } but
  // if we do that, Vue complains
  set(payload: any) {
    const { value, valueType } = payload
    if (!value) {
      model.value = null

      return
    }

    if (valueType === 'date') {
      model.value = $date(
        `${$date(value).format('YYYY-MM-DD')} ${datetime.value.time ?? '00:00'}`,
      ).toDate()
    } else {
      model.value = $date(
        `${datetime.value.date ?? $date().format('YYYY-MM-DD')} ${value}`,
      ).toDate()
    }
  },
})
</script>

<template>
  <!-- Date -->
  <DateInput
    :model-value="datetime.date"
    :label="$t('general.date')"
    v-bind="inputProps?.date"
    :readonly="!editable"
    @update:model-value="datetime = { value: $event, valueType: 'date' }"
    @blur="$emit('blur')"
    @clear="$emit('clear')"
  />

  <!-- Time -->
  <TimeInput
    :model-value="datetime.time"
    :label="$t('general.time')"
    v-bind="inputProps?.time"
    :readonly="!editable"
    @update:model-value="datetime = { value: $event, valueType: 'time' }"
    @blur="$emit('blur')"
  />
</template>
