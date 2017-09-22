<style scoped>

</style>

<template>
  <div id="chinamap" style="width:100%; height:100%;"></div>
</template>

<script>
import echarts from 'echarts';
import 'echarts/map/js/china.js';
//import mapData from './util/map'
export default {
	name: 'chinamap',
	data () {
		return {
			chinamap: null,
		}
	},
	mounted () {
		this.chinamap = echarts.init(document.getElementById('chinamap'));
		//this.chinamap.showLoading(); 
		// this.$http.get('/iop/parks').then(res => {
		// 	console.log(res)
		// })	
		this.chinamap.setOption({
			geo: {
				name: '强',
				type: 'scatter',
				map: 'china',
				aspectScale:0.75,
				layoutCenter: ['50%', '50%'],
            	layoutSize: 800,
				label: {
					emphasis: {
						show: false
					}
				},
				itemStyle: {
					normal: {
						areaColor: '#323c48',
						borderColor: '#111'
					},
					emphasis: {
						areaColor: '#2a333d'
					}
				}
			},
			series: [{
				name: '弱',
				type: 'scatter',
				coordinateSystem: 'geo',
				symbolSize: 1,
				large: true,
				itemStyle: {
					normal: {
						shadowBlur: 2,
						shadowColor: 'rgba(37, 140, 249, 0.8)',
						color: 'rgba(37, 140, 249, 0.8)'
					}
				},
				data: []
			}, {
				name: '中',
				type: 'scatter',
				coordinateSystem: 'geo',
				symbolSize: 1,
				large: true,
				itemStyle: {
					normal: {
						shadowBlur: 2,
						shadowColor: 'rgba(14, 241, 242, 0.8)',
						color: 'rgba(14, 241, 242, 0.8)'
					}
				},
				data: []
			}, {
				name: '强',
				type: 'scatter',
				coordinateSystem: 'geo',
				symbolSize: 1,
				large: true,
				itemStyle: {
					normal: {
						shadowBlur: 2,
						shadowColor: 'rgba(255, 255, 255, 0.8)',
						color: 'rgba(255, 255, 255, 0.8)'
					}
				},
				data: []
			}]
		});	
	}
}

</script>



