<script setup lang="ts">
</script>

<template>
  <PageWrapper>
    <Section title="Variants" flex flex-row gap-2 items-center>
      <Radio label="checked" />
      <Radio
        label="unchecked"
        val="x"
      />
      <Radio
        label="disabled"
        disabled
      />
      <Radio
        label="disabled"
        val="x"
        disabled
      />
    </Section>

    <Section title="Colors">
      <div flex flex-row gap-2 items-center>
        <Radio
          color="primary"
          label="primary"
        />
        <Radio
          color="secondary"
          label="secondary"
        />
        <Radio
          color="positive"
          label="positive"
        />
        <Radio
          color="warning"
          label="warning"
        />
        <Radio
          color="negative"
          label="negative"
        />
        <Radio
          color="info"
          label="info"
        />
        <Radio
          color="light"
          label="light"
        />
        <Radio
          color="dark"
          label="dark"
        />
        <Radio
          color="darker"
          label="darker"
        />
      </div>

      <div flex flex-row gap-2 items-center>
        <Radio
          color="primary"
          label="primary"
          val="true"
        />
        <Radio
          color="secondary"
          label="secondary"
          val="true"
        />
        <Radio
          color="positive"
          label="positive"
          val="true"
        />
        <Radio
          color="warning"
          label="warning"
          val="true"
        />
        <Radio
          color="negative"
          label="negative"
          val="true"
        />
        <Radio
          color="info"
          label="info"
          val="true"
        />
        <Radio
          color="light"
          label="light"
          val="true"
        />
        <Radio
          color="dark"
          label="dark"
          val="true"
        />
        <Radio
          color="darker"
          label="darker"
          val="true"
        />
      </div>
    </Section>

    <Section title="Sizes">
      <div flex flex-row gap-2 items-center>
        <Radio
          size="xs"
          label="xs radio"
        />
        <Radio
          size="sm"
          label="sm radio"
        />
        <Radio
          size="md"
          label="md radio"
        />
        <Radio
          size="lg"
          label="lg radio"
        />
      </div>

      <div flex flex-row gap-2 items-center>
        <Radio
          size="xs"
          label="xs radio"
          val="true"
        />
        <Radio
          size="sm"
          label="sm radio"
          val="true"
        />
        <Radio
          size="md"
          label="md radio"
          val="true"
        />
        <Radio
          size="lg"
          label="lg radio"
          val="true"
        />
      </div>
    </Section>
  </PageWrapper>
</template>

<style scoped lang="scss">

</style>
