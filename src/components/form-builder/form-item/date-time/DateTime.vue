<template>
  <span>
    <a-date-picker
      v-if="mode !== 'detail'"
      v-model="data"
      :showTime="!!formItem.showTime"
      @change="onChange"
      :placeholder="formItem?formItem.placeholder:undefined"
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
  props: ["formItem", "form", "config", "value",'mode'],
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
      let format =
        this.formItem && this.formItem.showTime
          ? "YYYY-MM-DD HH:mm:ss"
          : "YYYY-MM-DD";
      this.$emit("change", e.format(format));
    }
  }
};
</script>