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
                      label="学籍号"
                      :label-col="{ span: 4 }"
                      :wrapper-col="{ span: 16 }"
                    >
                      <span>{{ Datadetails.Student_Status }}</span>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="考生类别"
                      :label-col="{ span: 6 }"
                      :wrapper-col="{ span: 16 }"
                    >
                      <a-select
                        placeholder="请选择"
                        v-decorator="[
                          'Examinee_Type_Code',
                          {
                            rules: [
                              { required: true, message: '考生类别必选!' },
                            ],
                          },
                        ]"
                      >
                        <a-select-option value="FRESHSTUDENT"
                          >应届</a-select-option
                        >
                        <a-select-option value="PAST">往届</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="考生联系电话"
                      :label-col="{ span: 8 }"
                      :wrapper-col="{ span: 16 }"
                    >
                      <span>{{ Datadetails.Phone }}</span>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="体考号"
                      :label-col="{ span: 6 }"
                      :wrapper-col="{ span: 18 }"
                    >
                      <span>{{ Datadetails.Body_Exam_Number }}</span>
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
                      label="是否少数民族考生"
                      :label-col="{ span: 20 }"
                      :wrapper-col="{ span: 4 }"
                    >
                      <a-switch
                        defaultChecked
                        checkedChildren="是"
                        unCheckedChildren="否"
                        v-decorator="['Sf_Ssmz']"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="是否归侨、华侨子女考生:"
                      :label-col="{ span: 20 }"
                      :wrapper-col="{ span: 4 }"
                    >
                      <a-switch
                        defaultChecked
                        checkedChildren="是"
                        unCheckedChildren="否"
                        v-decorator="['Sf_Gq_Hqzn']"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="是否台湾籍考生:"
                      :label-col="{ span: 20 }"
                      :wrapper-col="{ span: 4 }"
                    >
                      <a-switch
                        defaultChecked
                        checkedChildren="是"
                        unCheckedChildren="否"
                        v-decorator="['Sf_Twj']"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="是否烈士子女考生:"
                      :label-col="{ span: 20 }"
                      :wrapper-col="{ span: 4 }"
                    >
                      <a-switch
                        defaultChecked
                        checkedChildren="是"
                        unCheckedChildren="否"
                        v-decorator="['Sf_Lzzn']"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <a-form-item
                      label="是否享受优待现役军人（消防员）、一至四级因公伤残军人（消防员）子女考生:"
                      :label-col="{ span: 18 }"
                      :wrapper-col="{ span: 4 }"
                    >
                      <a-switch
                        defaultChecked
                        checkedChildren="是"
                        unCheckedChildren="否"
                        v-decorator="['Sf_Jr_Xf']"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <date-picker />
                  </a-col>
                </a-row>
                <!-- 动态字段 -->
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
import { GetdistionaryNameC, getEnumByKey } from "@/utils/hbUtils";
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
    console.log(this.DynamicTableFields);
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
            console.log(res,'res')
            this.Datadetails = res;
            this.GetSchool(res.School_Id);
            this.$nextTick(()=>{
              this.setFormValues(res);
            })
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
        Examinee_Type_Code: record.Examinee_Type_Code,
      };
      this.$nextTick(() => {
        setTimeout(() => {
          this.form.setFieldsValue(
            pick(
              row,
              "Examinee_Type_Code",
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
          console.log(Value);
          this.$http
            .post(API.studentreport, {
              model: {
                Id: this.$route.query.ExamStudentId,
                Examination_Code: this.Datadetails.Examination_Code,
                School_Name: this.Datadetails.School_Name,
                School_Id: this.Datadetails.School_Id,
                Student_Id: this.Datadetails.School_Id,
                Name: this.Datadetails.Name,
                Nation_Code: this.Datadetails.Nation_Code,
                Grade_Id: this.Datadetails.Grade_Id,
                Grade_Name: this.Datadetails.Grade_Name,
                Class_Id: this.Datadetails.Class_Id,
                Class_Name: this.Datadetails.Class_Name,
                Id_Number: this.Datadetails.Id_Number,
                Sex: this.Datadetails.Sex,
                Student_Status: this.Datadetails.Student_Status,
                Examinee_Type_Code: Value.Examinee_Type_Code,
                Phone: this.Datadetails.Phone,
                Body_Exam_Number: this.Datadetails.Body_Exam_Number,
                Current_Address: this.Datadetails.Current_Address,
                Current_Address_Detail: this.Datadetails.Current_Address_Detail,
                Sf_Ssmz: Value.Sf_Ssmz.toString(),
                Sf_Gq_Hqzn: Value.Sf_Gq_Hqzn.toString(),
                Sf_Twj: Value.Sf_Twj.toString(),
                Sf_Lzzn: Value.Sf_Lzzn.toString(),
                Sf_Jr_Xf: Value.Sf_Jr_Xf.toString(),
                Sf_Ga_Jw: Value.Sf_Ga_Jw.toString(),
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
            .then(() => {
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
