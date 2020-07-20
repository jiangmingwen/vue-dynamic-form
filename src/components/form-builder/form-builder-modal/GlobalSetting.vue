<template>
  <a-modal
    :width="660"
    title="全局设置"
    wrapClassName="global-setting-modal"
    v-model="modalVisible"
    :maskClosable="false"
    @cancel="onCancel"
    @ok="onOk"
  >
    <div class="global-setting-list">
      <div class="global-setting-item">
        <div class="label">标签宽度</div>
        <div class="control">
          <a-input-number v-model="globalConfig.labelCol" :min="0" :max="24" />
          <span>与控件宽度之和不超过24</span>
        </div>
      </div>
      <div class="global-setting-item">
        <div class="label">控件宽度</div>
        <div class="control">
          <a-input-number v-model="globalConfig.wraperCol" :min="0" :max="24" />
          <span>与标签宽度之和不超过24</span>
        </div>
      </div>
      <div class="global-setting-item">
        <div class="label">标签横向对齐方式</div>
        <div class="control">
          <a-radio-group v-model="globalConfig.labelAlign" buttonStyle="solid">
            <a-radio-button value="left">左对齐</a-radio-button>
            <a-radio-button value="center">居中</a-radio-button>
            <a-radio-button value="right">右对齐</a-radio-button>
          </a-radio-group>
        </div>
      </div>
      <div class="global-setting-item">
        <div class="label">标签竖向对齐方式</div>
        <div class="control">
          <a-radio-group v-model="globalConfig.labelVertical" buttonStyle="solid">
            <a-radio-button value="top">顶部对齐</a-radio-button>
            <a-radio-button value="middle">居中</a-radio-button>
            <a-radio-button value="bottom">底部对齐</a-radio-button>
          </a-radio-group>
        </div>
      </div>
      <div class="global-setting-item">
        <div class="label">表格模式</div>
        <div class="control">
          <a-switch v-model="globalConfig.tableStyle" />
          <span>如果开启，响应式设置将会失效</span>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: ["visible", "value"],
  data() {
    return {
      modalVisible: false,
      globalConfig: {}
    };
  },
  watch: {
    visible: {
      handler(v) {
        this.modalVisible = v;
      },
      immediate: true
    },
    value: {
      handler(v) {
        if (v) {
          this.globalConfig = JSON.parse(JSON.stringify(v));
        } else {
          this.globalConfig = {};
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    onCancel() {
      this.$emit("close", false);
    },
    onOk() {
      this.$emit("change", this.globalConfig);
      this.$emit("close", false);
    }
  }
};
</script>

<style lang="less" scoped>

.global-setting-list {
  display: flex;
  flex-wrap: wrap;
  .global-setting-item {
    width: 50%;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    span {
      font-size: 12px;
      padding-left: @padding-md / 2;
    }
    .label {
      margin-bottom: @padding-md / 2;
    }
  }
}
</style>