<template>
  <a-modal
    :width="width"
    title="预览"
    :wrapClassName="'preview-modal preview-mock ' + layout"
    v-model="previewModalVisible"
    :footer="null"
    :maskClosable="false"
    @cancel="$emit('close',false)"
  >
    <div class="top-toolbox">
      <span class="item">
        <span>布局：</span>
        <a-select v-model="layout" style="width: 160px" >
          <a-select-option value="none">无</a-select-option>
          <a-select-option value="banner">banner (1200px)</a-select-option>
          <a-select-option value="xs" :disabled="uiConf && uiConf.config && uiConf.config.tableStyle">xs (&lt;576px)</a-select-option>
          <a-select-option value="sm" :disabled="uiConf && uiConf.config && uiConf.config.tableStyle">sm (≥576px)</a-select-option>
          <a-select-option value="md" :disabled="uiConf && uiConf.config && uiConf.config.tableStyle">md (≥768px)</a-select-option>
          <a-select-option value="lg" :disabled="uiConf && uiConf.config && uiConf.config.tableStyle">lg (≥992px)</a-select-option>
          <a-select-option value="xl" :disabled="uiConf && uiConf.config && uiConf.config.tableStyle">xl (≥1200px)</a-select-option>
          <a-select-option value="xxl" :disabled="uiConf && uiConf.config && uiConf.config.tableStyle">xxl (≥1600px)</a-select-option>
        </a-select>
      </span>
      <span class="item">
        <span>模式：</span>
        <a-select v-model="formMode" style="width: 160px">
          <a-select-option value="edit">编辑模式</a-select-option>
          <a-select-option value="detail">详情模式</a-select-option>
        </a-select>
      </span>
      <span class="item" v-if="formMode == 'edit'">
        <a-button type="primary" @click="onFormSubmit">提交表单</a-button>
        <a-button type="danger" ghost @click="onFormReset">重置</a-button>
      </span>
    </div>
    <div class="preview-content" :class="['mock-' + layout]">
      <Form
        :uiConf="uiConf"
        :gateway="gateway"
        :userModel="userModel"
        @getform="getPreviewForm"
        :mode="formMode"
        :banner="layout == 'banner' ? 1200 : false"
        :mock="layout"
      />
    </div>
    <a-modal title="表单验证结果" v-model="resultModalVisible" :footer="null">
      <div class="result-item header">{{results?results:'表单验证不通过'}}</div>
    </a-modal>
  </a-modal>
</template>

<script>
import Form from "../Form";
import message from "ant-design-vue/es/message";

export default {
  props: ["uiConf", "visible", "gateway", "userModel"],
  components: { Form },
  data() {
    return {
      previewModalVisible: false,
      resultModalVisible: false,

      layout: "none",
      formMode: "edit",
      width: window.innerWidth,
      results: []
    };
  },
  watch: {
    visible: {
      handler(v) {
        this.previewModalVisible = v;
        this.layout = "none";
        this.formMode = "edit";
      },
      immediate: true
    }
  },
  methods: {
    onGlobalSettingClick() {},
    onFormSubmit() {
      if (this.previewForm) {
        this.previewForm.validateFields((err, values) => {
          if (err) {
            message.error("表单验证失败");
            this.results = null;
          } else {
            message.success("表单验证通过");
            this.results = values;
          }
          this.resultModalVisible = true;
        });
      }
    },
    onFormReset() {
      if (this.previewForm) {
        this.$confirm({
          title: "提示",
          content: "确认要重置表单的值吗?",
          onOk: () => {
            this.previewForm.resetFields();
          }
        });
      }
    },
    getPreviewForm(form) {
      this.previewForm = form;
    }
  }
};
</script>
<style lang="less" scoped>

/deep/ .preview-mock {
  .ant-modal-body {
    background-color: rgba(0, 0, 0, 0.5);
  }
  &.none {
    .ant-modal-body {
      background-color: transparent;
    }
  }

  .preview-content {
    background-color: #fff;
    margin: 0 auto;
    padding: 0;
    height: calc(100% - 50px) !important;
    &.mock-banner {
      width: 1260px;
    }
    &.mock-xs {
      width: 576px;
    }
    &.mock-sm {
      width: 760px;
    }
    &.mock-md {
      width: 880px;
    }
    &.mock-lg {
      width: 1000px;
    }
    &.mock-xl {
      width: 1400px;
    }
  }
}
</style>