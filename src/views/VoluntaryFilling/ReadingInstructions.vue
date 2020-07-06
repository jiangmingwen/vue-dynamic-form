<template>
	<div class='mainBox'>
		<!-- <a-row>
			<a-col :span="24">
				<div v-html="GeneralRules"></div>
			</a-col>
		</a-row>
		<a-row>
			<a-col :span="24" >
				<a-button type="primary" @click='navtoCandidate' >请仔细阅读</a-button>
			</a-col>
		</a-row> -->
		<a-card :bordered="false" class="comBgcolor">
			<div v-if="GeneralRules !== ''" v-html="GeneralRules" style="margin-bottom:70px;"></div>
			<div v-else style="text-align:center;margin-top:100px;">暂无数据</div>
			<div class="footer">
				<a-button v-if="times === 0" type="primary" size="large" @click="handOk">我已阅读，确定</a-button>
				<a-button v-else size="large">我已阅读，确定{{ times }}</a-button>
			</div>
		</a-card>

	</div>
</template>

<script>
	import API from "@/api";
	import {setSession } from '@/utils/hbUtils.js'
	import {
		GetdistionaryNameC
	} from "@/utils/hbUtils";
	export default {
		data() {
			return {
				GeneralRules: '',
				times: 0,
				obj:{}
			}
		},
		mounted() {

			this.$http.get(API.getmodelbysectionenum, {
				sectiontype: '34'
			}).then(res => {
				console.log(res)
				if (res) {
					this.GeneralRules = res.GeneralRules
					this.times = Number(res.readseconds);
					this.obj = res
					this.timesFn();
				} else {
					this.$message.warning('志愿填报未开始');
				}

			});

			// this.$http.post(API.getmodelbyexaminationcode, {
			// 	examinationcode: Year_Id,
			// 	yearcode: Code
			// }).then((res) => {
			// 	console.log(res)
			// 	if (res) {
			// 		this.ReadingNotes = res.ReadingNotes
			// 	}

			// })
		},
		methods: {
			timesFn() {
			  const vm = this;
			  const times = setInterval(() => {
			    if (vm.times <= 0) {
			      clearInterval(times);
			      return;
			    }
			    vm.times--;
			  }, 1000);
			},
			handOk() {
				this.$router.push({
					name: 'candidate',
					query:{
						examinationRecordCode:this.obj.examinationCode,
						RecordCode:this.obj.RecordCode,//招生记录code,
					    EntranceSectionCode:this.obj.EntranceSectionCode,//学段code
						EnrollmentName:this.obj.EnrollmentName,//招生名称,
					}
				})
				 // setSession('obj',this.obj)
			}
		}
	}
</script>
<style lang="less" scoped>
	.mainBox {
		width: 1200px;
		height: 600px;
		margin: 0 auto;
		margin-top: 64px;
		padding-top: 50px;
		text-align: center;
	}

	.comBgcolor {
		position: relative;
		min-height: 600px;
	}

	.footer {
		text-align: center;
		position: absolute;
		left: calc(50% - 35px);
		bottom: 30px;
	}
</style>
