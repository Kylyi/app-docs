<script setup lang="ts">
type IProps = {
  editable?: boolean
  modelValue?: any
  noColor?: boolean
  noBackground?: boolean
  noBorder?: boolean
  noComplex?: boolean
  noIcon?: boolean
  noPreview?: boolean

  /**
   * For preview
   */
  name?: string
}

defineProps<IProps>()

// Utils
const { hexToRgb, rgbaToHex } = useColors()

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

function setComplex(val?: boolean | null) {
  model.value = {
    ...model.value,
    isComplex: !!val,
    backgroundColor: undefined,
    borderColor: undefined,
    ...(model.value.color && {
      color: val ? hexToRgb(model.value.color) : rgbaToHex(model.value.color),
    }),
  }
}
</script>

<template>
  <div class="visuals">
    <!-- Left - settings -->
    <div
      flex="~ col gap-1"
      col="span-2"
    >
      <!-- Simple vs complex style -->
      <InputBlock
        v-if="!noComplex"
        :label="$t('app.complexStyle')"
        :value="model.isComplex"
        :editable="editable"
        data-type="boolean"
      >
        <Toggle
          :label="$t('app.complexStyle')"
          :model-value="model.isComplex ?? false"
          container-class="p-b-2"
          @update:model-value="setComplex"
        />
      </InputBlock>

      <!-- Color - simple -->
      <InputBlock
        v-if="!noColor && !model.isComplex"
        :label="$t('general.color')"
        :value="getTranslation(model.color)"
        :editable="editable"
        :value-style="getStyle(model.color)"
      >
        <ColorInput
          :model-value="model.color"
          :label="$t('general.color')"
          :ui="{ inputContainerStyle: getStyle(model.color) }"
          @update:model-value="model = { ...model, color: $event }"
        />
      </InputBlock>

      <!-- Color - complex -->
      <InputBlock
        v-if="!noColor && model.isComplex"
        :label="$t('general.textColor')"
        :value="getTranslation(model.color)"
        :editable="editable"
        :value-style="getStyle(model.color)"
      >
        <ColorInput
          :model-value="model.color"
          :label="$t('general.textColor')"
          :ui="{ inputContainerStyle: getStyle(model.color) }"
          rgba
          @update:model-value="model = { ...model, color: $event }"
        />
      </InputBlock>

      <!-- Background color -->
      <InputBlock
        v-if="!noBackground && model.isComplex"
        :label="$t('general.backgroundColor')"
        :value="getTranslation(model.backgroundColor)"
        :editable="editable"
        :value-style="getStyle(model.backgroundColor)"
      >
        <ColorInput
          :model-value="model.backgroundColor"
          :label="$t('general.backgroundColor')"
          rgba
          :ui="{ inputContainerStyle: getStyle(model.backgroundColor) }"
          @update:model-value="model = { ...model, backgroundColor: $event }"
        />
      </InputBlock>

      <!-- Border color -->
      <InputBlock
        v-if="!noBorder && model.isComplex"
        :label="$t('general.borderColor')"
        :value="getTranslation(model.borderColor)"
        :editable="editable"
        :value-style="getStyle(model.borderColor)"
      >
        <ColorInput
          :model-value="model.borderColor"
          :label="$t('general.borderColor')"
          rgba
          :ui="{ inputContainerStyle: getStyle(model.borderColor) }"
          @update:model-value="model = { ...model, borderColor: $event }"
        />
      </InputBlock>

      <!-- Icon -->
      <InputBlock
        v-if="!noIcon"
        :label="$t('general.icon', 1)"
        :value="model.icon"
        :editable="editable"
        col="start-1"
      >
        <TextInput
          v-model="model.icon"
          :label="$t('general.icon', 1)"
          col="start-1"
        />
      </InputBlock>
    </div>

    <!-- Right - preview -->
    <div
      v-if="!noPreview"
      flex="~ justify-center items-start"
      :class="[noComplex ? 'p-t-6' : 'p-t-2']"
    >
      <EnumeratorOptionChip
        :enumerator-option="{ id: -1, name, style: model }"
        no-link
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.visuals {
  @apply grid md:grid-cols-3;
}
</style>
