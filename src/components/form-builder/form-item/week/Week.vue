<template>
  <span>
    <a-week-picker
      v-if="mode !== 'detail'"
      format="YYYY-wo"
      v-model="data"
      :placeholder="formItem?formItem.placeholder:undefined"
      @change="onChange"
    />
    <span v-else>{{detailText}}</span>
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
  computed: {
    detailText() {
      return moment(v).format("YYYY-WW") + "周";
    }
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
      this.$emit("change", e.format("YYYY-MM-DD"));
    }
  }
};
</script>