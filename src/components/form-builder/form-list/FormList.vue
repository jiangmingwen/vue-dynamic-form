<template>
  <div class="list-Area">
    <div v-for="(cate,index) in formItemList" :key="index">
      <a-divider orientation="left">
        <span class="form-cate">{{cate.title}}</span>
      </a-divider>
      <div class="helpers" ref="sortDom">
        <div
          class="component-item"
          v-for="(item, i) in cate.children"
          :type="item.type"
          :key="index + '-' + i"
          :data-id="item.type"
          data-source="formList"
        >
          <div class="component-content">
            <div class="item-name">{{ item.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formItemList from "../form-item/form-item.config";
import Sortable from "sortablejs";

export default {
  components: {},
  data() {
    return {
      formItemList,
      fieldsSortable: [],
      imgList: {}
    };
  },
  mounted() {
    this.formItemList.forEach((item, index) => {
      let sortInstance = this.createSortable(
        this.$refs["sortDom"][index],
        item.children
      );
      this.fieldsSortable.push(sortInstance);
    });
  },
  beforeDestroy() {
    this.fieldsSortable.forEach(item => {
      item.destroy();
    });
  },
  methods: {
    createSortable(el, items) {
      return new Sortable(el, {
        group: {
          name: "component",
          pull: "clone",
          put: false
        },
        sort: false,
        animation: 150,
        onStart: () => {
          this.$emit("drag", true);
        },
        onEnd: () => {
          this.$emit("drag", false);
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.list-Area {
  padding-bottom: 30px;

  .fields,
  .helpers {
    display: flex;
    flex-wrap: wrap;
  }
  .form-cate {
    font-weight: bold;
  }
  .component-item {
    cursor: move;
    width: 120px;
    height: 32px;
    border: 1px solid #d8d8d8;
    border-radius: 3px;
    margin-left: 16px;
    margin-bottom: 16px;
    &:hover {
      border-color: @primary-color;
      color: @primary-color;
    }
    .component-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 32px;
      padding: 0 8px;
      font-size: 12px;
      img {
        display: inline-block;
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>