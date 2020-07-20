<template>
  <span class="hb-checkbox" :class="[formItem.orientation]">
    <a-checkbox-group :options="options" :value="data" @change="onChange" v-if="mode !== 'detail'">
      <a-checkbox
        v-for="(option,index) in  options"
        :key="index"
        :value="option.value"
      >{{option.label}}</a-checkbox>
    </a-checkbox-group>
    <template v-else>{{ detailText }}</template>
  </span>
</template>

<script>
import message from "ant-design-vue/es/message";

export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: ["formItem", "form", "config", "value", "mode"],
  data() {
    return {
      options: [],
      data: [],
      radioStyle: {}
    };
  },
  computed:{
    detailText(){
      let names = [];
      this.options.forEach(item =>{
        if(this.data.includes(item.value)){
          names.push(item.label)
        }
      })
      return names.join(',');
    }
  },
  watch: {
    value: {
      handler(v) {
        if (v && typeof v === "string") {
          this.data = v.split(",");
        } else {
          this.data = [];
        }
      },
      immediate: true
    },
    formItem: {
      handler(v) {
        if (v && Array.isArray(v.options)) {
          this.options = v.options;
        } else {
          this.options = [];
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    onChange(e) {
      if (
        this.formItem &&
        this.formItem.maxCount >= 1 &&
        e.length > this.formItem.maxCount
      ) {
        //超出最大个数，提示，报错
        message.error(`超出当前允许最大选择个数： ${this.formItem.maxCount}`);
        return;
      }

      this.$emit("change", e.join(","));
    }
  }
};
</script>

<style lang="less" scoped>

.hb-checkbox {
  &.vertical {
    /deep/ .ant-checkbox-wrapper {
      display: block;
      height: 30px;
      line-height: 30px;
    }
  }
}
</style>