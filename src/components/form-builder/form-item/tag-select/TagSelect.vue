<template>
  <span>
    <a-select
      v-if="mode !== 'detail'"
      mode="tags"
      :value="data"
      @change="onChange"
      :maxTagCount="formItem && formItem.maxTagCount ? formItem.maxTagCount : 3"
      :maxTagPlaceholder="maxTagPlaceholder"
      :maxTagTextLength="formItem ? formItem.maxTagTextLength : undefined"
      :placeholder="formItem ? formItem.placeholder : ''"
    >
      <a-select-option v-for="(option,index) in options" :key="index" :value="option">{{option}}</a-select-option>
    </a-select>
    <template v-else>{{value}}</template>
  </span>
</template>

<script>
import message from "ant-design-vue/es/message";
export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: ["formItem", "form", "config", "value", "mode"],
  data() {
    return {
      options: [],
      data: [],
      maxTagPlaceholder: ""
    };
  },
  watch: {
    value: {
      handler(v) {
        if (v && typeof v === "string") {
          this.data = v.split(",");
        } else {
          this.data = [];
        }
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
      let maxTagCount =
        this.formItem && this.formItem.maxTagCount
          ? this.formItem.maxTagCount
          : 3;
      if (e.length > maxTagCount) {
        this.maxTagPlaceholder = `等${e.length}项已选择`;
      }

      if (
        this.formItem &&
        this.formItem.maxCount >= 1 &&
        e.length > this.formItem.maxCount
      ) {
        //超出最大个数，提示，报错
        message.error(`超出当前允许最大选择个数： ${this.formItem.maxCount}`);
        return;
      }
      this.$emit("change", e.join(","));
    }
  }
};
</script>