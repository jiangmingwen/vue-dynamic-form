
  
<template>
  <span>
    <a-range-picker
      v-if="mode !== 'detail'"
      v-model="data"
      :showTime="!!formItem.showTime"
      @change="onChange"
      :placeholder="[formItem?formItem.placeholder:undefined,formItem?formItem.placeholder:undefined]"
    />
    <template v-else>{{ detailText }}</template>
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
      data: []
    };
  },
  computed:{
    detailText(){
      return (this.value || []).join('~');
    }
  },
  watch: {
    value: {
      handler(v) {
        if (v && v.length >= 2) {
          this.data = [moment(v[0]), moment(v[1])];
        } else {
          this.data = [];
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
      this.$emit("change", [e[0].format(format), e[1].format(format)]);
    }
  }
};
</script>