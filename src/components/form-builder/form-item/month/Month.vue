<template>
  <span>
    <a-month-picker
      v-if="mode !== 'detail'"
      v-model="data"
      :placeholder="formItem?formItem.placeholder:undefined"
      @change="onChange"
    />
    <template v-else>{{ value }}</template>
  </span>
</template>

<script>
import moment from "moment";
export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: ["formItem", "form", "config", "value", "mode"],
  data() {
    return {
      data: undefined
    };
  },
  watch: {
    value: {
      handler(v) {
        if (v) {
          this.data = moment(v);
        } else {
          this.data = undefined;
        }
      },
      immediate: true
    }
  },
  methods: {
    onChange(e) {
      this.$emit("change", e.format("YYYY-MM"));
    }
  }
};
</script>