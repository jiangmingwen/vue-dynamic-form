<template>
  <div>
    <a-form :form="form" labelAlign="left" style="min-height: 400px;padding:20px">
      <a-col :span="20">
        <a-row style="margin-top:10px;">
          <a-col :span="24">
            <a-form-item label="考试报名状态:" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
              <span>
                <a-tag
                  class="atag"
                  :color="GetStateColor('BeExaminationStudent_Sing_Up_Status_Enum',Datadetails.Sing_Up_Status)"
                >{{GetnameC('BeExaminationStudent_Sing_Up_Status_Enum',Datadetails.Sing_Up_Status)}}</a-tag>
                <span
                  class="spanborder"
                >{{Datadetails.ExamName}}考试。考试时间：{{Datadetails.Examination_Start_Time}}</span>
              </span>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
            <a-form-item label="姓 名" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
              <span>{{Datadetails.Name}}</span>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="民 族" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
              <span>{{GetnameC('MZ',Datadetails.Nation_Code)}}</span>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
            <a-form-item label="毕业学校" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
              <span>{{Datadetails.School_Name}}</span>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="年 级" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
              <span>{{Datadetails.Grade_Name}}</span>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="班 级" :label-col="{ span: 4}" :wrapper-col="{ span: 16 }">
              <span>{{Datadetails.Class_Name}}</span>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
            <a-form-item label="身份证号码" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">
              <span>{{Datadetails.Id_Number}}</span>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="出生日期" :label-col="{ span:6 }" :wrapper-col="{ span: 16 }">
              <span>{{getBirthdayByIdcard(Datadetails.Id_Number,'-')}}</span>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="性 别" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
              <span>{{GetnameC('XB',Datadetails.Sex)}}</span>
            </a-form-item>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="4">
        <img :src="getZP(Datadetails.Photo_File)" style="height: 120px" alt="照片不存在" />
      </a-col>
    </a-form>
    <a-row>
      <a-col :span="24" class="auttomclass">
        <a-checkbox @change="onChange" v-model="acheckboxval">确定信息无误</a-checkbox>
        <a-button type="primary" @click="zytb" :disabled="!acheckboxval">志愿填报</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import API from "@/api";
import { getSession } from "@/utils/hbUtils.js";
import {
  GetdistionaryNameC,
  getBirthdayByIdcard,
  getGatewayValue
} from "@/utils/hbUtils";
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      acheckboxval: false,
      Datadetails: [],
      ossSite: this.getGatewayValue("OSS_Extranet_URL")
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
        if (name == "已报名") {
          return "#87d068";
        } else {
          return "pink";
        }
      };
    }
  },
  mounted() {
    this.$router.onReady(() => {
      if (this.$route.query.examinationRecordCode) {
        this.$http
          .get(API.getcurrentstudent, {
            examRecord_code: this.$route.query.examinationRecordCode
          })
          .then(res => {
            if (res == null) {
              this.$message.error("未获取到考生基本信息");
            } else this.Datadetails = res;
          });
      }
    });
  },
  methods: {
    getGatewayValue,
    getBirthdayByIdcard,
    getZP(src) {
      if (src) {
        return this.ossSite + "/" + src + "?width=120&height=120";
      }
      return null;
    },
    onChange(val) {
      this.acheckboxval = val.target.checked;
    },
    zytb() {
      //报名状态
      let baomingStatus = this.Datadetails?.Sing_Up_Status;
      if (!baomingStatus || baomingStatus === "NOENTRY") {
        this.$message.error("未报名考试");
        return;
      }
      if (baomingStatus && this.acheckboxval) {
        let model = {
          num: 1,
          model: {
            operation_type: "Student",
            current_data: "string"
          }
        };
        //将学生数据传入
        Object.assign(model.model, this.Datadetails);
        model.model.Record_Code = this.$route.query.RecordCode;
        model.model.Examination_Code = this.$route.query.EntranceSectionCode;
        model.model.Examination_Name = this.$route.query.EnrollmentName;
        this.$emit("returnval", model);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.mainBox {
  width: 1200px;
  height: 600px;
  margin: 0 auto;
  margin-top: 64px;
  padding-top: 10px;
}

.auttomclass {
  text-align: center;
}

/deep/ .ant-form label {
  font-size: 16px;
}

/deep/ .ant-form-item-control {
  font-size: 16px;
}

/deep/ .ant-tag-pink {
  height: 20px;
  font-size: 12px;
  line-height: 20px;
}

.spanborder {
  display: inline-block;
  height: 30px;
  line-height: 24px;
  background-color: #e6f7ff;
  padding: 2px;
  border: 1px solid #91d5ff;
  border-radius: 5px;
}
</style>
