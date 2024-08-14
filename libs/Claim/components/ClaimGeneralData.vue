<script setup lang="ts">
import type { ClaimOptionalDefaults, RoleOptionalDefaults } from '~z'

type IProps = {
  editable?: boolean
  claim: Pick<ClaimOptionalDefaults, 'id' | 'description' | 'name'> & {
    roles: Pick<RoleOptionalDefaults, 'id' | 'name'>[]
  }
}

const props = defineProps<IProps>()

// Layout
const claim = toRef(props, 'claim')

// Validation
useZod()
</script>

<template>
  <!-- ID -->
  <InputBlock
    v-if="claim.id"
    :label="$t('claim.id')"
    :value="claim.id"
  />

  <!-- Name -->
  <InputBlock
    :label="$t('claim.name')"
    :value="claim.name"
    :editable="editable"
    col="start-1"
  >
    <TextInput
      v-model="claim.name"
      :label="$t('claim.name')"
      zod="claim.name"
      col="start-1"
      empty-value=""
    />
  </InputBlock>

  <!-- Description -->
  <InputBlock
    :label="$t('claim.description')"
    :value="claim.description"
    :editable="editable"
    col="start-1 md:span-2"
  >
    <TextArea
      v-model="claim.description"
      :label="$t('claim.description')"
      zod="claim.description"
      empty-value=""
      autogrow
      input-class="min-h-20"
    />
  </InputBlock>

  <!-- Roles -->
  <InputBlock
    :label="$t('role.self', 2)"
    :value="claim.roles"
    :format="(_, role) => role.name"
    :editable="editable"
    :to="{
      path: '/roles',
      query: {
        filters: `[id].[in].[(${claim.roles.map(c => c.id)})]`,
      },
    }"
    col="start-1"
  >
    <RoleAutocomplete
      v-model="claim.roles"
      :label="$t('role.self', 2)"
      zod="claim.roles"
      col="start-1"
      multi
    />
  </InputBlock>
</template>
