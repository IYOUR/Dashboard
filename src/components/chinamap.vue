<style scoped>

</style>

<template>
  <div id="chinamap" style="width:100%; height:100%;"></div>
</template>

<script>
//const echarts = require('echarts');
//require('echarts/chart/map');
//import echarts from '../util/map/echarts.js';
//import '../util/map/map.js';
import echarts from 'echarts/src/echarts';
import 'echarts/src/chart/map';
import placeList from '../util/map/mapData'
export default {
	name: 'chinamap',
	data () {
		return {
			chinamap: null,
		}
	},
	mounted () {
		console.log(echarts)
		this.chinamap = echarts.init(document.getElementById('chinamap'));

		let mapOption = {
			//backgroundColor: '#404a59',
			color: [
				'rgba(255, 255, 255, 0.8)',
				'rgba(14, 241, 242, 0.8)',
				'rgba(37, 140, 249, 0.8)'
			],
			legend: {
				show:false,
				orient: 'vertical',
				x:'left',
				data:['强','中','弱'],
				textStyle : {
					color: '#fff'
				}
			},
			// dataZoom: {
			//     //zommLock: true,
			// },
			series : [
				{
					name: '弱',
					type: 'map',
					mapType: 'china',
					roam: false,
					itemStyle:{
						normal:{
							borderColor:'#111',
							borderWidth:1,
							areaStyle:{
								color: '#323c48'
							}
						},
						emphasis: {
							color: 'rgba(119, 119, 119, 0.4)'
						}
					},
					data : [],
					markPoint : {
						clickable: false,
						symbolSize: 2,
						large: true,
						effect : {
							show: true
						},
						data : (function(){
							var data = [];
							var len = 3000;
							var geoCoord
							while(len--) {
								geoCoord = placeList[len % placeList.length].geoCoord;
								data.push({
									name : placeList[len % placeList.length].name + len,
									value : 10,
									geoCoord : [
										geoCoord[0] + Math.random() * 5 - 2.5,
										geoCoord[1] + Math.random() * 3 - 1.5
									]
								})
							}
							return data;
						})()
					}
				},
				{
					name: '中',
					type: 'map',
					mapType: 'china',
					data : [],
					markPoint : {
						clickable: false,
						symbolSize: 2,
						large: true,
						effect : {
							show: true
						},
						data : (function(){
							var data = [];
							var len = 1000;
							var geoCoord
							while(len--) {
								geoCoord = placeList[len % placeList.length].geoCoord;
								data.push({
									name : placeList[len % placeList.length].name + len,
									value : 50,
									geoCoord : [
										geoCoord[0] + Math.random() * 5 - 2.5,
										geoCoord[1] + Math.random() * 3 - 1.5
									]
								})
							}
							return data;
						})()
					}
				},
				{
					name: '强',
					type: 'map',
					mapType: 'china',
					data : [],
					markPoint : {
						clickable: false,
						symbol : 'diamond',
						symbolSize: 6,
						large: true,
						effect : {
							show: true
						},
						data : (function(){
							var data = [];
							var len = placeList.length;
							while(len--) {
								data.push({
									name : placeList[len].name,
									value : 90,
									geoCoord : placeList[len].geoCoord
								})
							}
							return data;
						})()
					}
				}
			]
		}; 

		this.chinamap.setOption(mapOption)

	}
}

</script>



