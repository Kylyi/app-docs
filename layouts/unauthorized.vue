<script setup lang="ts">
// Functions
import { useLayout } from '~/layouts/functions/useLayout'

// Utils
const { layoutEl, styleVars } = useLayout()
</script>

<template>
  <div
    ref="layoutEl"
    class="layout layout--default"
    :style="styleVars"
  >
    <Navigation no-account-btn>
      <template #left>
        <Btn
          label-class="label-color"
          icon="custom:logo !h-9 !w-9"
          no-uppercase
          size="auto"
          p="1"
          m="l-2"
          no-dim
          no-bold
          self-center
          no-underline
          :label="$t('app.name')"
          :to="$p('/')"
        />
      </template>
    </Navigation>

    <slot />
  </div>
</template>

<style lang="scss" scoped>
.layout--default {
  @apply w-full mx-auto relative flex flex-col min-h-full h-full;

  .environment {
    @apply flex flex-center p-1 rounded-custom color-white;

    span {
      @apply backdrop-brightness-80 w-full h-full text-center p-inherit
        rounded-inherit;
    }
  }

  // &::before,
  // &::after {
  //   @apply fixed h-100vh bg-light-50 dark:bg-dark top-0
  //     z-$zBoundaries;

  //   @screen page {
  //     content: '';
  //     width: calc(calc(100% - var(--pageWidth)) / 2);
  //   }
  // }

  &::before {
    @apply left-0 border-r-1;
  }

  &::after {
    @apply right-0 border-l-1;
  }
}

:deep(.label-color) {
  @apply color-transparent bg-clip-text bg-gradient-to-r from-primary
    via-black to-primary;

  @apply dark:(from-primary via-white to-primary);
}

:deep(.ps__rail-y) {
  right: unset !important;
  left: 0 !important;
}
</style>
