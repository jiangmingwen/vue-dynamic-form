<template>
  <div>
    <page-header showindex="1"></page-header>
    <div class="comPadding">
      <div class="lineset ">
        <div>
          <div class="spanicon"></div>
          <div class="linesettitletext">报名学校：开州区实验中学</div>
        </div>
      </div>
      <div class="mainBox">
        <a-tag
          size="large"
          :color="
            GetStateColor(
              'BeExaminationStudent_Sing_Up_Status_Enum',
              Datadetails.Sing_Up_Status
            )
          "
        >
          {{
            GetnameC(
              "BeExaminationStudent_Sing_Up_Status_Enum",
              Datadetails.Sing_Up_Status
            )
          }}
        </a-tag>
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
                      <span>{{ Datadetails.Name }}</span>
                    </a-form-item>
                  </a-col>

                  <a-col :span="12">
                    <a-form-item
                      label="性别"
                      :label-col="{ span: 3 }"
                      :wrapper-col="{ span: 16 }"
                    >
                      <span>{{ GetnameC("XB", Datadetails.Sex) }}</span>
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
                      <span>{{ Datadetails.Grade_Name }}</span>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="班级"
                      :label-col="{ span: 3 }"
                      :wrapper-col="{ span: 16 }"
                    >
                      <span>{{ Datadetails.Class_Name }}</span>
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
                      <span>{{ Datadetails.Id_Number }}</span>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="民族"
                      :label-col="{ span: 3 }"
                      :wrapper-col="{ span: 16 }"
                    >
                      <span>{{ GetnameC("MZ", Datadetails.Nation_Code) }}</span>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="学籍号"
                      :label-col="{ span: 4 }"
                      :wrapper-col="{ span: 16 }"
                    >
                      <span>{{ Datadetails.Student_Status }}</span>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="考生联系电话"
                      :label-col="{ span: 8 }"
                      :wrapper-col="{ span: 16 }"
                    >
                      <span>{{ Datadetails.Phone }}</span>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="班主任姓名"
                      :label-col="{ span: 6 }"
                      :wrapper-col="{ span: 16 }"
                    >
                      <span>{{ Datadetails.Headmaster_Name }}</span>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="班主任联系电话"
                      :label-col="{ span: 8 }"
                      :wrapper-col="{ span: 16 }"
                    >
                      <span>{{ Datadetails.Headmaster_Phone }}</span>
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
                      <span
                        >{{ Datadetails.Current_Address
                        }}{{ Datadetails.Current_Address_Detail }}</span
                      >
                    </a-form-item>
                  </a-col>
                </a-row>

                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="不宜运动情况"
                      :label-col="{ span: 7 }"
                      :wrapper-col="{ span: 16 }"
                    >
                      <a-select
                        placeholder="请选择"
                        v-decorator="[
                          'Is_Unsuitable_Exercise',
                          {
                            rules: [
                              { required: true, message: '不宜运动情况必选!' },
                            ],
                          },
                        ]"
                      >
                        <a-select-option value="NO">无</a-select-option>
                        <a-select-option value="ADISABILITY"
                          >残疾</a-select-option
                        >
                        <a-select-option value="LNJURY">伤病</a-select-option>
                        <a-select-option value="UNSUITABLEEXERCISE"
                          >不宜运动体质</a-select-option
                        >
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="是否申请免考:"
                      :label-col="{ span: 20 }"
                      :wrapper-col="{ span: 4 }"
                    >
                      <a-switch
                        defaultChecked
                        checkedChildren="是"
                        unCheckedChildren="否"
                        v-decorator="['Is_Apply_Exempt_Examination']"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row :gutter="16">
                  <a-col
                    v-show="val.IsShow"
                    :span="12"
                    v-for="(val, index) in DynamicTableFields"
                    :key="index"
                  >
                    <!-- 时间 -->
                    <!-- <a-form-item
						v-show="val.IsEdit && val.Column == 'Csrq'"
						:label="val.Explain"
						:label-col="{ span: 8 }"
						:wrapper-col="{ span: 12 }"
					  >
						<a-date-picker
						  format="YYYY-MM-DD"
						  @change="onChange"
						  v-decorator="
							WithDecorator(val.Column, val.IsRequired, val.Explain)
						  "
						>
						</a-date-picker>
					  </a-form-item> -->
                    <!-- 民族 -->
                    <a-form-item
                      v-show="val.IsEdit && val.Column == 'Zzmm'"
                      :label="val.Explain"
                      :label-col="{ span: 8 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-select
                        placeholder="请选择"
                        v-decorator="
                          WithDecorator(val.Column, val.IsRequired, val.Explain)
                        "
                      >
                        <a-select-option :value="''" :key="'0'"
                          >请选择</a-select-option
                        >
                        <a-select-option
                          v-for="item in getEnumByKey('ZZMM')"
                          :value="item.Value"
                          :key="item.NameC"
                          >{{ item.NameC }}</a-select-option
                        >
                      </a-select>
                    </a-form-item>
                    <!-- 外语语种 -->
                    <a-form-item
                      v-show="val.IsEdit && val.Column == 'Wyyzdm'"
                      :label="val.Explain"
                      :label-col="{ span: 8 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-select
                        placeholder="请选择"
                        v-decorator="
                          WithDecorator(val.Column, val.IsRequired, val.Explain)
                        "
                      >
                        <a-select-option :value="''" :key="'0'"
                          >请选择</a-select-option
                        >
                        <a-select-option
                          v-for="item in getEnumByKey('WYYZDM')"
                          :value="item.Value"
                          :key="item.NameC"
                          >{{ item.NameC }}</a-select-option
                        >
                      </a-select>
                    </a-form-item>
                    <!-- 民族语言答卷 -->
                    <a-form-item
                      v-show="val.IsEdit && val.Column == 'Mzyydj'"
                      :label="val.Explain"
                      :label-col="{ span: 8 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-select
                        placeholder="请选择"
                        v-decorator="
                          WithDecorator(val.Column, val.IsRequired, val.Explain)
                        "
                      >
                        <a-select-option :value="''" :key="'0'"
                          >请选择</a-select-option
                        >
                        <a-select-option
                          v-for="item in getEnumByKey('MZYYDJ')"
                          :value="item.Value"
                          :key="item.NameC"
                          >{{ item.NameC }}</a-select-option
                        >
                      </a-select>
                    </a-form-item>
                    <!-- 毕业类别代码 -->
                    <a-form-item
                      v-show="val.IsEdit && val.Column == 'Bylbdm'"
                      :label="val.Explain"
                      :label-col="{ span: 8 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-select
                        placeholder="请选择"
                        v-decorator="
                          WithDecorator(val.Column, val.IsRequired, val.Explain)
                        "
                      >
                        <a-select-option :value="''" :key="'0'"
                          >请选择</a-select-option
                        >
                        <a-select-option
                          v-for="item in getEnumByKey('BYLBDM')"
                          :value="item.Value"
                          :key="item.NameC"
                          >{{ item.NameC }}</a-select-option
                        >
                      </a-select>
                    </a-form-item>
                    <!-- 不编辑 -->
                    <a-form-item
                      :label="val.Explain"
                      :label-col="{ span: 8 }"
                      :wrapper-col="{ span: 12 }"
                      v-show="!val.IsEdit"
                    >
                      <span
                        v-decorator="
                          WithDecorator(val.Column, val.IsRequired, val.Explain)
                        "
                        >{{ queryParam.Byxxdm }}</span
                      >
                    </a-form-item>
                    <!-- input -->
                    <a-form-item
                      :label-col="{ span: 8 }"
                      :wrapper-col="{ span: 12 }"
                      :label="val.Explain"
                      v-show="
                        val.Column == 'Yzbm' ||
                          val.Column == 'Lxr' ||
                          val.Column == 'Bz1' ||
                          val.Column == 'Bz2' ||
                          val.Column == 'Bz3'
                      "
                    >
                      <a-input
                        v-decorator="
                          WithDecorator(val.Column, val.IsRequired, val.Explain)
                        "
                        placeholder="请输入"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-col>
            </a-form>
            <a-col :span="6">
              <img
                :src="Datadetails.Photo_File_Url"
                style="height: 120px;width: 100px"
              />
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12" style="text-align: right;">
              <a-button type="primary">取消</a-button>
            </a-col>
            <a-col :span="12" style="text-align: left;">
              <a-button type="primary" @click="handleOk">提交</a-button>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import API from "@/api";

import { GetdistionaryNameC,getEnumByKey } from "@/utils/hbUtils";
import { pick } from "lodash";
import { WithDecorator } from "@/utils/util";
import moment from "moment";
export default {
  data() {
    return {
      labelAlignleft: "left",
      queryParam: {},
      form: this.$form.createForm(this),
      Datadetails: [],
      DynamicTableFields: this.$DynamicTableFields,
    };
  },
  computed: {
    GetnameC() {
      return function(zd, val) {
        let name = GetdistionaryNameC(zd, val);
        return name;
      };
    },
    GetStateColor() {
      return function(zd, val) {
        let name = GetdistionaryNameC(zd, val);
        if (name == "未报名") {
          return "pink";
        } else if (name == "待审核") {
          return "blue";
        } else if (name == "不通过") {
          return "red";
        } else {
          return "green";
        }
      };
    },
  },
  mounted() {
    this.$router.onReady(() => {
      if (
        this.$route.query.ExamStudentId !== undefined &&
        this.$route.query.ExamStudentId != null
      ) {
        this.$http
          .post(API.getmodelbyid, {
            id: this.$route.query.ExamStudentId,
          })
          .then((res) => {
            this.Datadetails = res;
            this.GetSchool(res.School_Id);
            this.setFormValues(res);
          });
      }
    });
  },
  methods: {
    moment,
    WithDecorator,
    getEnumByKey,
    GetSchool(id) {
      this.$http
        .post(API.GetSchoolList, {
          SchoolId: [id],
          PageIndex: 1,
          PageSize: 10,
        })
        .then((res) => {
          res.Data && (this.queryParam.Byxxdm = res.Data[0].XXDM);
        });
    },
    // 设置编辑时页面的值
    setFormValues(record) {
      const row = {
        ...record,
        Csrq: record.Csrq ? moment(new Date(record.Csrq), "YYYY-MMM-DD") : null,
        Is_Apply_Exempt_Examination: record.Is_Unsuitable_Exercise,
      };
      this.$nextTick(() => {
        setTimeout(() => {
          this.form.setFieldsValue(
            pick(
              row,
              "Is_Apply_Exempt_Examination",
              "Sf_Ssmz",
              "Sf_Gq_Hqzn",
              "Sf_Twj",
              "Sf_Lzzn",
              "Sf_Jr_Xf",
              "Sf_Ga_Jw",
              // 动态字段
              "Zzmm",
              "Csrq",
              "Byxxdm",
              "Wyyzdm",
              "Mzyydj",
              "Bylbdm",
              "Yzbm",
              "Lxr",
              "Bz1",
              "Bz2",
              "Bz3"
            )
          );
        }, 500);
      });
    },
    handleOk() {
      // 动态表单数据回调处理
      const {
        form: { validateFields },
      } = this;
      validateFields((errors, Value) => {
        if (!errors) {
          console.log(Value.Is_Apply_Exempt_Examination);
          this.$http
            .post(API.studentreport, {
              model: {
                Id: this.$route.query.ExamStudentId,
                Examination_Code: this.Datadetails.Examination_Code,
                Student_Id: this.Datadetails.School_Id,
                School_Id: this.Datadetails.School_Id,
                School_Name: this.Datadetails.School_Name,
                Name: this.Datadetails.Name,
                Nation_Code: this.Datadetails.Nation_Code,
                Grade_Id: this.Datadetails.Grade_Id,
                Grade_Name: this.Datadetails.Grade_Name,
                Class_Id: this.Datadetails.Class_Id,
                Class_Name: this.Datadetails.Class_Name,
                Id_Number: this.Datadetails.Id_Number,
                Sex: this.Datadetails.Sex,
                Student_Status: this.Datadetails.Student_Status,
                Phone: this.Datadetails.Phone,
                Body_Exam_Number: this.Datadetails.Body_Exam_Number,
                Current_Address_Detail: this.Datadetails.Current_Address_Detail,
                Headmaster_Name: this.Datadetails.Headmaster_Name,
                Headmaster_Phone: this.Datadetails.Headmaster_Phone,
                Is_Unsuitable_Exercise: Value.Is_Unsuitable_Exercise,
                Is_Apply_Exempt_Examination: Value.Is_Apply_Exempt_Examination.toString(),
                // 动态字段
                Zzmm: Value.Zzmm,
                Csrq: Value.Csrq,
                Byxxdm: Value.Byxxdm,
                Wyyzdm: Value.Wyyzdm,
                Mzyydj: Value.Mzyydj,
                Bylbdm: this.queryParam.Byxxdm,
                Yzbm: Value.Yzbm,
                Lxr: Value.Lxr,
                Bz1: Value.Bz1,
                Bz2: Value.Bz2,
                Bz3: Value.Bz3,
              },
            })
            .then((res) => {
              this.$message.success("保存成功");
              this.$router.push({
                name: "kssignup",
              });
            });
        } else {
        }
      });
    },
    onChange(date, dateString) {
      this.queryParam.Csrq = dateString;
    },
  },
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
  padding: 0 10px;
  width: 88px;
  height: 40px;
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
