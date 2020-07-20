<template>
  <span>
    <a-switch
      v-if="mode !== 'detail'"
      v-model="data"
      @change="onChange"
      :checkedChildren="formItem?formItem.checkedChildren:''"
      :unCheckedChildren="formItem?formItem.unCheckedChildren:''"
    />
    <template v-else>{{data?formItem.checkedChildren:formItem.unCheckedChildren}}</template>
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
      data: false
    };
  },
  watch: {
    value(v) {
      if (v) {
        if (this.formItem) {
          this.data = v === this.formItem.dbCheckedValue;
        } else {
          this.data = !!v;
        }
      } else {
        this.data = false;
      }
    }
  },
  methods: {
    onChange(e) {
      if (this.formItem) {
        this.$emit(
          "change",
          e ? this.formItem.dbCheckedValue : this.formItem.dbUnCheckedValue
        );
      } else {
        this.$emit("change", e);
      }
    }
  }
};
</script>