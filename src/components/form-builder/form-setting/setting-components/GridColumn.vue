<template>
  <div class="columns-container" ref="sortDom">
    <div v-for="(item,index) in data" :key="index" :data-id="index" class="item">
      <div class="delete-btn" @click="onDelete(item,index)" v-if="data.length > 2">
        <div>
          <a-icon type="delete" />
        </div>
      </div>
      <div class="icon move-icon">
        <a-icon type="drag" />
      </div>
      <div class="column-config">
        <div class="column-config-item">
          <a-tooltip placement="left" title="栅格向左移动格数">
            <div>pull:</div>
          </a-tooltip>
          <a-input-number
            style="width:50px"
            :step="1"
            size="small"
            v-model="item.pull"
            :min="0"
            :max="24"
          />
        </div>
        <div class="column-config-item">
          <a-tooltip placement="left" title="栅格向右移动格数">
            <div>push:</div>
          </a-tooltip>
          <a-input-number
            style="width:50px"
            :step="1"
            size="small"
            v-model="item.push"
            :min="0"
            :max="24"
          />
        </div>
        <div class="column-config-item">
          <a-tooltip placement="left" title="栅格占位格数">
            <div>span:</div>
          </a-tooltip>
          <a-input-number
            style="width:50px"
            :step="1"
            size="small"
            v-model="item.span"
            :min="0"
            :max="24"
          />
        </div>
        <div class="column-config-item">
          <a-tooltip placement="left" title="栅格左侧的间隔格数">
            <div>offset:</div>
          </a-tooltip>
          <a-input-number
            style="width:60px"
            :step="1"
            size="small"
            v-model="item.offset"
            :min="0"
            :max="24"
          />
        </div>
        <div class="column-config-item">
          <div>响应式:</div>
          <a-switch v-model="item.isResponvive" size="small" />
          <a
            style="padding-left: 3px;"
            :disabled="!item.isResponvive"
            href="javascript:;"
            @click.stop.prevent="onResponsiveClick(item,index)"
          >设置</a>
        </div>
      </div>

      <div class="icon delete" v-if="data.length > 2" @click="onDelete(item,index)">
        <i class="iconfont icon-jian" />
      </div>
    </div>
    <div class="add-col">
      <a-button type="link" @click="onAdd">添加栅格列</a-button>
    </div>

    <a-modal
      title="栅格响应式布局设置"
      :visible="responsiveVisible"
      @ok="onResponsiveOk"
      @cancel="onResponsiveCancel"
    >
      <div v-if="selectedRow" class="modal-container">
        <div class="column-config-item" v-for="(item,index) in responsiveField" :key="index">
          <div class="title">
            <span>{{item.field}}</span>
            <span>（{{item.description}}）</span>
          </div>
          <div class="setting">
            <div class="setting-item">
              <div>span</div>
              <a-input-number
                style="width:60px"
                :step="1"
                size="small"
                v-model="selectedRow[item.field].span"
                :min="0"
                :max="24"
              />
            </div>
            <div class="setting-item">
              <div>offset</div>
              <a-input-number
                style="width:60px"
                :step="1"
                size="small"
                v-model="selectedRow[item.field].offset"
                :min="0"
                :max="24"
              />
            </div>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import Sortable from "sortablejs";

export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: ["value"],
  components: {},
  data() {
    return {
      responsiveVisible: false,
      selectedRow: null,
      data: [],
      sortInstance: null,
      renderKey: 1,
      responsiveField: [
        {
          field: "xs",
          description: "设备宽度<576像素"
        },
        {
          field: "sm",
          description: "设备宽度≥576像素"
        },
        {
          field: "md",
          description: "设备宽度≥768像素"
        },
        {
          field: "lg",
          description: "设备宽度≥992像素"
        },
        {
          field: "xl",
          description: "设备宽度≥1200像素"
        },
        {
          field: "xxl",
          description: "设备宽度≥1600像素"
        }
      ],
      selectedRowIndex: -1
    };
  },
  watch: {
    value(v) {
      console.log(v, "vvvvvvvvvvvvvvvvvv111");
      this.data = v;
    }
  },
  mounted() {
    this.data = this.value;
    setTimeout(() => {
      this.sortInstance = new Sortable(this.$refs.sortDom, {
        group: {
          name: "columnDom",
          pull: false,
          put: false
        },
        handle: ".move-icon",
        sort: true,
        animation: 150,
        onSort: e => {
          let sortedData = this.sortInstance.toArray();
          let newSortData = [];
          sortedData.forEach(item => {
            this.data.forEach((data, index) => {
              if (item == index) {
                newSortData.push(data);
              }
            });
          });
          this.data = newSortData;
          console.log("排序", this.data, "dd");
          this.$emit("change", this.data);
        }
      });
    }, 10);
  },
  beforeDestroy() {
    if (this.sortInstance && this.sortInstance.destory) {
      this.sortInstance.destory();
    }
  },
  methods: {
    onResponsiveCancel() {
      this.responsiveVisible = false;
    },
    onResponsiveOk() {
      this.data[this.selectedRowIndex] = this.selectedRow;
      this.responsiveVisible = false;
      this.$emit("change", this.data);
    },
    onResponsiveClick(item, index) {
      this.selectedRow = JSON.parse(JSON.stringify(item));
      this.selectedRowIndex = index;
      this.responsiveVisible = true;
    },
    onAdd() {
      this.data.push({
        list: [],
        offset: 0,
        pull: 0,
        push: 0,
        span: 12,
        isResponvive: false,
        xs: { span: 12, offset: 0 },
        sm: { span: 12, offset: 0 },
        md: { span: 12, offset: 0 },
        lg: { span: 12, offset: 0 },
        xl: { span: 12, offset: 0 },
        xxl: { span: 12, offset: 0 }
      });
      this.$emit("change", this.data);
    },
    onSpanChange() {
      this.$emit("change", this.data);
    },
    onDelete(data, i) {
      this.data = this.data.filter((item, index) => i !== index);
      this.$emit("change", this.data);
    }
  }
};
</script>


<style scoped lang="less">
.columns-container {
  .item {
    display: flex;
    align-items: center;
    border: 1px solid #d8d8d8;
    border-top: 0;
    position: relative;
    .delete-btn {
      position: absolute;
      right: 1px;
      bottom: 2px;
      cursor: pointer;
      div {
        width: 20px;
        height: 20px;
        border: 1px solid #d8d8d8;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &:hover {
        color: @error-color;
        div {
          border-color: @error-color;
        }
      }
    }
    &:first-child {
      border-top: 1px solid #d8d8d8;
    }
    .input-box {
      width: 60px;
    }
    .column-config {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      padding: @padding-md / 4;
      .column-config-item {
        width: 45%;
        display: flex;
        justify-content: center;
        align-items: center;
        &:nth-child(1),
        &:nth-child(2),
        &:nth-child(3) {
          width: 33.33%;
          padding-bottom: 5px;
          padding-right: 5px;
        }
      }
    }
    .icon {
      font-size: 20px;
      align-self: stretch;
      background-color: @primary-color;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      &.move-icon {
        cursor: move;
      }
      &.delete {
        cursor: pointer;
        &:hover {
          color: @error-color;
        }
      }
    }
    .add-col {
    }
  }
}
.modal-container {
  display: flex;
  flex-wrap: wrap;
  .column-config-item {
    width: 50%;
    padding: 8px;
    border-bottom: 1px solid #d8d8d8;
    &:nth-child(5),
    &:nth-child(6) {
      border-bottom: 0;
    }
    .title {
      span:first-child {
        font-weight: bold;
        font-size: 20px;
      }
    }
    .setting {
      display: flex;
      .setting-item {
        margin-right: @padding-md;
      }
    }
  }
}
</style>