<template>
  <span>
    <a-input-number
      v-if="mode !== 'detail'"
      v-model="data"
      :min="formItem.min"
      :max="formItem.max"
      :precision="formItem.precision"
      :decimalSeparator="formItem.decimalSeparator"
      :step="formItem.step"
      :parser="parser"
      :formatter="formatter"
      :placeholder="formItem.placeholder"
      @change="onChange"
    />
    <template v-else>{{ value }}</template>
  </span>
</template>

<script>
export default {
  props: ["formItem", "form", "config", "value", "mode"],
  watch: {
    value: {
      handler(v) {
        this.data = v;
      },
      immediate: true
    },
    formItem: {
      handler(v) {
        let parser = undefined;
        let formatter = undefined;
        try {
          eval("parser = " + v.parser);
          eval("formatter = " + v.formatter);
        } catch (err) {}
        this.parser = parser;
        this.formatter = formatter;
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      data: null,
      parser: undefined,
      formatter: undefined
    };
  },
  methods: {
    onChange() {
      this.$emit("change", this.data);
    }
  }
};
</script>

<style>
</style>