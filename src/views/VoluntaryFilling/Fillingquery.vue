<template>
  <div style="background-color:#fff;height:100%">
    <div class="mainBox">
      <div class="lineset">
        <div>
          <div class="spanicon"></div>
          <div class="linesettitletext">基本信息</div>
          <a-form :form="form" labelAlign="left" style="min-height: 300px;">
            <a-col :span="20">
              <a-row>
                <a-col :span="8">
                  <a-form-item label="姓 名" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
                    <span>{{Datadetails.Name}}</span>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="民 族" :label-col="{ span: 4}" :wrapper-col="{ span: 16 }">
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
                  <a-form-item label="班 级" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
                    <span>{{Datadetails.Class_Name}}</span>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="8">
                  <a-form-item label="身份证号码" :label-col="{ span: 7}" :wrapper-col="{ span: 16 }">
                    <span>{{Datadetails.Id_Number}}</span>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="出生日期" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
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
              <img
                :src="getZP(Datadetails.Photo_File)"
                style="height: 120px;margin-top: 20px;"
                alt="照片不存在"
              />
            </a-col>
          </a-form>
        </div>
      </div>
    </div>
    <div class="mainBox">
      <div class="lineset">
        <div class="spanicon"></div>
        <div class="linesettitletext">志愿信息</div>
        <a-collapse
          :expandIconPosition="right"
          size="mini"
          v-for="(item,index) in getdata"
          :key="index"
          defaultActiveKey="1"
          class="marginbuttom10"
        >
          <a-collapse-panel key="1">
            <span slot="header">
              {{item.batchName}}
              <span class="header-right-text-remark">{{item.batchRemark}}</span>
            </span>
            <div v-for="n in item.volunteerCategorie" :key="n.id">
              <div class="linesets">
                <div>
                  <a-row>
                    <a-col :span="12">
                      <div class="spanicons"></div>
                      <div class="linesettitletexts">{{n.name}}</div>
                      <div class="linesettitletexts" v-if="n.navigation">({{n.navigation}})</div>
                    </a-col>
                    <a-col :span="12" style=" text-align: right;" v-if="n.isOpenDeploy">
                      <div class="linesettitletexts">愿否调配:{{n.Is_Seployment===true?'是':'否'}}</div>
                    </a-col>
                  </a-row>
                </div>
              </div>
              <a-table
                :columns="columns"
                :dataSource="n.volunteerCategorie"
                size="small"
                :rowKey="n => n.id"
                :pagination="false"
                defaultExpandAllRows
                :rowClassName="rowClassNamefun"
              >
                <span slot="isFill" slot-scope="text,record">{{record.isFill==true?'填报':'不填报'}}</span>
                <span slot="tbxx" slot-scope="text,record">{{record.school}}</span>
                <span slot="major" slot-scope="text,record">{{record.major}}</span>
              </a-table>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </div>
  </div>
</template>
<script>
import API from "@/api";
import {
  GetdistionaryNameC,
  getBirthdayByIdcard,
  selectvolunteerreport,
  getGatewayValue
} from "@/utils/hbUtils";

export default {
  data() {
    return {
      ossSite: this.getGatewayValue("OSS_Extranet_URL"),
      Datadetails: [],
      getdata: [],
      visible: false,
      modemultiple: "default",
      columns: [
        {
          title: "志愿名称",
          dataIndex: "name",
          key: "name",
          scopedSlots: {
            customRender: "name"
          },
          align: "center"
        },
        {
          title: "是否填报",
          dataIndex: "isFill",
          key: "isFill",
          scopedSlots: {
            customRender: "isFill"
          },
          align: "center"
        },
        {
          title: "填报学校",
          dataIndex: "tbxx",
          key: "tbxx",
          scopedSlots: {
            customRender: "tbxx"
          },
          align: "center",
          width: 300
        },
        {
          title: "专业",
          dataIndex: "major",
          key: "major",
          scopedSlots: {
            customRender: "major"
          },
          align: "center",
          width: 300
        }
      ],
      schoollist: [], //学校list
      majorllist: [], //专业list
      FillinModel: {
        ...this.getvalmodel,
        volunteerInfos: []
      },
      num: 0,
      bon_batch_obj: {
        bon_batch_code: [],
        isFill: ""
      }
    };
  },
  computed: {
    GetnameC() {
      return function(zd, val) {
        console.log(zd, val);
        let name = GetdistionaryNameC(zd, val);
        return name;
      };
    },

    rowClassNamefun() {
      return function(row) {
        if (!row.volunteerCategorie) {
          return "noExpand";
        }
      };
    }
  },
  mounted() {
    this.$router.onReady(() => {
      // this.$http
      //   .post(API.selectvolunteerreport, {
      //     requestParam: {
      //       sectionCode: this.$route.query.EntranceSectionCode,
      //       recoredCode: this.$route.query.RecordCode
      //     }
      //   })
      //   .then(res => {
      //     this.getdata = res.volunteerReport;
      //   });
      if (this.$route.query.EntranceSectionCode) {
        this.$http
          .post(API.selectvolunteerreport, {
            requestParam: {
              sectionCode: this.$route.query.EntranceSectionCode,
              recoredCode: this.$route.query.RecordCode
            }
          })
          .then(res => {
            this.getdata = res.volunteerReport;
          });
        this.$http
          .get(API.getStudentInfo, {
            recoredCode: this.$route.query.RecordCode
          })
          .then(res => {
            this.Datadetails = res;
          });
      }
    });
  },
  methods: {
    getGatewayValue,
    getZP(src) {
      if (src) {
        return this.ossSite + "/" + src + "?width=120&height=120";
      }
      return null;
    },
    handleChangessss(val, row) {
      console.log(val);
    },
    getBirthdayByIdcard,
    setstate(data) {
      let flag = true;
      data.forEach((e, index) => {
        if (!flag) {
          return;
        }
        e.zdyindex = this.num++;
        if (e.volunteerCategorie && e.volunteerCategorie.length) {
          this.setstate(e.volunteerCategorie);
        } else {
          e.state = false;
          e.zdyindex = this.num++;
        }
      });
      return data;
    },
    onChange(val, row) {
      event.stopPropagation();
      this.ruleisAllowWrite(
        this.getdata,
        val,
        row.batchCode,
        "isAllowWrite",
        "batchCode"
      ); //是否填报志愿
      this.FillinModel.volunteerInfos = [];
      console.log("--", this.getdata);
    },
    showModal() {
      this.composeData(this.getdata);
      //let n = document.getElementsByClassName("borderred");
      // let m = document.getElementsByClassName("xred");
      // if (n && n.length ||m && m.length ) {
      //   this.$message.error("请选择必填项");
      // } else {
      //   this.senddate(this.getdata);
      //   this.visible = true;
      // }

      //let arr = this.senddate(this.getdata);
      // console.log(this.FillinModel.volunteerInfos);
      // this.FillinModel.volunteerInfos = this.forData(
      //   this.getdata,
      //   this.FillinModel.volunteerInfos
      // );
      // this.$http
      //   .post(API.volunteerinsert, {
      //     model: {
      //       ...this.FillinModel
      //     }
      //   })
      //   .then(res => {
      //     console.log(res);
      //     this.visible = true;
      //   });
    },
    hideModal() {
      this.visible = false;
    },
    forData(data, data2) {
      let arr1 = [];
      let arr2 = [];
      if (data2.length >= data.length) {
        arr1 = data;
        arr2 = data2;
      } else {
        arr1 = data2;
        arr2 = data;
      }
      arr2.forEach(n => {
        arr1.forEach(e => {
          if (n.batchCode === e.batchCode) {
            n.volunteer_batch_id = e.batchCode;
            n.volunteer_batch_name = e.batchName;
            n.is_register = e.isAllowWrite;
            n.remarks = e.batchRemark;
          }
        });
      });
      return data2.length >= data.length ? arr2 : arr1;
    },
    //填报和不填报
    handleselectChange(val, row) {
      this.FillinModel.volunteerInfos = [];
      this.ruleValidate(this.getdata, val);
      this.isAllowWritefun(this.getdata, this.bon_batch_obj);
      this.$forceUpdate();
    },
    //填报和不填报递--处理数据
    ruleValidate(data, val) {
      let flag = true;
      data.forEach(e => {
        if (!flag) {
          return;
        }
        if (e.volunteerCategorie && e.volunteerCategorie.length) {
          this.ruleValidate(e.volunteerCategorie, val);
        } else {
          if (val == "0") {
            if (
              e.bon_batch_code != undefined &&
              e.bon_batch_code &&
              e.bon_batch_code.length
            ) {
              return (this.bon_batch_obj = {
                bon_batch_code: this.removearrfun(
                  e.bon_batch_code,
                  this.bon_batch_obj.bon_batch_code
                ),
                isFill: val
              });
            }
            if (val.zdyindex === e.zdyindex) {
              e.school = "";
              e.major = "";
              e.state = false;
            }
          } else {
            if (
              e.bon_batch_code != undefined &&
              e.bon_batch_code &&
              e.bon_batch_code.length
            ) {
              return (this.bon_batch_obj = {
                bon_batch_code: this.addarrfun(
                  this.bon_batch_obj.bon_batch_code,
                  e.bon_batch_code
                ),
                isFill: val
              });
            }
          }
        }
      });
      return data;
    },
    //根据互相排斥重置是否填报
    isAllowWritefun(data, val) {
      /**
       * 1、拿到val相排斥的数组
       * 2、查看整个data数组中是否存在这个数组里存在的code
       * 3、置灰该code的最上层list
       * *
       **/
      console.log(this.bon_batch_obj.bon_batch_code);
      let flag = true;
      data.forEach(e => {
        val.bon_batch_code.forEach(n => {
          console.log("---", n);
          if (!flag) {
            return;
          }
          if (e.volunteerCategorie && e.volunteerCategorie.length) {
            // if (val.isFill === '0') {
            // 	if (e.batchCode == n) {
            // 		e.isAllowWrite = true;
            // 	}
            // } else {
            // 	if (e.batchCode == n) {
            // 		e.isAllowWrite = false;
            // 	}
            // }
            if (e.batchCode == n && val.isFill === "0") {
              e.isAllowWrite = true;
            } else {
              e.isAllowWrite = false;
            }
            this.ruleisAllowWrite(e.volunteerCategorie, val);
          } else {
          }
        });
      });
      return data;
    },
    //数组方法
    addarrfun(arr1, arr2) {
      //let arr = []
      // let jj = arr1.filter(item => arr2.has(item)) //先求两个数组的交际
      let hj = Array.from(new Set([...arr1, ...arr2])); //合集
      //let diff = arr2.filter(item => !arr1.has(item)) //差集
      return hj;
    },
    //数组方法
    removearrfun(arr1, arr2) {
      console.log(arr1, arr2);
      let diff = arr1.filter(item => !arr2.has(item)); //差集
      return diff;
    },
    senddate(data, valobj) {
      let flag = true;
      data.forEach(e => {
        if (!flag) {
          return;
        }
        if (e.isAllowWrite) {
          if (e.volunteerCategorie && e.volunteerCategorie.length) {
            let valobj = {
              batch_type_code: e.typeCode,
              batch_type_name: e.name,
              is_seployment: e.isOpenDeploy
            };

            this.senddate(e.volunteerCategorie, valobj);
          } else {
            if (e.isFill === "1" && e.school && e.major) {
              e.state = false;
              this.FillinModel.volunteerInfos.push({
                batchCode: e.batchCode, ///批次code
                batch_type_code: valobj.batch_type_code, //批次分类cod
                batch_type_name: valobj.batch_type_name, // 批次分类名称
                is_seployment: valobj.is_seployment, //是否愿意调配,
                volunteer_code: e.categoryCode, //志愿code
                volunteer_name: e.name, //志愿name
                is_fill: e.isFill, //（是否填报）,
                school_key: e.school,
                // school_name: this.getname(this.schoollist, e.school),
                // major_name: this.getname(this.majorllist, e.school),
                major_code: e.major
              });
            } else {
              e.state = true;
            }
          }
        }
      });
      this.$forceUpdate();
      return data;
    },
    //组合提交数据
    composeData(data) {
      let res = [];
      data.forEach(item => {
        if (item.isAllowWrite) {
          let obj = {};
          // "Volunteer_Batch_Id": "string",志愿填报批次id
          // "Volunteer_Batch_Name": "string",志愿填报批次name
          // "Batch_Rules_Code": "string",批次规则code
          // "Is_Register": true,是否报考
          // "Batch_Type_Code": "string",批次分类code
          // "Batch_Type_Name": "string",批次分类name
          // "Is_Seployment": true,是否愿意调配
          // "Volunteer_Code": "string",志愿名称code
          // "Volunteer_Name": "string",志愿名称name
          // "Is_Fill": true,是否填报
          // "School_Key": "string",填报学校key
          // "School_Name": "string",填报学校name
          // "Major_Name": "string",申报专业name
          // "Major_Code": "string",申报专业code
          // "Remarks": "string"备注
          //第一层能取到的数据
          debugger;
          obj["Volunteer_Batch_Id"] = item.batchCode;
          obj["Volunteer_Batch_Name"] = item.batchName;
          obj["Remarks"] = item.batchRemark;
          obj["Is_Seployment"] = item.isOpenDeploy;
          obj["Is_Register"] = item.isAllowWrite;
          //第二层能取到的数据
          item.volunteerCategorie?.forEach(e => {
            obj["Batch_Type_Name"] = e.name;
            e.volunteerCategorie?.forEach(a => {
              let objRes = {};
              obj["Batch_Rules_Code"] = a.batch_rules_code;
              obj["Batch_Type_Code"] = a.typeCode;
              obj["Volunteer_Code"] = a.categoryCode;
              obj["Volunteer_Name"] = a.name;
              obj["Is_Fill"] = a.isFill;
              obj["School_Key"] = a.school.key;
              obj["School_Name"] = a.school.label;
              obj["Major_Code"] = a.major?.key;
              obj["Major_Name"] = a.major?.label;
              Object.assign(objRes, obj);
              if (a.isFill && a.school) {
                a.state = false;
                res.push(objRes);
              } else {
                a.state = true;
              }
            });
          });
        }
      });
      this.FillinModel.volunteerInfos = res;
    },
    // getname(arr, code) {
    // 	for (const i in arr) {
    // 		if (arr[i].Code == code) {
    // 			return arr[i].Name;
    // 		}
    // 	}
    // },
    ruleisAllowWrite(data, val, code, name, gz) {
      let flag = true;
      data.forEach(e => {
        if (!flag) {
          return;
        }
        if (e.volunteerCategorie && e.volunteerCategorie.length) {
          if (e[gz] == code) {
            e[name] = val;
          }
          this.ruleisAllowWrite(e.volunteerCategorie, val, code, name, gz);
        } else {
          if (e[gz] == code) {
            e[name] = val;
          }
        }
      });
      return data;
    },
    //选择学校或者专业
    handleChangeVal(val, record, name) {
      this.$http
        .get(API.dropdowndatalist, {
          batch_rules_code: record.batch_rules_code
          //School(单选), Single(单选), Multiple(双选)
        })
        .then(res => {
          if (res.ComponentSelectType === "Multiple") {
            this.modemultiple = "multiple";
          } else {
            this.modemultiple = "default";
          }
          this[name] = res.items;
        });
    },
    //切换学校后清空专业，让专业重选
    handleclickVal(val, val2, record, type) {
      if (type === "SCHOOL") {
        this.ruleisAllowWrite(
          this.getdata,
          "",
          record.zdyindex,
          "major",
          "zdyindex"
        );
        this.$forceUpdate();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.mainBox {
  width: 1200px;
  min-height: 140px;
  margin: 0 auto;
  margin-top: 64px;
}

/deep/ .ant-form label {
  font-size: 16px;
}

/deep/ .ant-form-item-control {
  font-size: 16px;
}
/deep/ .noExpand {
  .ant-table-row-expand-icon {
    display: none;
  }

  tr.ant-table-expanded-row,
  tr.ant-table-expanded-row {
    display: none;
  }
  .header-right-text-remark {
    margin-left: 70px;
    font-size: 12px;
    color: gray;
  }
}
.linesets {
  height: 50px;
  line-height: 50px;
  text-align: left;
  position: relative;
}

.linesettitletexts {
  display: inline-block;
  text-indent: 14px;
  font-size: 14px;
}

.spanicons {
  width: 4px;
  height: 20px;
  display: inline-block;
  background-color: #009999;
  position: absolute;
  margin: 0 auto;
  position: absolute;
  top: 33%;
  left: 0%;
}

.textcenter {
  text-align: center;
  margin: 20px 0px;
}

/deep/ .noExpand {
  .ant-table-row-expand-icon {
    display: none;
  }

  tr.ant-table-expanded-row,
  tr.ant-table-expanded-row {
    display: none;
  }
}

.marginbuttom10 {
  margin-bottom: 10px;
}

.xred {
  color: red;
}
.xred1 {
  color: red;
}
/deep/ .borderred {
  .ant-select-selection {
    border: 1px solid red;
  }
}
.header-right-text-remark {
  margin-left: 70px;
  font-size: 12px;
  color: gray;
}
</style>
