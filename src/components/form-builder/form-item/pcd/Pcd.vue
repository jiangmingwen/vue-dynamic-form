<template>
  <span>
    <a-cascader
      v-if="mode !== 'detail'"
      v-model="data"
      :options="options"
      :placeholder="formItem.placeholder"
      @change="onChange"
      :showSearch="!!formItem.showSearch"
    />
    <template v-else>{{detailText}}</template>
  </span>
</template>

<script>
import options, { findPCDName } from "./options";

export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: ["formItem", "form", "config", "value", "mode"],
  data() {
    return { options, data: [] };
  },
  watch: {
    value: {
      handler(v) {
        if (v) {
          let arr = v.split(",");
          if (arr && arr.length === 3) {
            this.data = arr;
          } else {
            this.data = [];
          }
        } else {
          this.data = [];
        }
      }
    }
  },
  computed: {
    detailText() {
      return findPCDName(this.value);
    }
  },
  methods: {
    onChange(e) {
      if (e && e.length === 3) {
        this.$emit("change", e.join(","));
      }
    }
  }
};
</script>

<style>
</style>