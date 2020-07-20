<template>
  <span>
    <a-time-picker
      v-if="mode !== 'detail'"
      v-model="data"
      :use12Hours="formItem.showMode"
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
      data: null
    };
  },
  watch: {
    value: {
      handler(v) {
        if (v) {
          console.log(v, "v");
          this.data = moment(moment().format("YYYY-MM-DD ") + v);
        } else {
          this.data = null;
        }
      },
      immediate: true
    }
  },
  methods: {
    onChange(e) {
      this.$emit("change", e.format("HH:mm:ss"));
    }
  }
};
</script>