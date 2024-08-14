<script setup lang="ts">
type IProps = {
  fnc: any
}

defineProps<IProps>()
</script>

<template>
  <CrudBtnDelete
    v-if="$isSA()"
    class="delete-entity-btn"
    @delete="fnc"
  />
</template>

<style scoped lang="scss">
.delete-entity-btn {
  @apply fixed z-$zMax bottom-2 left-2 bg-white dark:bg-darker;
}
</style>
