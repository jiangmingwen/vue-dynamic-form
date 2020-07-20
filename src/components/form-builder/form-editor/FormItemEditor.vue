<template>
  <div class="form-item-editor" :class="[activeKey === formItem.key ?'form-item-active':'']">
    <FormItemRender :formItem="formItem" :form="form" :config="config" mode="edit" />
      <div class="overlay" @click.stop.prevent="onItemActive"></div>
    <template v-if="activeKey === formItem.key">
      <div class="active-bar"></div>
      <div class="form-item-copy" @click.stop.prevent="onCopy" title="复制">
        <a-icon type="copy" />
      </div>
      <div class="form-item-delete" @click.stop.prevent="onDelete" title="删除">
        <a-icon type="minus" />
      </div>
    </template>
  </div>
</template>

<script>
import FormItemRender from "../form-render/FormItemRender";

export default {
  props: ["formItem", "form", "config", "activeKey", "index"],
  components: { FormItemRender },
  methods: {
    onItemActive() {
      console.log("我是在item里");
      this.$emit("active", this.formItem);
    },
     onCopy() {
      this.$emit("copy", { data: this.formItem, index: this.index });
    },
    onDelete() {
      console.log(1)
      this.$emit("delete", { data: this.formItem, index: this.index });
    },
  }
};
</script>

<style lang="less" scoped>

.form-item-editor {
  background-color: #f4f6fc;
  &.form-item-active {
    background-color: @primary-1;
    .active-bar {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 5px;
      background-color: @primary-color;
    }
  }
}
</style>