<script setup lang="ts">
</script>

<template>
  <PageWrapper>
    <Section title="Variants" flex flex-row gap-2 items-center>
      <Checkbox
        label="checked"
        :model-value="true"
      />
      <Checkbox label="unchecked" />
      <Checkbox
        :editable="false"
        label="disabled without value"
      />
      <Checkbox
        :editable="false"
        :model-value="true"
        label="disabled with value"
      />
    </Section>

    <Section title="Colors">
      <div flex flex-row gap-2 items-center>
        <Checkbox
          color="primary"
          label="primary"
          :model-value="true"
        />
        <Checkbox
          color="secondary"
          label="secondary"
          :model-value="true"
        />
        <Checkbox
          color="positive"
          label="positive"
          :model-value="true"
        />
        <Checkbox
          color="warning"
          label="warning"
          :model-value="true"
        />
        <Checkbox
          color="negative"
          label="negative"
          :model-value="true"
        />
        <Checkbox
          color="info"
          label="info"
          :model-value="true"
        />
        <Checkbox
          color="light"
          label="light"
          :model-value="true"
        />
        <Checkbox
          color="dark"
          label="dark"
          :model-value="true"
        />
        <Checkbox
          color="darker"
          label="darker"
          :model-value="true"
        />
      </div>

      <div flex flex-row gap-2 items-center>
        <Checkbox
          color="primary"
          label="primary"
        />
        <Checkbox
          color="secondary"
          label="secondary"
        />
        <Checkbox
          color="positive"
          label="positive"
        />
        <Checkbox
          color="warning"
          label="warning"
        />
        <Checkbox
          color="negative"
          label="negative"
        />
        <Checkbox
          color="info"
          label="info"
        />
        <Checkbox
          color="light"
          label="light"
        />
        <Checkbox
          color="dark"
          label="dark"
        />
        <Checkbox
          color="darker"
          label="darker"
        />
      </div>
    </Section>

    <Section title="Sizes">
      <div flex flex-row gap-2 items-center>
        <Checkbox
          size="xs"
          label="xs checkbox"
          :model-value="true"
        />
        <Checkbox
          size="sm"
          label="sm checkbox"
          :model-value="true"
        />
        <Checkbox
          size="md"
          label="md checkbox"
          :model-value="true"
        />
        <Checkbox
          size="lg"
          label="lg checkbox"
          :model-value="true"
        />
      </div>
      <div flex flex-row gap-2 items-center>
        <Checkbox
          size="xs"
          label="xs checkbox"
        />
        <Checkbox
          size="sm"
          label="sm checkbox"
        />
        <Checkbox
          size="md"
          label="md checkbox"
        />
        <Checkbox
          size="lg"
          label="lg checkbox"
        />
      </div>
    </Section>
  </PageWrapper>
</template>

<style scoped lang="scss">

</style>
