<script setup lang="ts">
const currentUser = useCurrentUserState()
</script>

<template>
  <PageWrapper>
    <pre>{{ currentUser }}</pre>
  </PageWrapper>
</template>
