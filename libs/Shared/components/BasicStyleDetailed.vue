<script setup lang="ts">
type IProps = {
  editable?: boolean
  modelValue?: any
  noColor?: boolean
  noBackground?: boolean
}

defineProps<IProps>()

// Layout
const model = defineModel<any>({
  default: () => ({}),
  get(value) {
    return (value ?? {}) as IItem
  },
  set(jsonValue: IItem) {
    return jsonValue as IItem
  },
})

function getStyle(color: string) {
  color = (color ?? '').toLowerCase()

  const isWhite
    = color === 'white'
    || color === '#ffffff'
    || color === '#fff'
    || color === 'rgb(255, 255, 255)'
    || color === 'rgba(255, 255, 255, 1)'
    || color === 'hsl(0, 0%, 100%)'

  const isBlack
    = color === 'black'
    || color === '#000000'
    || color === '#000'
    || color === 'rgb(0, 0, 0)'
    || color === 'rgba(0, 0, 0, 1)'
    || color === 'hsl(0, 0%, 0%)'

  if (isWhite) {
    return { color: 'white', backgroundColor: 'black' }
  } else if (isBlack) {
    return { color: 'black', backgroundColor: 'white' }
  }

  return { color }
}

function getTranslation(color: string) {
  const value = $t(`color.${color}`)

  return value === `color.${color}` ? color : value
}
</script>

<template>
  <Collapse :title="$t('general.color')">
    <!-- Color -->
    <InputBlock
      v-if="!noColor"
      :label="$t('general.color')"
      :value="getTranslation(model.color)"
      :editable="editable"
      :value-style="getStyle(model.color)"
      p="1"
    >
      <div flex="~">
        <ColorBrandingPicker
          :model-value="model.color"
          @update:model-value="model = { ...model, color: $event }"
        />
      </div>
    </InputBlock>
  </Collapse>

  <!-- Background color -->
  <Collapse :title="$t('general.backgroundColor')">
    <InputBlock
      v-if="!noBackground"
      :label="$t('general.backgroundColor')"
      :value="getTranslation(model.backgroundColor)"
      :editable="editable"
      :value-style="getStyle(model.backgroundColor)"
      rounded="custom"
      p="1"
    >
      <div flex="~">
        <ColorBrandingPicker
          :model-value="model.backgroundColor"
          @update:model-value="model = { ...model, backgroundColor: $event }"
        />
      </div>
    </InputBlock>
  </Collapse>

  <!-- Border color -->
  <Collapse :title="$t('general.borderColor')">
    <InputBlock
      v-if="!noColor"
      :label="$t('general.borderColor')"
      :value="getTranslation(model.borderColor)"
      :editable="editable"
      :value-style="getStyle(model.borderColor)"
      rounded="custom"
      p="y-2 x-4"
    >
      <div flex="~">
        <ColorBrandingPicker
          :model-value="model.borderColor"
          @update:model-value="model = { ...model, borderColor: $event }"
        />
      </div>
    </InputBlock>
  </Collapse>
</template>
