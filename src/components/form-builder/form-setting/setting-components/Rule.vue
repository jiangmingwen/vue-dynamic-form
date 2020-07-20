<template>
  <div class="container">
    <div class>
      <a-button icon="plus" @click="onNew">添加校验规则</a-button>
    </div>
    <div class="rule-table">
      <div class="row header">
        <div class="col type">类型</div>
        <div class="col val">值</div>
        <div class="col message">提示</div>
        <div class="col operation">操作</div>
      </div>
      <div class="row" v-for="(item,index) in data" :key="index">
        <div class="col type">{{ getType(item) }}</div>
        <div
          class="col val"
          :title="item.required?true:item.pattern"
        >{{item.required?true:item.pattern}}</div>
        <div class="col message" :title="item.message">{{item.message}}</div>
        <div class="col operation">
          <a href="javascript:void(0);" @click="onEdit(item,index)" title="编辑">
            <a-icon type="edit" />
          </a>
          <a-divider type="vertical" />
          <a href="javascript:void(0);" title="删除">
            <a-popconfirm
              placement="leftBottom"
              okText="确认"
              cancelText="取消"
              @confirm="onDelete(index)"
              title="确认要删除这条校验规则吗？"
            >
              <a-icon type="delete" />
            </a-popconfirm>
          </a>
        </div>
      </div>
      <div v-if="!data.length" class="empty-box">
        <a-empty description="暂未设置校验规则" />
      </div>
    </div>
    <a-modal title="校验规则" v-model="modalVisible" @ok="onModalOk" :width="666">
      <div class="rule-item">
        <div class="rule-label">
          <span class="required">*</span> 校验规则：
        </div>
        <div class="rule-control">
          <a-select v-model="ruleType" style="width: 100%" @change="onSelectedChange">
            <a-select-option
              v-for=" (option,index) in selectList"
              :value="option.type"
              :key="index"
            >{{option.title}}</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="rule-item">
        <div class="rule-label">
          <span class="required">*</span> 规则表达式：
        </div>
        <div class="rule-control">
          <a-input
            v-if="ruleType == 'custom'"
            v-model="ruleVal"
            placeholder="请输入JS正则表达式(表达式两端不需要加 “/”)"
          />
          <span v-else>{{ruleType ? ruleVal : '请选择一个校验规则'}}</span>
          <div v-if="ruleType == 'custom'" class="test-box">
            <div>
              <a-input v-if="ruleType == 'custom'" v-model="testText" placeholder="请输入要测试的内容" @change="result = null" />
            </div>
            <div>
              <a-button @click="onTest">测试</a-button>
            </div>
            <div>
              <span>测试结果：</span>
              <span
                class="result"
                :class="[result === null?'no-click':'',result === true?'pass':'',result === false?'no-pass':'']"
              >{{result=== null?'请点击测试':(result === true?'成功':'失败')}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="rule-item">
        <div class="rule-label">错误提示：</div>
        <div class="rule-control">
          <a-input v-if="ruleType == 'custom'" v-model="errorMsg" placeholder="表单验证失败的提示消息" />
          <span v-else>{{ruleType?errorMsg:'请选择一个校验规则'}}</span>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
const exsitList = [
  {
    title: "必填",
    type: "required",
    value: "true",
    message: "该字段为必填项"
  },
  {
    title: "邮箱",
    type: "email",
    value:
      "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$",
    message: "邮箱格式错误"
  },
  {
    title: "手机",
    type: "phone",
    value: "^1[3456789]d{9}$",
    message: "手机格式错误"
  },

  {
    title: "固定电话",
    type: "tel",
    value: "^0\\d{2,3}?\\d{7,8}$",
    message: "固定电话格式错误"
  },
  {
    title: "邮政编码",
    type: "postCode",
    value: "^[0-9]{6}$",
    message: "输入正确邮政编码"
  },
  {
    title: "中文名称",
    type: "chineseName",
    value: "^[\\u4E00-\\u9FA5]{2,4}$",
    message: "中文名称"
  },
  {
    title: "身份证",
    type: "idCard",
    value:
      "^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$",
    message: "身份证格式错误"
  },
  {
    title: "字段",
    type: "field",
    value: "^[a-zA-Z][a-zA-Z0-9_]*$",
    message: "以字母开头，字母、数字、下划线组成"
  },
  {
    title: "自定义正则校验",
    type: "custom",
    value: "",
    message: ""
  }
];

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
      modalVisible: false,
      selectedIndex: -1,
      selectList: exsitList,
      ruleType: "",
      ruleVal: "",
      errorMsg: "",
      result: null,
      testText: ""
    };
  },
  watch: {
    value: {
      handler(v) {
        this.data = v;
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    onTest() {
      if(!this.ruleVal){
         this.$message.error('请输入校验规则');
        return
      }
      if(!this.testText){
        this.$message.error('请输入测试内容');
        return
      }
      let regexp = new RegExp(this.ruleVal);
      this.result = regexp.test(this.testText);
    },
    onSelectedChange(e) {
      this.selectList.forEach(item => {
        if (item.type === e) {
          this.ruleVal = item.value;
          this.errorMsg = item.message;
        }
      });
      this.testText = "";
      this.result = null;

    },
    onNew() {
      this.modalVisible = true;
      this.selectedIndex = -1;
      this.ruleType = "";
      this.ruleVal = "";
      this.errorMsg = "";
      this.testText = "";
      this.result = null;
    },
    onEdit(item, index) {
      this.modalVisible = true;
      this.selectedIndex = index;
      this.ruleType = this.getType(item, true);
      this.ruleVal = item.required ? true : item.pattern;
      this.errorMsg = item.message;
      this.testText = "";
      this.result = null;
    },
    onDelete(index) {
      this.data = this.data.filter((item, i) => i !== index);
      this.$emit("change", this.data);
    },
    onModalOk() {
      let item = { message: this.errorMsg };
      if (this.ruleType == "custom") {
        item["pattern"] = new RegExp(this.ruleVal);
        delete item.required;
      } else {
        if (this.ruleType == "required") {
          item["required"] = true;
          delete item.pattern;
        } else {
          item["pattern"] = new RegExp(this.ruleVal);
          delete item.required
        }
      }

      if (this.selectedIndex < 0) {
        //新增
        this.data.push(item);
      } else {
        //修改
        this.data[this.selectedIndex] = item;
      }
      this.modalVisible = false;
      this.$emit("change", this.data);
    },
    getType(data, getValue) {
      let type = "";
      if (data.required) {
        type = getValue ? "required" : "必填";
      } else {
        this.selectList.forEach(item => {
          if (data.pattern == "/" + item.value + "/") {
            type = getValue ? item.type : item.title;
          }
        });
        if (!type) {
          type = getValue ? "custom" : "自定义正则校验";
        }
      }
      return type;
    }
  }
};
</script>

<style scoped lang="less">
@table-border: 1px solid @border-color-base;
.rule-table {
  margin-top: @padding-md / 2;
  .row {
    display: flex;
    border: @table-border;
    border-bottom: none;
    &:last-child {
      border-bottom: @table-border;
    }
    .col {
      padding: 3px;
      &:not(:last-child) {
        border-right: @table-border;
      }
      &:last-child {
        text-align: center;
      }
      &.message {
        width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &.type {
        width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &.val {
        width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &.operation {
        width: 70px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    &.header {
      .col {
        text-align: center;
      }
    }
  }

  .empty-box {
    border: @table-border;
    padding: @padding-md / 2;
  }
}
.rule-item {
  margin-bottom: @padding-md;
  .no-ruletype {
    height: 30px;
    line-height: 30px;
    background-color: rgba(0, 0, 0, 0.05);
    text-align: center;
  }
  .rule-label {
    line-height: 30px;
    font-weight: bold;
    .required {
      color: @error-color;
    }
  }
  .test-box {
    display: flex;
    margin-top: @padding-md;
    div {
      width: 25%;
      display: flex;
      align-items: center;
      justify-content: center;
      &:nth-child(1) {
        width: 50%;
      }
    }
    .result{
      font-size: 16px;
      &.pass{
        color: @success-color;
      }
      &.no-pass{
        color: @error-color;
      }
    }
  }
}
</style>