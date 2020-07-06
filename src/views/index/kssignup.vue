<template>
  <div style="background-color:#fff;height:100%;">
    <div class="comPadding">
      <div class="lineset">
        <div style="position: relative;">
          <div class="spanicon"></div>
          <div class="linesettitletext">考试报名</div>
          <span
            @click="$router.push({ name: 'jl' })"
            style="text-align: right;position: absolute;right: 0px;"
          >
            <a>历史记录</a>
          </span>
        </div>
      </div>
    </div>
    <div class="mainBox" :class="(!ks_list || !ks_list.length) && 'empty'">
      <a-empty description="暂无考试报名信息" v-if="(!ks_list || !ks_list.length)" />
      <a-card
        :hoverable="true"
        class="acradsytle textcenter"
        v-for="(item,index) in ks_list"
        :key="index"
      >
        <div class="stateclass">
          <a-tag
            v-if="!IsExamBeginfun('BeExaminationState',item.IsExamBegin)"
            :color="GetStateColor('BeExaminationStudent_Sing_Up_Status_Enum',item.Sing_Up_Status,'BeExaminationStudent_Audit_Status_Enum',item.Audit_Status)"
          >{{GetnameC('BeExaminationStudent_Sing_Up_Status_Enum',item.Sing_Up_Status,'BeExaminationStudent_Audit_Status_Enum',item.Audit_Status) }}</a-tag>
        </div>
        <b class="fontsize20">{{ GetnameC('EnumTestType',item.Type_Code)}}</b>
        <p>{{item.Name}}</p>
        <p class="textleft">考试科目:{{item.Subject}}</p>
        <p class="textleft">报名开始时间:{{item.Singup_Start_Time}}至{{item.Singup_End_Time}}</p>
        <a-button
          :disabled="IsExamBeginfun('BeExaminationState',item.IsExamBegin)"
          type="primary"
          @click="navtopage(item)"
        >{{IsExamBeginfun1('BeExaminationState',item.IsExamBegin,'BeExaminationStudent_Audit_Status_Enum',item.Audit_Status)}}</a-button>
      </a-card>
    </div>
  </div>
</template>
<script>
import API from "@/api";
import { GetdistionaryNameC } from "@/utils/hbUtils";
export default {
  data() {
    return {
      ks_list: [] //考试报名list
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
        } else {
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
    },
    Getnavtoway() {
      return function(zd, val, zd1, val1) {
        let name = GetdistionaryNameC(zd, val);
        let audit_status = GetdistionaryNameC(zd1, val1);
        if (name == "已报名") {
          if (audit_status == "未审核") {
            return "查看报名信息";
          } else if (audit_status == "不通过") {
            return "修改报名";
          } else if (audit_status == "通过") {
            return "查看报名信息";
          }
        } else {
          return "前往报名";
        }
      };
    },
    IsExamBeginfun() {
      return function(zd, val) {
        let name = GetdistionaryNameC(zd, val);
        if (name === "未开始") {
          return true;
        } else {
          return false;
        }
      };
    },
    IsExamBeginfun1() {
      return function(zd, val, zd1, val1) {
        let name = GetdistionaryNameC(zd, val);
        let audit_status = GetdistionaryNameC(zd1, val1);
        if (name === "未开始") {
          return "未开始";
        } else {
          if (audit_status == "未审核") {
            return "查看报名信息";
          } else if (audit_status == "不通过") {
            return "修改报名";
          } else if (audit_status == "通过") {
            return "查看报名信息";
          }
        }
      };
    }
  },
  mounted() {
    this.$http.post(API.getexaminationandrecordlist, {}).then(res => {
      this.ks_list = res;
    });
  },
  methods: {
    //跳转到体考还是中考
    navtopage(row) {
      console.log(111)
      this.$router.push({
        path: `/signup/${row.Type_Code}`,
        query: {
          Audit_Status: row.Audit_Status,
          Sing_Up_Status: row.Sing_Up_Status,
          ExamStudentId: row.ExamStudentId
        }
      });

      // let state = GetdistionaryNameC(
      //   "BeExaminationStudent_Sing_Up_Status_Enum",
      //   row.Sing_Up_Status
      // );
      // let audit_status = GetdistionaryNameC(
      //   "BeExaminationStudent_Audit_Status_Enum",
      //   row.Audit_Status
      // );
      // let type = GetdistionaryNameC("EnumTestType", row.Type_Code);
      // let name = "";
      // if (state === "已报名") {
      //   if (
      //     audit_status === "未审核" ||
      //     (audit_status === "通过" && type === "体考")
      //   ) {
      //     name = "querysignup";
      //   } else if (
      //     audit_status === "未审核" ||
      //     (audit_status === "通过" && type === "中考")
      //   ) {
      //     name = "queryzksignup";
      //   } else if (audit_status === "不通过" && type === "体考") {
      //     name = "gosignup";
      //   } else if (audit_status === "不通过" && type === "中考") {
      //     name = "gozksignup";
      //   }
      // } else {
      //   if (state === "未报名" && type === "体考") {
      //     name = "gosignup";
      //   } else if (state === "未报名" && type === "中考") {
      //     name = "gozksignup";
      //   }
      // }
      // this.$router.push({
      //   name: name,
      //   query: {
      //     ExamStudentId: row.ExamStudentId
      //   }
      // });
    }
  }
};
</script>
<style lang="less" scoped>
.mainBox {
  box-sizing: border-box;
  width: 1200px;
  height: 800px;
  margin: 0 auto;
  &.empty {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.fontsize20 {
  font-size: 20px;
}
.acradsytle {
  width: 420px;
  height: 240px;
  display: inline-block;
  margin: 10px 50px;
}

.stateclass {
  width: 80px;
  height: 20px;
  line-height: 20px;
  text-align: left;
}

.textcenter {
  text-align: center;
}

.textleft {
  text-align: left;
}

.titleBox {
  color: #1890ff;
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
