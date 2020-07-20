<template>
  <a-slider v-model="data" @change="onChange" />
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: ["value"],
  watch: {
    value: {
      handler(v) {
        this.data = v;
      },
      immediate: true
    }
  },
  data() {
    return {
      data: undefined
    };
  },
  methods: {
    onChange(e) {
      console.log(e, "$event");
    }
  }
};
</script>

<style>
</style>