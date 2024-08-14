<script setup lang="ts">
import { ClaimCreateInputSchema, type RoleOptionalDefaults } from '~z'

// Functions
import { useClaimApi } from '~/libs/Claim/functions/useClaimApi'

type CreateInputSchema = $infer<typeof ClaimCreateInputSchema>
type InputSchema = CreateInputSchema & {
  roles: RoleOptionalDefaults[]
}

// Utils
const { isLoading, handleRequest } = useRequest()
const { claimCreateOne } = useClaimApi()

// Layout
const { model: claim } = useRefReset({
  name: '',
  description: '',

  // Relations
  roles: [] as unknown as RoleOptionalDefaults[],
} satisfies InputSchema)

const dto = computed<CreateInputSchema>(() => {
  return {
    ...pick(claim.value, ['name', 'description']),

    // Relations
    roles: {
      connect: claim.value.roles.map(role => ({ id: role.id })),
    },
  }
})

// Methods
async function handleCreate() {
  const { id } = await handleRequest(
    () =>
      claimCreateOne({
        data: dto.value,
      }),
    { $z, notifySuccess: true, logging: { operationName: 'claim.creation' } },
  )

  $nav(`/claims/${id}`)
}

// Validation
const $z = useZod({ claim: ClaimCreateInputSchema }, { claim: dto })
</script>

<template>
  <CreateForm
    :label="$t('general.save')"
    :loading="isLoading"
    :model-value="claim"
    entity-name="claim"
    @submit="handleCreate"
  >
    <!-- General data -->
    <Section2
      :title="$t('general.generalInfo')"
      class="data-section"
    >
      <ClaimGeneralData
        :claim="claim"
        editable
      />
    </Section2>
  </CreateForm>
</template>
