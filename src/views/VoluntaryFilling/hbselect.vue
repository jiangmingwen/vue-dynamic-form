<template>
  <div>
    <Select
      allowClear
      showSearch
      optionFilterProp="children"
      placeholder="请选择"
      style='width: 200'
      @change='handleChange'
      @focus='handleChangeVal'
      getPopupContainer={triggerNode => triggerNode.parentNode}notFoundContent={this.state.dataList.length == 0 ? <Spin size="small" /> : null}
      disabled={false}
    >
      {
        (this.state.dataList || []).map((item,index)=>{
          return <Option key={index} value={item.code}>{item.name}</Option>
        })
      }
    </Select>
  </div>
</template>
<script>
	import { Select, Spin } from 'antd';
	const Option = Select.Option;
export default {
  props: {
    vmodelval:{
       type: String
    },
    rowdata:{
 type:null
    }
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
	  handleChange(){
		  
	  },
		  
	  handleChangeVal(){
	  }
  }
};
</script>
<style lang="less" scoped>
</style>