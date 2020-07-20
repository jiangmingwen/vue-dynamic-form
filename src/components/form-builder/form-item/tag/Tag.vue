<template>
  <div class="tag-container">
    <template v-if=" mode !== 'detail'">
      <div v-for="(tag,index) in tagList " :key="tag+index">
        <a-tag closable @close="onDelete(tag,index)">{{tag}}</a-tag>
      </div>
      <div>
        <a-tag
          v-if="!newStatus"
          @click="onNew"
          style="background: #fff; borderStyle: dashed;cursor:pointer"
        >
          <a-icon type="plus" />添加标签
        </a-tag>

        <a-input
          v-if="newStatus"
          v-model="newValue"
          @pressEnter="onSubmit"
          @blur="onSubmit"
          placeholder="请输入标签名称"
          ref="inputTag"
        />
      </div>
    </template>
    <template v-else>
      <a-tag v-for="(tag,index) in tagList " :key="index">{{tag}}</a-tag>
    </template>
  </div>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    limit: {
      type: Number,
      default: 1
    },
    value: {
      type: Array,
      default: () => []
    },
    mode: {
      type: String
    }
  },

  data() {
    return {
      newValue: "",
      newStatus: false,
      tagList: []
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.tagList = val;
      }
    },
    tagList(val) {
      this.$emit("change", val);
    }
  },

  methods: {
    onDelete(tag, index) {
      this.tagList.splice(index, 1);
      this.$emit("change", this.tagList);
    },
    onNew() {
      this.newStatus = true;
      this.newValue = "";
      this.$nextTick(() => {
        this.$refs.inputTag.focus();
      });
    },
    onSubmit() {
      if (!this.newValue.trim() || !this.newStatus) {
        this.newStatus = false;
        return;
      }
      if (this.tagList.includes(this.newValue.trim())) {
        this.$message.error("标签重复");
      } else {
        this.tagList.push(this.newValue.trim());
        this.newStatus = false;
        this.$emit("change", this.tagList);
      }
    }
  }
};
</script>

<style scoped lang="less">
.tag-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .disabledTag {
    color: #aaa;
  }
}
</style>