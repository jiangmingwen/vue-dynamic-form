<template>
  <span>
    <a-select
      v-if="mode !== 'detail'"
      v-model="data"
      @change="onChange"
      :placeholder="formItem?formItem.placeholder:''"
    >
      <a-select-option :key="-1" :value="''">请选择</a-select-option>
      <a-select-option
        v-for="(option,index) in options"
        :key="index"
        :value="option.value"
      >{{option.label}}</a-select-option>
    </a-select>
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
      data: ""
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