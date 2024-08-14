<script setup lang="ts">
import type { UserPartialWithRelations } from '~z'

// Functions
import { useUserApi } from '~/libs/User/functions/useUserApi'

// Constants
import { COLORS_EXTENDED } from '~/libs/App/constants/colors.constant'

type IProps = {
  clickToRegenerate?: boolean
  user: UserPartialWithRelations
}

const props = defineProps<IProps>()
const emits = defineEmits<{
  (e: 'update:user', user: UserPartialWithRelations): void
}>()

// Utils
const { handleRequest } = useRequest()
const { userRegenerateAvatar } = useUserApi()
const { createShortcut } = useText()
const { getLocalImageUrl } = useImages()
const { semiRandomPick } = useSemiRandom()
const { getColor } = useColors()

// Layout
const user = defineModel<IProps['user']>('user', { required: true })

const avatarInitials = computed(() => {
  return {
    initials: createShortcut(getFullName(props.user), 2),
    color: getColor(semiRandomPick(COLORS_EXTENDED, getFullName(props.user))),
  }
})

async function handleClick() {
  if (!props.clickToRegenerate) {
    return
  }

  const avatar = await handleRequest(
    () => userRegenerateAvatar({ userId: props.user.id!, seed: generateUUID() }),
  )

  user.value.avatar = avatar
  emits('update:user', user.value)
}
</script>

<template>
  <!-- Actual avatar -->
  <img
    v-if="user.avatar?.path"
    class="user-avatar"
    :src="getLocalImageUrl(user.avatar.path)"
    @click="handleClick"
  >

  <!-- Initials -->
  <div
    v-else
    class="user-avatar user-avatar__initials"
    :style="{ backgroundColor: avatarInitials.color }"
    @click="handleClick"
  >
    {{ avatarInitials.initials }}
  </div>
</template>

<style lang="scss" scoped>
.user-avatar {
  &__initials {
    @apply flex flex-center color-white font-rem-11;
  }
}
</style>
