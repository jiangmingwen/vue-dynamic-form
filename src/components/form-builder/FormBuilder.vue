<template>
  <div class="form-builder-container">
    <div class="builder-container header">
      <div class="list header-item">
        <span>表单控件仓库</span>
        <span class="tips">拖拽控件到中间</span>
      </div>
      <div class="builder header-item">
        <span>
          <a-button type="link">普通布局</a-button>
          <a-button type="link" disabled>移动端布局</a-button>
        </span>
        <span>
          <a-button type="link" @click="onFormConfig">表单配置数据</a-button>
          <a-button type="link" @click="onGlobalSettingClick">全局设置</a-button>
          <a-button type="link" @click="onPreviewClick">预览</a-button>
        </span>
      </div>
      <div class="config header-item">
        <span>控件设置</span>
        <span>{{activeItem ? activeItem.name : '未选中表单控件'}}</span>
      </div>
    </div>
    <div class="builder-container main">
      <div class="list" ref="listArea">
        <FormList @drag="onDrag" />
      </div>
      <div class="builder" ref="builderArea" :class="[draging ? 'draging' : '']">
        <a-form :form="form" class="form-container" ref="sortTable">
          <template v-for="(item,index) in data">
            <FormGridEditor
              v-if="item.type === 'Grid'"
              :key="renderKey+'_'+index"
              :index="index"
              :formItem="item"
              :form="form"
              :config="{...config,gateway,userModel}"
              :activeKey="activeKey"
              @active="onActive"
              @copy="onGridCopy"
              @delete="onDelete"
            />
            <FormItemEditor
              v-else
              :activeKey="activeKey"
              :key="renderKey+'_'+index"
              :index="index"
              :formItem="item"
              :form="form"
              :config="{...config,gateway,userModel}"
              @active="onActive"
              @copy="onItemCopy"
              @delete="onDelete"
            />
          </template>
        </a-form>
      </div>
      <div class="config" ref="configArea">
        <FormSetting :activeItem="activeItem" />
      </div>
    </div>

    <previewModal
      v-if="previewModalVisible"
      :visible="previewModalVisible"
      :uiConf="{config: config,data:data}"
      :gateway="gateway"
      :userModel="userModel"
      @close="previewModalVisible = false"
    />
    <GlobalSettingModal
      v-if="globalSettingVisible"
      v-model="config"
      :visible="globalSettingVisible"
      @close="globalSettingVisible = false"
    />
    <FormConfigData
      v-if="formConfigVisible"
      :visible="formConfigVisible"
      :uiConf="{config: config,data:data}"
      :dbConf="dbConf"
      @close="formConfigVisible = false"
    />
  </div>
</template>

<script>
import Sortable from "sortablejs";
import Scrollbar from "smooth-scrollbar";
import FormList from "./form-list/FormList";
import formItemList from "./form-item/form-item.config";
import FormItemEditor from "./form-editor/FormItemEditor";
import FormGridEditor from "./form-editor/FormGridEditor";
import FormSetting from "./form-setting/FormSetting";
import previewModal from "./form-builder-modal/PreviewModal";
import GlobalSettingModal from "./form-builder-modal/GlobalSetting";
import FormConfigData from "./form-builder-modal/FormConfigData";

import {
  getFormConfig,
  recursiveReplace,
  arrayObject2ArrayElement,
  getFormList
} from "./utils/form-config.util";

const defaultConfig = {
  labelCol: 5,
  wraperCol: 12,
  labelAlign: "right",
  labelVertical: "top",
  tableStyle: false
};
export default {
  components: {
    FormList,
    FormItemEditor,
    FormSetting,
    FormGridEditor,
    previewModal,
    GlobalSettingModal,
    FormConfigData
  },
  props: {
    value: {
      type: Object,
      default: () => ({ config: { ...defaultConfig }, list: [] })
    },
    gateway: {
      type: String,
      default: "",
      required: true
    },
    userModel: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  watch: {
    value: {
      handler(val) {
        console.log(val, "builder");
        if (val) {
          this.data = val.list || [];

          this.config = { ...defaultConfig, ...val.config };
        } else {
          this.data = [];
          this.config = { ...defaultConfig };
        }
      },
      immediate: true
    },
    data: {
      handler(v) {
        this.dbConf = getFormList(v);
        this.$emit("change", { config: this.config, data: v });
      },
      deep: true
    },
    config: {
      handler(v) {
        this.$emit("change", { config: v, data: this.data });
      },
      deep: true
    }
  },
  data() {
    return {
      formConfigVisible: false,
      globalSettingVisible: false,
      previewModalVisible: false,
      data: [],
      config: { ...defaultConfig },
      scroll: null,
      draging: false,
      activeItem: null,
      activeKey: null,
      previewForm: null,
      renderKey: 0,
      dbConf: []
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  mounted() {
    Scrollbar.init(this.$refs.listArea);
    Scrollbar.init(this.$refs.builderArea);
    Scrollbar.init(this.$refs.configArea);

    let isAdd = false;
    new Sortable(this.$refs.sortTable.$el, {
      group: { name: "component" },
      animation: 200,
      onStart: e => {},
      onEnd: e => {},
      onSort: e => {
        //添加也会触发onSort， 用个变量去来区分
        if (!isAdd) {
          console.log("排序 进入", "e");
          const tempData = this.data[e.oldIndex];
          const newData = this.data[e.newIndex];
          console.log(tempData, newData, e.newIndex, e.oldIndex);
          if (!tempData.key || !newData.key) return;
          if (e.newIndex !== e.oldIndex) {
            this.data.splice(e.oldIndex, 1);
            this.data.splice(e.newIndex, 0, tempData);
          }
          this.emitChange();
          console.log("排序 进入", this.data);
        }

        isAdd = false;
      },
      onAdd: e => {
        console.log("builder onAdd");
        isAdd = true;
        let defaultConfig = null;

        if (e.item.dataset.source == "formList") {
          //左侧新增的
          defaultConfig = getFormConfig(e.item.dataset.id);
        } else {
          //不是从左侧进来的 数据
          defaultConfig = e.item.__vue__.formItem;
        }
        console.log(defaultConfig, "eeeeeeeee");
        this.data.splice(e.newIndex, 0, defaultConfig);
        this.activeKey = defaultConfig.key;
        this.activeItem = defaultConfig;
        e.item.parentNode.removeChild(e.item);
        this.emitChange();
        console.log(this.data, "ddddddddddddata");
      },
      onRemove: e => {
        console.log("builder remove");
        //拖动时候的remove事件，不等于删除，删除时任何地方都没有了，remove的时候有个地方会add
        // 做移除的时候，add的地方会先触发，如果不设定时器，add的地方会取不到e.item.__vue__
        isAdd = true
        setTimeout(() => {
          this.data.splice(e.oldIndex, 1);
          console.log(this.data, "datatatatata");
          this.emitChange();
        }, 100);
      }
    });
  },
  methods: {
    onFormConfig() {
      this.formConfigVisible = true;
    },
    onGlobalSettingClick() {
      this.globalSettingVisible = true;
    },
    onPreviewClick() {
      this.previewModalVisible = true;
    },
    emitChange() {
      this.renderKey += 1;
      this.$emit("change", {
        config: this.config,
        data: this.data
      });
    },
    onDelete(e) {
      this.data.splice(e.index, 1);
      this.activeItem = {};
      this.activeKey = null;
      this.emitChange();
    },
    onItemCopy(e) {
      let item = JSON.parse(JSON.stringify(e.data));

      let key = Date.now();
      item["key"] = key;
      item["model"] = item.type + "_" + key;
      this.data.splice(e.index + 1, 0, item);
      this.activeItem = item;
      this.activeKey = key;
      this.emitChange();
    },
    onGridCopy(e) {
      //栅格复制，需要更新内部所有的key
      let item = JSON.parse(JSON.stringify(e.data));
      // 替换替换栅格里的所有key
      let key = Date.now();
      recursiveReplace(item, key, 0);
      this.data.splice(e.index + 1, 0, item);
      this.activeItem = item;
      this.activeKey = key;
      this.emitChange();
    },
    onDrag(bool) {
      this.draging = bool;
    },
    onActive(e) {
      if (e) {
        this.activeItem = e;
        this.activeKey = e.key;
      } else {
        this.activeItem = {};
        this.activeKey = null;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@border: 1px solid @border-color-base;
/deep/ .preview-modal {
  height: 100%;

  .ant-modal {
    height: 100%;
    top: 0;
    padding-bottom: 0;
    .ant-modal-content {
      height: 100%;
      overflow: hidden;
      .ant-modal-body {
        padding: 0;
        height: calc(100% - 55px);
        .top-toolbox {
          padding: @padding-md;
          height: 50px;
          border-bottom: 1px solid @border-color-base;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f1f1f1;
          .item {
            padding: 0 @padding-md * 2;
            /deep/ button {
              margin-right: @padding-md;
            }
          }
        }
        .preview-content {
          height: calc(100% - 66px);
          padding: @padding-md / 2;
          overflow: auto;
        }
      }
    }
  }
}

.form-builder-container {
  height: 100%;
  .builder-container {
    display: flex;
    &.header {
      height: 45px;
      border-bottom: @border;

      .header-item {
        align-items: center;
        display: flex;
        justify-content: space-between;
        &:not(.builder) {
          padding: 0 @padding-md;
        }
        span:nth-child(1) {
          font-weight: bold;
        }
      }
    }
    .list,
    .config {
      flex: 0 0 290px;
      .tips {
        font-size: 12px;
        color: #d1d1d1;
      }
    }
    .builder {
      flex: 1;
      border-left: @border;
      border-right: @border;
    }

    &.main {
      height: calc(100% - 45px);
      .builder {
        background-image: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.02) 10%,
            transparent 0
          ),
          linear-gradient(rgba(0, 0, 0, 0.02) 10%, transparent 0);
        background-size: 10px 10px;

        /deep/ .scroll-content {
          height: 100%;
          .form-container {
            min-height: 100%;
            padding-bottom: 50px;
          }
        }
        &.draging {
          background-image: linear-gradient(
              90deg,
              @primary-1 10%,
              transparent 0
            ),
            linear-gradient(@primary-1 10%, transparent 0);
          padding-top: 20px;
        }

        /deep/ .component-item {
          width: 100%;
          height: 5px;
          background-color: @primary-color;
          margin-left: 0;
          .component-content {
            display: none;
          }
        }
      }

      /deep/ .form-item-editor {
        position: relative;
        padding: 0 5px;
        .overlay {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          cursor: move;
          z-index: 19;
        }
        .form-item-copy {
          position: absolute;
          right: 16px;
          bottom: -4px;
          width: 20px;
          height: 20px;
          border: 1px solid @primary-color;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #ffffff;
          color: @primary-color;
          z-index: 20;

          cursor: pointer;
          i,
          svg {
            font-size: 12px;
          }
          &:hover {
            background-color: @primary-color;
            color: #ffffff;
          }
        }
        .form-item-delete {
          position: absolute;
          right: 40px;
          bottom: -4px;
          width: 20px;
          height: 20px;
          border: 1px solid @error-color;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #ffffff;
          cursor: pointer;
          color: @error-color;
          z-index: 20;
          i,
          svg {
            font-size: 12px;
          }
          &:hover {
            background-color: @error-color;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>