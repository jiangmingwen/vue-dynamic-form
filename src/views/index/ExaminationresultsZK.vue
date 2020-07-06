<template>
  <div>
    <div class="comPadding">
      <div class="lineset ">
        <div>
          <div class="spanicon"></div>
          <div class="linesettitletext">报名学校：开州区实验中学</div>
        </div>
      </div>
      <div class="mainBox">
        <div class="connatbox">
          <a-row>
            <a-form :form="form" :labelAlign="labelAlignleft">
              <a-col :span="18">
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="姓名"
                      :label-col="{ span: 3 }"
                      :wrapper-col="{ span: 16 }"
                    >
                      <span>王佳</span>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="民族"
                      :label-col="{ span: 3 }"
                      :wrapper-col="{ span: 16 }"
                    >
                      <span>汉族</span>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="年级"
                      :label-col="{ span: 3 }"
                      :wrapper-col="{ span: 16 }"
                    >
                      <span>初2019级</span>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="班级"
                      :label-col="{ span: 3 }"
                      :wrapper-col="{ span: 16 }"
                    >
                      <span>01班</span>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="身份证件号"
                      :label-col="{ span: 6 }"
                      :wrapper-col="{ span: 16 }"
                    >
                      <span>50010120140220914X</span>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="性别"
                      :label-col="{ span: 3 }"
                      :wrapper-col="{ span: 16 }"
                    >
                      <span>女</span>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="学籍号"
                      :label-col="{ span: 3 }"
                      :wrapper-col="{ span: 16 }"
                    >
                      <span>ZX827776172367213</span>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="考生类别"
                      :label-col="{ span: 4 }"
                      :wrapper-col="{ span: 16 }"
                    >
                      <span>应届</span>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="考生联系电话"
                      :label-col="{ span: 6 }"
                      :wrapper-col="{ span: 16 }"
                    >
                      <span>15735654543</span>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="体考号"
                      :label-col="{ span: 4 }"
                      :wrapper-col="{ span: 16 }"
                    >
                      <span>TK221213213213</span>
                    </a-form-item>
                  </a-col>
                </a-row>

                <a-row>
                  <a-col :span="24">
                    <a-form-item
                      label="现家庭居住地"
                      :label-col="{ span: 4 }"
                      :wrapper-col="{ span: 20 }"
                    >
                      <span>重庆市开州区xxxx街道xxx小区xxx</span>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="是否少数民族考生"
                      :label-col="{ span: 18 }"
                      :wrapper-col="{ span: 6 }"
                    >
                      <span>否</span>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="是否归侨、华侨子女考生"
                      :label-col="{ span: 18 }"
                      :wrapper-col="{ span: 6 }"
                    >
                      <span>否</span>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="是否台湾籍考生"
                      :label-col="{ span: 18 }"
                      :wrapper-col="{ span: 6 }"
                    >
                      <span>否</span>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="是否烈士子女考生"
                      :label-col="{ span: 18 }"
                      :wrapper-col="{ span: 6 }"
                    >
                      <span>否</span>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <a-form-item
                      label="是否享受优待现役军人（消防员）、一至四级因公伤残军人（消防员）子女考生"
                      :label-col="{ span: 18 }"
                      :wrapper-col="{ span: 6 }"
                    >
                      <span>否</span>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <a-form-item
                      label="是否公安英模、一至四级因公伤残公安民警子女考生"
                      :label-col="{ span: 18 }"
                      :wrapper-col="{ span: 6 }"
                    >
                      <span>否</span>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <a-form-item
                      label="审核备注"
                      :label-col="{ span: 4 }"
                      :wrapper-col="{ span: 20 }"
                    >
                      <span>------</span>
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-col>
            </a-form>
            <a-col :span="6">
              123
            </a-col>
          </a-row>
          <a-tabs defaultActiveKey="1" style="margin-bottom:10px">
            <a-tab-pane tab="成绩信息" key="1">
              <a-table
                :columns="columns"
                :dataSource="data"
                bordered
                size="middle"
                :pagination="paginationfalse"
              >
              </a-table>
            </a-tab-pane>
          </a-tabs>
          <a-row :gutter="16">
            <a-col :span="18" style="text-align: center;">
              <a-button type="primary">确认</a-button>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelAlignleft: "left",
      queryParam: {},
      form: this.$form.createForm(this, {
        name: "coordinated"
      }),
      columns: [
        {
          title: "考号",
          dataIndex: "kh",
          align: "center"
        },
        {
          title: "语文",
          dataIndex: "yw",
          align: "center"
        },
        {
          title: "数学",
          dataIndex: "sx",
          align: "center"
        },
        {
          title: "英语",
          dataIndex: "yy",
          align: "center"
        },
        {
          title: "综合素质评价",
          dataIndex: "zh",
          align: "center"
        }
      ],
      data: [
        {
          key: "1",
          kh: "Tk123213213213",
          yw: "120",
          sx: "123",
          yy: "99",
          zh: "A"
        }
      ],
      paginationfalse: false
    };
  }
};
</script>
<style lang="less" scoped>
.mainBox {
  box-sizing: border-box;
  width: 1200px;
  height: 500px;
  margin: 0 auto;
}

.acradsytle {
  width: 400px;
  height: 200px;
  display: inline-block;
  margin: 10px 50px;
}

.titleBox {
  color: #1890ff;
  // padding: 0 10px;
  // width: 88px;
  // height: 40px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid #d9d9d9;
  opacity: 1;
  border-radius: 4px 4px 0px 0px;
  text-align: center;
  line-height: 40px;
  margin-left: 30px;
  border-bottom: none;
}

.lineset {
  border-bottom: 1px solid #d9d9d9;
}
</style>
