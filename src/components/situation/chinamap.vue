<style scoped lang="less" rel="stylesheet/less">
	.wrap{
		width: 100%;
		height: 100%;
		position: relative;
		.carnum{
			width: 240px;
			height: 60px;
			position: absolute;
			top: 505px;
			left:25px;
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: space-around;
			white-space:nowrap; 
			.line{
				color: #FFFFFF;
				opacity: 0.2;
				margin-left: 30px;
				margin-right: 30px;
			}				
			.num{
				font-family: MicrosoftYaHei;
				font-size: 28px;
				color: #B3CDE6;
				letter-spacing: 0;				
			}	
			.title{
				opacity: 0.8;
				font-family: MicrosoftYaHei;
				font-size: 12px;
				color: #2273C7;
				letter-spacing: 0;	
					
			}	
			.left{
				width: 50%;
				text-align: center;
			}
			.right{
				width: 50%;
				text-align: center;
			}			
		}
	}
</style>

<template>
	<div class="wrap">
		<div class="carnum">
			<div class="left">
				<span class="num">{{parseInt(chinamapInfo.park.park_count *1.5)}}</span></br>
				<span class="title">停车场数量</span>
			</div>
			<hr class="line"></hr>
			<div class="right">
				<span class="num">{{parseInt(chinamapInfo.park.space_total *1.5)}}</span></br>
				<span class="title">车位数</span>			
			</div>
		</div>
  		<div id="chinamap" style="width:100%; height:100%;"></div>	
	</div>
</template>

<script>
//const echarts = require('echarts');
//require('echarts/chart/map');
//import echarts from '../util/map/echarts.js';
//import '../util/map/map.js';
import echarts from 'echarts/src/echarts';
import 'echarts/src/chart/map';
import placeList from '../../util/map/mapData'
//var placeList = [{name:'demo', geoCoord:[0, 0]}];
export default {
	name: 'chinamap',
	props: ['chinamapInfo'],
	data () {
		return {
			chinamap: null,
			iTime: 0,
			isfirst: true,	
		}
	},
    watch: {
        'chinamapInfo.data':{
            deep:true,
            handler:function(newVal,oldVal){
                //console.log(newVal)
				this.handleData(newVal);
            }
        },
        'placeList':{
            deep:true,
            handler:function(newVal,oldVal){
				//console.log(placeList)
				let now = Date.now();  
				if(this.isfirst || (now - this.iTime) > 500) {
					//console.log(placeList)
					this.createMap();
					this.iTime = now;
					this.isfirst = false;
				}; 
            }
        },		
	},	
	mounted () {
		this.chinamap = echarts.init(document.getElementById('chinamap'));
		this.createMap();
	},
	methods: {
		handleData(data) {
			if(data.status == '1'){
				placeList.push({name:"新增",geoCoord:data.gps});
			}
			if(data.status == '2'){
				placeList.forEach((el,index)=>{
					if(JSON.stringify(el.geoCoord) == JSON.stringify(data.gps)){
						placeList.splice(index, 1)
						//console.warn(JSON.stringify(el.geoCoord)+"----"+JSON.stringify(data.gps)+'--'+index+"---"+placeList.length)
					}
				})
			}
		},
		createMap() {
			
			let mapOption = {
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
				series : [
					{
						name: '弱',
						type: 'map',
						mapType: 'china',
						hoverable: false,
						roam: false,
						itemStyle:{
							normal:{
								borderColor:'#1E406D',
								borderWidth:1,
								areaStyle:{
									color: 'rgba(29,38,62, 0.9)'
								}
							},
							emphasis: {
								color: 'rgba(119, 119, 119, 0.1)'
							}
						},
						data : [],
						markPoint : {
							clickable: false,
							symbolSize: 4,
							large: true,
							effect : {
								show: true,
								shadowBlur: 5,
								loop: false,
								period: 3,
							},
							data : (()=>{
								var data = [];
								var len = placeList.length;
								var geoCoord
								while(len--) {
									geoCoord = placeList[len % placeList.length].geoCoord;
									data.push({
										geoCoord : [
											geoCoord[0],
											geoCoord[1]
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
						itemStyle:{
							normal:{
								borderColor:'#1E406D',
								borderWidth:1,
								areaStyle:{
									color: 'rgba(29,38,62, 0.9)'
								}
							},
							emphasis: {
								color: 'rgba(119, 119, 119, 0.1)'
							}
						},					
						data : [],
						markPoint : {
							clickable: false,
							symbolSize: 4,
							large: true,
							effect : {
								show: true,
								shadowBlur: 5,
								loop: false,
								period: 3,								
							},
							data : (()=>{
								var data = [];
								var len = 100;
								var geoCoord
								while(len--) {
									geoCoord = placeList[len % placeList.length].geoCoord;
									data.push({
										geoCoord : [
											geoCoord[0],
											geoCoord[1]
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
						roam: false,
						itemStyle:{
							normal:{
								borderColor:'#1E406D',
								borderWidth:1,
								areaStyle:{
									color: 'rgba(29,38,62, 0.9)'
								}
							},
							emphasis: {
								color: 'rgba(119, 119, 119, 0.1)'
							}
						},					
						data : [],
						markPoint : {
							clickable: false,
							symbol : 'diamond',
							symbolSize: 4,
							large: true,
							effect : {
								show: true,
								shadowBlur: 5,
								loop: false,
								period: 3,								
							},
							data : (()=>{
								var data = [];
								var len = 100;
								var geoCoord
								while(len--) {
									geoCoord = placeList[len % placeList.length].geoCoord;
									data.push({
										geoCoord : [
											geoCoord[0],
											geoCoord[1]
										]
									})
								}
								//console.log(data)
								return data;
							})()
						}
					}
				]
			}; 

			this.chinamap.setOption(mapOption)			
		}
	}
}

</script>



