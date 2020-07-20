<template>
  <span>
    <a-radio-group v-if="mode !== 'detail'" v-model="data" @change="onChange">
      <template v-if="formItem && formItem.radioMode == 'button'">
        <a-radio-button
          :style="formItem&&formItem.orientation =='vertical'? radioStyle:{}"
          v-for="(option,index) in  options"
          :key="index"
          :value="option.value"
        >{{option.label}}</a-radio-button>
      </template>
      <template v-else>
        <a-radio
          :style="formItem&&formItem.orientation =='vertical'? radioStyle:{}"
          v-for="(option,index) in  options"
          :key="index"
          :value="option.value"
        >{{option.label}}</a-radio>
      </template>
    </a-radio-group>
    <template v-else>{{detailText}}</template>
  </span>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: ["formItem", "form", "config", "value", "mode"],
  data() {
    return {
      options: [],
      data: "",
      radioStyle: {
        display: "block",
        height: "30px",
        lineHeight: "30px"
      }
    };
  },
  computed: {
    detailText() {
      let names = "";
      this.options.forEach(item => {
        if (this.value == item.value) {
          names = item.label;
        }
      });
      return names;
    }
  },
  watch: {
    value: {
      handler(v) {
        this.data = v;
      },
      immediate: true
    },
    formItem: {
      handler(v) {
        if (v && Array.isArray(v.options)) {
          this.options = v.options;
        } else {
          this.options = [];
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    onChange(e) {
      this.$emit("change", e.target.value);
    }
  }
};
</script>

<style>
</style>