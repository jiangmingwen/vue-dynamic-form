<template>
  <div>
    <div class="comPadding">
      <div class="lineset">
        <div>
          <div class="spanicon"></div>
          <div class="linesettitletext">报名学校：开州区实验中学</div>
        </div>
      </div>
      <div class="mainBox">
       <a-tag
          :color="GetStateColor('BeExaminationStudent_Sing_Up_Status_Enum',Datadetails.Sing_Up_Status,'BeExaminationStudent_Audit_Status_Enum',Datadetails.Audit_Status)"
        >{{GetnameC('BeExaminationStudent_Sing_Up_Status_Enum',Datadetails.Sing_Up_Status,'BeExaminationStudent_Audit_Status_Enum',Datadetails.Audit_Status) }}</a-tag>
        <div class="connatbox">
          <a-row>
            <a-form :form="form" :labelAlign="labelAlignleft">
              <a-col :span="18">
                <a-row>
                  <a-col :span="12">
                    <a-form-item label="姓名" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
                      <span>{{Datadetails.Name}}</span>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="民族" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
                      <span>{{GetnameC('MZ',Datadetails.Nation_Code)}}</span>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item label="年级" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
                      <span>{{Datadetails.Grade_Name}}</span>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="班级" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
                      <span>{{Datadetails.Class_Name}}</span>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item label="身份证件号" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
                      <span>{{Datadetails.Id_Number}}</span>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="性别" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
                      <span>{{GetnameC('XB',Datadetails.Sex)}}</span>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item label="学籍号" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
                      <span>{{Datadetails.Student_Status}}</span>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="考生类别" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
                      <span>{{GetnameC('EnumTestType',Datadetails.Examinee_Type_Code)}}</span>
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
                      <span>{{Datadetails.Phone}}</span>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="体考号" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
                      <span>{{Datadetails.Body_Exam_Number}}</span>
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
                      <span>{{Datadetails.Current_Address}}{{Datadetails.Current_Address_Detail}}</span>
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
                      <span>{{Datadetails.Sf_Ssmz =='TRUE'?'是':'否'}}</span>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="是否归侨、华侨子女考生"
                      :label-col="{ span: 18 }"
                      :wrapper-col="{ span: 6 }"
                    >
                      <span>{{Datadetails.Sf_Gq_Hqzn =='TRUE'?'是':'否'}}</span>
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
                      <span>{{Datadetails.Sf_Twj =='TRUE'?'是':'否'}}</span>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="是否烈士子女考生"
                      :label-col="{ span: 18 }"
                      :wrapper-col="{ span: 6 }"
                    >
                      <span>{{Datadetails.Sf_Lzzn =='TRUE'?'是':'否'}}</span>
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
                      <span>{{Datadetails.Sf_Jr_Xf =='TRUE'?'是':'否'}}</span>
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
                      <span>{{Datadetails.Sf_Ga_Jw =='TRUE'?'是':'否'}}</span>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <a-form-item label="审核备注" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                      <span>{{Datadetails.Audit_Remarks }}</span>
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-col>
            </a-form>
            <a-col :span="6">
              <img :src="Datadetails.Photo_File_Url" style="height: 120px;width: 100px" />
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="18" style="text-align: center;">
              <a-button type="primary" @click="handleOk">确认</a-button>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import API from "@/api";
import { GetdistionaryNameC } from "@/utils/hbUtils";
export default {
  data() {
    return {
      labelAlignleft: "left",
      form: this.$form.createForm(this),
      Datadetails: []
    };
  },
  computed: {
    //根据返回的code，从字典取中文nameC
    GetnameC() {
      return function(zd, val, zd1, val1) {
        let nameval = "";
        let name = GetdistionaryNameC(zd, val);
        let audit_status = GetdistionaryNameC(zd1, val1);
        if (zd1) {
          if (name == "已报名") {
            if (audit_status == "未审核") {
              nameval = "未审核";
            } else if (audit_status == "不通过") {
              nameval = "不通过";
            } else if (audit_status == "通过") {
              nameval = "通过";
            }
          } else {
            nameval = "未报名";
          }
          return nameval;
        }else{
           return name;
        }  
      };
    },
    GetStateColor() {
      return function(zd, val, zd1, val1) {
        let name = GetdistionaryNameC(zd, val);
        let audit_status = GetdistionaryNameC(zd1, val1);
        if (name == "已报名") {
          if (audit_status == "未审核") {
            return "blue";
          } else if (audit_status == "不通过") {
            return "red";
          } else if (audit_status == "通过") {
            return "green";
          }
        } else {
          return "pink";
        }
      };
    }
  },
  mounted() {
    this.$router.onReady(() => {
      if (
        this.$route.query.ExamStudentId !== undefined &&
        this.$route.query.ExamStudentId != null
      ) {
        this.$http
          .post(API.getmodelbyid, {
            id: this.$route.query.ExamStudentId
          })
          .then(res => {
            this.Datadetails = res;
          });
      }
    });
  },
  methods: {
    handleOk() {
      this.$router.push({
        name: "kssignup"
      });
    }
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
