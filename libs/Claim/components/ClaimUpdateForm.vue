<script setup lang="ts">
import { type Claim, ClaimUpdateInputSchema, type Role } from '~z'

// Functions
import { useClaimApi } from '~/libs/Claim/functions/useClaimApi'

// Components
import UpdateForm from '~/libs/Shared/components/Form/UpdateForm.vue'

const props = defineProps<{
  claim: Pick<Claim, 'id' | 'name' | 'description'> & {
    roles: Pick<Role, 'id' | 'name'>[]
  }
}>()

// Utils
const instance = getCurrentInstance()
const { isLoading, handleRequest } = useRequest()
const { claimUpdateOne, claimDeleteOne } = useClaimApi()

// Layout
const updateFormEl = ref<ComponentInstance<typeof UpdateForm>>()
const isEditing = ref(false)

const { model: claim, syncToParent, isModified } = useRefReset(props.claim)

const dto = computed<$infer<typeof ClaimUpdateInputSchema>>(() => {
  return {
    ...pick(claim.value, ['name', 'description']),

    // Relations
    roles: {
      set: claim.value.roles.map(role => ({ id: role.id })),
    },
  }
})

// Methods
async function handleUpdate() {
  await handleRequest(
    () =>
      claimUpdateOne({
        where: { id: props.claim.id },
        data: dto.value,
      }),
    {
      $z,
      notifySuccess: true,
      logging: { operationName: 'claim.update' },
      merge: { originalObj: claim },
      onComplete: () => {
        updateFormEl.value?.sync()
        isEditing.value = false
      },
    },
  )

  syncToParent()
  $hide({ instance })
}

async function handleDelete() {
  await handleRequest(
    () =>
      claimDeleteOne({
        where: { id: props.claim.id },
      }),
    {
      notifySuccess: true,
      logging: { operationName: 'claim.delete' },
    },
  )

  $nav('/claims')
}

// Validation
const $z = useZod({ claim: ClaimUpdateInputSchema }, { claim: dto })
</script>

<template>
  <UpdateForm
    ref="updateFormEl"
    v-model:is-editing="isEditing"
    v-model="claim"
    :loading="isLoading"
    :label="$t('general.save')"
    :entity="{ id: claim.id, name: 'claim' }"
    :submit-disabled="!isModified"
    @submit="handleUpdate"
    @delete="handleDelete"
  >
    <!-- Links -->
    <Section2
      :title="$t('general.relation', 2)"
      class="flex gap-2"
    >
      <ClaimRelationLinks :claim-id="claim.id" />
    </Section2>

    <!-- General data -->
    <Section2
      :title="$t('general.generalInfo')"
      class="data-section"
    >
      <ClaimGeneralData
        :claim="claim"
        :editable="isEditing"
      />
    </Section2>
  </UpdateForm>
</template>
