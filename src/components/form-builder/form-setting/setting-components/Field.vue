<template>
  <span :class="{'has-error':!valid}">
    <a-input v-model="data" placeholder="控件字段（必填）" @change="valueChange" />
    <span
      class="valid-msg"
      :class="{'ant-form-explain':!valid}"
    >字段格式：字母、数字、下划线，且须以字母开头</span>
  </span>
</template>
<script>
export const KEY_REG = /^[a-zA-Z][a-zA-Z0-9_]*$/;

export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      data: "",
      valid: true
    };
  },
  watch: {
    value: {
      handler(v) {
        this.data = v;
        this.valid = RegExp(KEY_REG).test(this.data);
      },
      immediate: true
    }
  },
  methods: {
    valueChange(e) {
      this.valid = RegExp(KEY_REG).test(this.data);
      this.$emit("change", e.target.value);
    }
  }
};
</script>
<style lang="less" scoped>

.valid-msg {
  font-size: 12px;
}
</style>