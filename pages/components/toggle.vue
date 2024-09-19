<script setup lang="ts">
</script>

<template>
  <PageWrapper>
    <Section title="States" flex flex-row gap-2 items-center>
      <div flex flex-col gap-2>
        <Toggle
          label="checked"
          :model-value="true"
        />

        <Toggle
          label="checked filled"
          :model-value="true"
          filled
        />

        <Toggle
          label="checked disabled"
          :model-value="true"
          disabled
        />

        <Toggle
          label="checked readonly"
          :model-value="true"
          readonly
        />
      </div>

      <div flex flex-col gap-2>
        <Toggle
          label="unchecked"
          :model-value="false"
        />

        <Toggle
          label="unchecked filled"
          :model-value="false"
        />

        <Toggle
          label="unchecked disabled"
          :model-value="false"
          disabled
        />

        <Toggle
          label="unchecked readonly"
          :model-value="false"
          readonly
        />
      </div>

      <div flex flex-col gap-2>
        <Toggle
          label="undetermined"
        />

        <Toggle
          label="undetermined filled"
          filled
        />

        <Toggle
          label="undetermined disabled"
          disabled
        />

        <Toggle
          label="undetermined readonly"
          readonly
        />
      </div>
    </Section>

    <Section title="Not contained states" flex flex-row gap-2 items-center>
      <div flex flex-col gap-2>
        <Toggle
          label="checked"
          :model-value="true"
          :contained="false"
        />

        <Toggle
          label="checked filled"
          :model-value="true"
          filled
          :contained="false"
        />

        <Toggle
          label="checked disabled"
          :model-value="true"
          disabled
          :contained="false"
        />

        <Toggle
          label="checked readonly"
          :model-value="true"
          readonly
          :contained="false"
        />
      </div>

      <div flex flex-col gap-2>
        <Toggle
          label="unchecked"
          :model-value="false"
          :contained="false"
        />

        <Toggle
          label="unchecked filled"
          :model-value="false"
          :contained="false"
        />

        <Toggle
          label="unchecked disabled"
          :model-value="false"
          disabled
          :contained="false"
        />

        <Toggle
          label="unchecked readonly"
          :model-value="false"
          readonly
          :contained="false"
        />
      </div>

      <div flex flex-col gap-2>
        <Toggle
          label="undetermined"
          :contained="false"
        />

        <Toggle
          label="undetermined filled"
          filled
          :contained="false"
        />

        <Toggle
          label="undetermined disabled"
          disabled
          :contained="false"
        />

        <Toggle
          label="undetermined readonly"
          readonly
          :contained="false"
        />
      </div>
    </Section>

    <Section title="Rounding" flex flex-row gap-2 items-center>
      <div flex flex-col gap-2>
        <Toggle
          label="full checked"
          :model-value="true"
          rounding="full"
        />

        <Toggle
          label="full unchecked"
          :model-value="false"
          rounding="full"
        />

        <Toggle
          label="full undetermined"
          rounding="full"
        />
      </div>

      <div flex flex-col gap-2>
        <Toggle
          label="full checked"
          :model-value="true"
          rounding="normal"
        />

        <Toggle
          label="full unchecked"
          :model-value="false"
          rounding="normal"
        />

        <Toggle
          label="full undetermined"
          rounding="normal"
        />
      </div>

      <div flex flex-col gap-2>
        <Toggle
          label="full checked"
          :model-value="true"
          rounding="none"
        />

        <Toggle
          label="full unchecked"
          :model-value="false"
          rounding="none"
        />

        <Toggle
          label="full undetermined"
          rounding="none"
        />
      </div>
    </Section>

    <Section title="Sizes" flex flex-row gap-2 items-center>
      <Toggle
        size="xs"
        label="xs toggle"
        :model-value="true"
      />

      <Toggle
        size="sm"
        label="sm toggle"
        :model-value="true"
      />

      <Toggle
        size="md"
        label="md toggle"
        :model-value="true"
      />

      <Toggle
        size="lg"
        label="lg toggle"
        :model-value="true"
      />
    </Section>
  </PageWrapper>
</template>

<style scoped lang="scss">

</style>
