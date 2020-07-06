<template>
	<div style="background-color:#fff;height:100%;">
		<div class="comPadding">
			<div class="lineset">
				<div style="position: relative;">
					<div class="spanicon"></div>
					<div class="linesettitletext">历史报名记录</div>
				</div>
			</div>
		</div>
		<div class="mainBox ">
			<a-table rowKey="Code" :columns="columns" :dataSource="datalist" bordered size="middle" :pagination="paginationfalse">
				<span slot="Type_Code" slot-scope="text">{{GetnameC('EnumTestType',text)}}</span>
				<span slot="Sing_Up_Status" slot-scope="text">{{GetnameC('BeExaminationStudent_Sing_Up_Status_Enum',text)}}</span>
				<span slot="xq" slot-scope="text,record">
					<a @click="navtoxq(GetnameC('EnumTestType',record.Type_Code),record)">详情</a>
				</span>

			</a-table>
		</div>
	</div>
</template>
<script>
	import API from "@/api";
	import {
		GetdistionaryNameC
	} from '@/utils/hbUtils'
	export default {
		data() {
			return {
				title: "",
				typefoor: "",
				paginationfalse: false,
				columns: [{
						title: "考试类型",
						dataIndex: "Type_Code",
						align: "center",
						scopedSlots: {
							customRender: 'Type_Code'
						}
					},
					{
						title: "考试名称",
						dataIndex: "Name",
						align: "center"
					},
					{
						title: "学年",
						dataIndex:"Year_Name",
						align: "center"
					},
					{
						title: "学期",
						dataIndex: "Term_Name",
						align: "center"
					},
					{
						title: "报名时间",
						dataIndex: "Sing_Up_Time",
						align: "center"
					},
					{
						title: "报名状态",
						dataIndex: "Sing_Up_Status",
						align: "center",
						scopedSlots: {
							customRender: 'Sing_Up_Status'
						}
					},
					{
						title: "报名详情",
						dataIndex: "xq",
						align: "center",
						scopedSlots: {
							customRender: 'xq'
						}
					}
				],
				datalist: []
			};
		},
		computed: {
			GetnameC() {
				return function(zd, val) {
          let name =  GetdistionaryNameC(zd, val)
          console.log(name)
          return name
				}
			},
		},
		mounted() {
			this.$http.get(API.getbmlslist).then((res) => {
				this.datalist = res
			})
		},
		methods: {
			navtoxq(val, record) {
				this.$router.push({
					name: val === '体考' ? 'querysignup' : 'queryzksignup',
					query: {
						ExamStudentId: record.ExamStudentId
					}
				});
			}
		}
	};
</script>
<style lang="less" scoped>
	.mainBox {
		box-sizing: border-box;
		width: 1000px;
		height: 800px;
		margin: 0 auto;
	}

	.acradsytle {
		width: 400px;
		height: 200px;
		display: inline-block;
		margin: 10px 50px;
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
