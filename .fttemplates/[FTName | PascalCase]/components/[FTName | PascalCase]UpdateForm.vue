<script setup lang="ts">
import { type [FTName | PascalCase], [FTName | PascalCase]UpdateInputSchema } from '~z'

// Functions
import { use[FTName | PascalCase]Api } from '~/libs/[FTName | PascalCase]/functions/use[FTName | PascalCase]Api'

// Components
import UpdateForm from '~/libs/Shared/components/Form/UpdateForm.vue'

const props = defineProps<{
  [FTName | camelCase]: Pick<[FTName | PascalCase], 'id'>
}>()

// Utils
const instance = getCurrentInstance()
const { isLoading, handleRequest } = useRequest()
const { [FTName | camelCase]UpdateOne, [FTName | camelCase]DeleteOne } = use[FTName | PascalCase]Api()

// Layout
const updateFormEl = ref<ComponentInstance<typeof UpdateForm>>()
  const isEditing = ref(false)
const { model: [FTName | camelCase], syncToParent, isModified } = useRefReset(props.[FTName | camelCase])

const dto = computed<$infer<typeof [FTName | PascalCase]UpdateInputSchema>>(
  () => {
    return {
      ...pick([FTName | camelCase].value, [
        
      ]),
    }
  }
)

// Methods
async function handleUpdate() {
  await handleRequest(
    () =>
      [FTName | camelCase]UpdateOne({
        where: { id: props.[FTName | camelCase].id },
        data: dto.value,
      }),
    {
      $z,
      notifySuccess: true,
      logging: { operationName: '[FTName | camelCase].update' },
      merge: { originalObj: [FTName | camelCase] },
      onComplete: () => {
        updateFormEl.value?.sync()
        isEditing.value = false
      },
    }
  )

  syncToParent()
  $hide({ instance })
}

async function handleDelete() {
  await handleRequest(
    () =>
      [FTName | camelCase]DeleteOne({
        where: { id: props.[FTName | camelCase].id },
      }),
    {
      notifySuccess: true,
      logging: { operationName: '[FTName | camelCase].delete' },
    }
  )

  $hide({ instance })
}

// Validation
const $z = useZod(
  { [FTName | camelCase]: [FTName | PascalCase]UpdateInputSchema },
  { [FTName | camelCase]: dto }
)
</script>

<template>
  <UpdateForm
    ref="updateFormEl"
    v-model:is-editing="isEditing"
    v-model="[FTName | camelCase]"
    :loading="isLoading"
    :label="$t('general.save')"
    :entity="{ id: [FTName | camelCase].id, name: '[FTName | camelCase]' }"
    :submit-disabled="!isModified"
    @submit="handleUpdate"
  >
    <!-- General data -->
    <Section2
      :title="$t('general.generalInfo')"
      class="data-section"
    >
      <[FTName | PascalCase]GeneralData
        :[FTName | paramcase]="[FTName | camelCase]"
        :editable="isEditing"
      />
    </Section2>
  </UpdateForm>
</template>
