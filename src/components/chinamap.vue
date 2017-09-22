<style scoped>

</style>

<template>
  <div id="chinamap" style="width:100%; height:100%;"></div>
</template>

<script>
import echarts from 'echarts';
//import mapData from './util/map'
export default {
  name: 'chinamap',
  data () {
    return {
		  chinamap: null,
    }
  },
  mounted () {
	//this.chinamap = echarts.init(document.getElementById('chinamap'));
	//this.chinamap.showLoading(); 
	// this.$http.get('/iop/parks').then(res => {
	// 	console.log(res)
	// })	
	
  }
}

</script>



