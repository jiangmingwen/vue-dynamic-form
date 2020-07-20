<template>
<span>
  <a-rate v-if="mode !== 'detail'" v-model="data" @change="onChange" :allowHalf="!!formItem.allowHalf" />
<template v-else>{{value + '颗星'}}</template>
  
</span>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: ["formItem", "form", "config", "value",'mode'],
  data() {
    return {
      data: 0
    };
  },
  watch: {
    value(v) {
      if (typeof v === "number") {
        this.data = v;
      } else {
        this.data = 0;
      }
    }
  },
  methods: {
    onChange(e) {
      this.$emit("change",e);
    }
  }
};
</script>