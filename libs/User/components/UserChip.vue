<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { UserPartial } from '~z'

type IProps = {
  active?: boolean
  noLabel?: boolean
  user?: UserPartial
  ui?: {
    labelClass?: ClassType
    labelStyle?: CSSProperties
  }
}

const props = defineProps<IProps>()

// Layout
const label = computed(() => getFullName(props.user))
</script>

<template>
  <div class="user-chip">
    <UserAvatar
      v-if="user"
      class="h-6 w-6 rounded-2 shrink-0"
      :class="{ 'm-r-2': !noLabel, 'is-active': active }"
      :user="user"
    />

    <slot
      name="label"
      :label="label"
    >
      <span
        v-if="!noLabel"
        :class="ui?.labelClass"
        :style="ui?.labelStyle"
        whitespace="nowrap"
      >
        {{ label }}
      </span>
    </slot>

    <Tooltip v-if="noLabel">
      {{ label }}
    </Tooltip>

    <slot name="append" />
  </div>
</template>

<style lang="scss" scoped>
.user-chip {
  @apply relative shrink-0 flex items-center rounded-custom min-w-6 min-h-6;
}
</style>
