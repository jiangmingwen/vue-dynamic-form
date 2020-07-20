<template>
  <div class="table-columns-container" ref="sortDom">
    <div class="item" v-for="(item,index) in data" :key="renderKey+'_'+index" :data-id="index">
      <div class="icon move-icon">
        <a-icon type="drag" />
      </div>
      <div>
        <div class="title-input">
          <a-input v-model="item.value" addonBefore="值" @change="valueChange" />
        </div>
        <div class="title-input">
          <a-input v-model="item.label" addonBefore="标题" @change="valueChange" />
        </div>
      </div>
      <div class="icon delete" @click="onDelete(item,index)">
        <a-icon type="delete" />
      </div>
    </div>
    <div class="add-col">
      <a-button type="link" @click="onAdd">添加选项</a-button>
    </div>
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
      data: [],
      sortInstance: null,
      renderKey: 1
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(v) {
        this.data = JSON.parse(JSON.stringify(v));
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
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
              if (Number(item) == index) {
                newSortData.push(data);
              }
            });
          });
          this.data = newSortData;
          this.renderKey += 1;
          this.$emit("change", this.data);
        }
      });
    });
  },
  beforeDestroy() {
    if (this.sortInstance && this.sortInstance.destory) {
      this.sortInstance.destory();
    }
  },
  methods: {
    onAdd() {
      let dataCopy = [...this.data];
      dataCopy.push({
        value: "option" + (dataCopy.length + 1),
        label: "选项" + (dataCopy.length + 1)
      });
      this.data = dataCopy;
      this.$emit("change", this.data);
    },
    onDelete(data, i) {
      let dataCopy = [...this.data];
      this.data = dataCopy.filter((item, index) => i !== index);
      this.$emit("change", this.data);
    },
    valueChange() {
      this.$emit("change", this.data);
    }
  }
};
</script>

<style scoped lang="less">
.table-columns-container {
  .item {
    display: flex;
    align-items: center;
    padding-top: @padding-xs;
    border: 1px solid @border-color-base;
    margin-top: @padding-md / 2;
    .title-input {
      margin-bottom: @padding-xs / 2;
      /deep/.ant-input-wrapper.ant-input-group.column-width {
        .ant-input-number {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          width: 100%;
        }
      }
    }
    .icon {
      font-size: 20px;
      margin: 0 @padding-md / 2;
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
  }
}
</style>