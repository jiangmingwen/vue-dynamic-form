<template>
  <div
    class="form-grid-editor form-item-editor"
    :class="[activeKey === formItem.key ?'form-item-active':'']"
    @click.stop.prevent="onItemActive"
  >
    <a-row
      type="flex"
      :align="formItem.align || 'top'"
      :justify="formItem.justify || 'start'"
      class="form-grid-editor-row"
    >
      <a-col
        v-for="(colItem,index) in formItem.columns"
        class="col-item"
        :offset="colItem.offset"
        :span="colItem.span"
        :pull="colItem.pull"
        :push="colItem.push"
        :xs="colItem.isResponvive?colItem.xs:colItem.span"
        :sm="colItem.isResponvive?colItem.sm:colItem.span"
        :md="colItem.isResponvive?colItem.md:colItem.span"
        :lg="colItem.isResponvive?colItem.lg:colItem.span"
        :xl="colItem.isResponvive?colItem.xl:colItem.span"
        :xxl="colItem.isResponvive?colItem.xxl:colItem.span"
        :key="index"
      >
        <div class="col-border">
          <div class="col-grid-list" :data-id="colItem.key" :data-index="index" ref="colbody">
            <template v-for="(colListItem,cIndex) in colItem.list">
              <FormGridEditor
                v-if="colListItem.type == 'Grid'"
                :key="renderKey+'_'+cIndex"
                :formItem="colListItem"
                :activeKey="activeKey"
                :form="form"
                :index="cIndex"
                :config="config"
                @active="onSubAcitve"
                @copy="onGridCopy($event,index)"
                @delete="onSubDelete($event,index)"
              />
              <FormItemEditor
                v-else
                :key="renderKey+'_'+cIndex"
                :formItem="colListItem"
                :form="form"
                :activeKey="activeKey"
                :config="config"
                :index="cIndex"
                @active="onSubAcitve"
                @copy="onItemCopy($event,index)"
                @delete="onSubDelete($event,index)"
              />
            </template>
          </div>
        </div>
      </a-col>
      <template v-if="activeKey === formItem.key">
        <div class="active-bar"></div>
        <div class="form-item-copy" @click.stop.prevent="onCopy" title="复制">
          <a-icon type="copy" />
        </div>
        <div class="form-item-delete" @click.stop.prevent="onDelete" title="删除">
          <a-icon type="minus" />
        </div>
      </template>
    </a-row>
  </div>
</template>

<script>
import FormItemEditor from "./FormItemEditor";
import Sortable from "sortablejs";
import { getFormConfig, recursiveReplace } from "../utils/form-config.util";

export default {
  name: "FormGridEditor",
  props: ["formItem", "form", "config", "activeKey", "index"],
  components: { FormItemEditor },
  data() {
    return {
      sortInstance: [],
      renderKey: 0
    };
  },
  mounted() {},
  watch: {
    formItem: {
      handler(v) {
        this.sortableInit();
      },
      immediate: true,
      deep: true
    }
  },
  beforeDestroy() {
    this.destorySortInstance();
  },
  methods: {
    onItemCopy(e, colIndex) {
      let item = JSON.parse(JSON.stringify(e.data));
      let key = Date.now();
      item["key"] = key;
      item["model"] = item.type + "_" + key;
      this.formItem.columns[colIndex].list.splice(e.index + 1, 0, item);
      this.$emit("change", this.formItem);
      this.$emit("active", item);
    },
    onSubDelete(e, colIndex) {
      console.log(this.formItem, "前");
      this.formItem.columns[colIndex].list.splice(e.index, 1);
      console.log(this.formItem, "后");
      this.$emit("change", this.formItem);
      this.$emit("active", null);
    },
    onGridCopy(e, colIndex) {
      let item = JSON.parse(JSON.stringify(e.data));
      let key = Date.now();
      recursiveReplace(item, key, 0);
      this.formItem.columns[colIndex].list.splice(e.index + 1, 0, item);
      this.$emit("change", this.formItem);
      this.$emit("active", item);
    },

    onCopy() {
      this.$emit("copy", { data: this.formItem, index: this.index });
    },
    onDelete() {
      this.$emit("delete", { data: this.formItem, index: this.index });
    },
    onItemActive() {
      console.log("我是在 grid里");
      this.$emit("active", this.formItem);
    },
    onSubAcitve(e) {
      console.log("我是在item里 grid");

      this.$emit("active", e);
    },
    destorySortInstance() {
      this.sortInstance.forEach(item => {
        if (item.destory) {
          item.destory();
        }
      });
    },
    sortableInit() {
      this.$nextTick(() => {
        this.destorySortInstance(); //节约内存，摧毁已经实例过的desotry
        this.$refs.colbody.forEach(item => {
          let isAdd = false;
          let sortinstance = new Sortable(item, {
            group: { name: "component" },
            animation: 200,
            onSort: e => {
              if (!isAdd) {
                const tempData = this.formItem.columns[
                  Number(e.target.dataset.index)
                ].list[e.oldIndex];

                const newData = this.formItem.columns[
                  Number(e.target.dataset.index)
                ].list[e.newIndex];
                if (!newData) {
                  //如果没有newData，则表示是从栅格里面拖出来的，拖到最后面去了
                  this.formItem.columns[
                    Number(e.target.dataset.index)
                  ].list.splice(e.oldIndex, 1);
                } else {
                  if (!tempData.key) return;
                  if (e.newIndex !== e.oldIndex) {
                    this.formItem.columns[
                      Number(e.target.dataset.index)
                    ].list.splice(e.oldIndex, 1);
                    this.formItem.columns[
                      Number(e.target.dataset.index)
                    ].list.splice(e.newIndex, 0, tempData);
                  }
                }
                this.renderKey += 1;
                this.$emit("change", this.formItem);
              }
              isAdd = false;
            },
            onAdd: e => {
              isAdd = true;
              console.log(e, "eeee");
              let defaultConfig = null;
              if (e.item.dataset.source == "formList") {
                //左侧进入的
                defaultConfig = getFormConfig(e.item.dataset.id);
              } else {
                //是从现有的控件拖过来的
                console.log(e.item.__vue__.formItem, "eeee");
                defaultConfig = e.item.__vue__.formItem;
              }

              this.formItem.columns[Number(e.target.dataset.index)].list.splice(
                e.newIndex,
                0,
                defaultConfig
              );

              this.$emit("active", defaultConfig);
              this.$emit("change", this.formItem);
              e.item.parentNode.removeChild(e.item);
            },
            onRemove: e => {
              // 做移除的时候，add的地方会先触发，如果不设定时器，add的地方会取不到e.item.__vue__
              
              setTimeout(() => {
                this.formItem.columns[
                  Number(e.target.dataset.index)
                ].list.splice(e.newIndex, 1);
                this.$emit("change", this.formItem);
              }, 100);
            }
          });
          this.sortInstance.push(sortinstance);
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>

@table-border: 1px solid @border-color-base;
.form-grid-editor {
  background-color: #f4f6fc;
  .col-border {
    border: 1px dashed @border-color-base;
    .col-grid-list {
      padding-bottom: 50px;
    }
  }
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