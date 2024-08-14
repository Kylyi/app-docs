<script setup lang="ts">
import { [FTName | PascalCase]CreateInputSchema } from '~z'

// Injections
import { tableRefreshKey } from '~/components/Table/provide/table.provide'

// Functions
import { use[FTName | PascalCase]Api } from '~/libs/[FTName | PascalCase]/functions/use[FTName | PascalCase]Api';

type CreateInputSchema = $infer<typeof [FTName | PascalCase]CreateInputSchema>
type InputSchema = CreateInputSchema & {

}

// Injections
const refreshData = inject(tableRefreshKey)

// Utils
const { isLoading, handleRequest } = useRequest()
const { [FTName | camelCase]CreateOne, [FTName | camelCase]FindOne } = use[FTName | PascalCase]Api()

// Layout
const { model: [FTName | camelCase] } = useRefReset({

} satisfies InputSchema)

const dto = computed<CreateInputSchema>(
  () => {
    return {
      ...pick([FTName | camelCase].value, [
        
      ]),
    }
  }
)

// Methods
async function handleCreate() {
  const { id } = await handleRequest(() => [FTName | camelCase]CreateOne({
    data: dto.value
  }),
    { $z, notifySuccess: true, logging: { operationName: '[FTName | camelCase].creation' } })

  refreshData?.(true)
  $hide()

  $nav(`/${FTName | paramcase}/${id}`)
}

// Validation
const $z = useZod(
  { [FTName | camelCase]: [FTName | PascalCase]CreateInputSchema },
  { [FTName | camelCase]: dto }
)
</script>

<template>
  <CreateForm
    :label="$t('general.save')"
    :loading="isLoading"
    :model-value="[FTName | camelCase]"
    entity-name="[FTName | camelCase]"
    @submit="handleCreate"
  >
    <!-- General data -->
    <Section2
      :title="$t('general.generalInfo')"
      class="data-section"
    >
      <[FTName | PascalCase]GeneralData
        :[FTName | paramcase]="[FTName | camelCase]"
        editable
      />
    </Section2>
  </CreateForm>
</template>
