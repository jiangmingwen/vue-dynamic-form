<template>
  <a-form
    :form="form"
    class="form-container"
    ref="sortTable"
    :style="{width: banner?banner+'px': '100%',margin:'0 auto'}"
    :class="config.tableStyle?'table':''"
  >
    <template v-for="(item,index) in data">
      <FormGridRender
        v-if="item.type === 'Grid'"
        :mode="mode"
        :key="index"
        :formItem="item"
        :form="form"
        :config="{...config,gateway,userModel}"
        :banner="!!banner"
        :mock="mock"
      />
      <FormItemRender
        v-else
        :mode="mode"
        :key="index"
        :formItem="item"
        :form="form"
        :config="{...config,gateway,userModel}"
      />
    </template>
  </a-form>
</template>

<script>
import FormGridRender from "./form-render/FormGridRender";
import FormItemRender from "./form-render/FormItemRender";
export default {
  components: { FormGridRender, FormItemRender },
  props: [
    "uiConf",
    "formData",
    "gateway",
    "userModel",
    "mode",
    "banner",
    "mock"
  ],
  data() {
    return {
      data: [],
      config: {}
    };
  },
  watch: {
    uiConf: {
      handler(v) {
        console.log(v);
        if (v) {
          this.data = v.data;
          this.config = v.config;
        } else {
          this.data = [];
          this.config = {};
        }
      },
      immediate: true,
      deep: true
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
    this.$emit("getform", this.form);
  }
};
</script>

<style lang="less" >

@table-border: 1px solid @border-color-base;
.form-container {
  &.table {
    border: @table-border;
    border-right: 0;
    .form-item-render {
      border-bottom: @table-border;
      border-right: @table-border;
      &:last-child {
        border-bottom: 0;
      }
      .ant-form-item {
        margin-bottom: 0;
        margin-top: 5px;
        .ant-form-explain {
          font-size: 12px;
          min-height: 16px;
        }
        .ant-form-item-control{
          padding-bottom: 16px;
        }
        .ant-form-explain{
          position: absolute;
          bottom: 0;
        }
      }
    }
    .form-grid-render {
      border-bottom: @table-border;
      border-right: @table-border;
      &:last-child {
        border-bottom: 0;
      }
    .col-item {
        align-self: stretch;
        min-height: 40px;
        border-right: @table-border;
        .form-item-render {
          border-right: 0;
        }
        &:last-child {
          border-right: 0;
        }
      }
      .form-grid-render {
        border-right: 0;
        border-bottom: @table-border;
      }
    }
  }
}
</style>