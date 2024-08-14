<script setup lang="ts">
// Types
import type { IBreadcrumb } from '~/components/Breadcrumbs/types/breadcrumb.type'

// Utils
const { currentRoute } = useRouter()

// Breadcrumbs
const breadcrumbs = computed<IBreadcrumb[]>(() => {
  return [
    { label: $t('[FTName | camelCase].self', 2), to: $p('/[FTName | paramcase]s') },
    { label: $t('[FTName | camelCase].new'), to: currentRoute.value },
  ]
})

provide(breadcrumbsKey, breadcrumbs)

useHead({
  title: () => $t('[FTName | camelCase].self', 2),
})
</script>

<template>
  <PageWrapper>
    <Breadcrumbs />

    <[FTName | PascalCase]CreateForm />
  </PageWrapper>
</template>
