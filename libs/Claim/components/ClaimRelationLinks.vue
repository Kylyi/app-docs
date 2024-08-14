<script setup lang="ts">
type IProps = {
  claimId: number
}

const props = defineProps<IProps>()

// Layout
const query = computed(() => {
  return {
    // qb: `or([extraClaims.some.id].[eq].[${props.claimId}],[roles.some.claims.some.id].[eq].[${props.claimId}])`,
    qb: `or([roles.some.claims.some.id].[eq].[${props.claimId}])`,
  }
})
</script>

<template>
  <!-- Users -->
  <Btn
    class="relation-btn"
    no-uppercase
    :label="$t('user.self', 2)"
    :to="{ path: '/users', query }"
  />
</template>
