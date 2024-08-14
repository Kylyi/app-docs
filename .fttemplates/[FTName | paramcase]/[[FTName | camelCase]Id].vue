<script setup lang="ts">
// Types
import type { IBreadcrumb } from '~/components/Breadcrumbs/types/breadcrumb.type'

// Functions
import { use[FTName | PascalCase]Api } from '~/libs/[FTName | PascalCase]/functions/use[FTName | PascalCase]Api'

// Utils
const route = useRoute()
const { currentRoute } = useRouter()
const { handleRequest } = useRequest()
const { [FTName | camelCase]FindOne, [FTName | camelCase]DeleteOne } = use[FTName | PascalCase]Api()

const [FTName | camelCase]Id = computed(() => {
  const { [FTName | camelCase]Id } = route.params as IItem

  return Number([FTName | camelCase]Id)
})

// Layout
const [FTName | camelCase] = ref(await getData())

// Data fetching
async function getData() {
  return handleRequest(() =>
    [FTName | camelCase]FindOne({
      args: {
        where: { id: [FTName | camelCase]Id.value },
      },
    })
  )
}

function handleDelete() {
  [FTName | camelCase]DeleteOne({
    where: { id: [FTName | camelCase]Id.value },
  })
}

// Breadcrumbs
const breadcrumbs = computed<IBreadcrumb[]>(() => {
  return [
    { label: $t('[FTName | camelCase].self', 2), to: $p(`/[FTName | paramcase]s`) },
    {
      label: getLocalizedTitle([FTName | camelCase].value),
      to: currentRoute.value,
    },
  ]
})

provide(breadcrumbsKey, breadcrumbs)

useHead({
  title: () => getLocalizedTitle([FTName | camelCase].value),
})
</script>

<template>
  <PageWrapper>
    <Breadcrumbs />

    <[FTName | PascalCase]UpdateForm
      v-if="[FTName | camelCase]"
      :[FTName | paramcase]="[FTName | camelCase]"
    />
  </PageWrapper>
</template>
