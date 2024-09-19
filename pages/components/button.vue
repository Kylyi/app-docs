<script setup lang="ts">
</script>

<template>
  <PageWrapper>
    <Section title="Variants" flex flex-row gap-2 items-center>
      <Btn
        label="Round button"
        bg="red"
        color="white"
      />

      <Btn
        round
        label="Rounded button"
        bg="red"
        color="white"
      />

      <Btn
        icon="i-eva:plus-fill"
        label="With icon"
        bg="red"
        color="white"
      />
    </Section>

    <Section title="Sizes" flex flex-row gap-2 items-center>
      <Btn
        size="xs"
        label="xs button"
        bg="blue"
        color="white"
      />

      <Btn
        size="sm"
        label="sm button"
        bg="blue"
        color="white"
      />

      <Btn
        size="md"
        label="md button"
        bg="blue"
        color="white"
      />

      <Btn
        size="lg"
        label="lg button"
        bg="blue"
        color="white"
      />
    </Section>

    <Section title="States" flex flex-row gap-2 items-center>
      <Btn
        label="Disabled"
        disabled
      />

      <Btn
        loading
        label="Loading button"
      />
    </Section>
  </PageWrapper>
</template>
