<style scoped lang="less" rel="stylesheet/less">
	.wrap{
		height: 100%;
		width: auto;
		padding: 15px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box; 		
		display: flex;
		flex-direction: column;		
		.parkTimes{
			height: 50%;
			width: auto;
		}	
		.finishPark{
			height: 50%;
			width: auto;
		}			
	}
</style>

<template>
	<div class="wrap">
		<div class="parkTimes">
			<div id="parkTimes" style="width:100%; height:100%;"></div>
		</div>
		<div class="finishPark">
			<div id="finishPark" style="width:100%; height:100%;"></div>
		</div>		
	</div>
</template>

<script>
import echarts from 'echarts/src/echarts';
import 'echarts/src/chart/line';
export default {
  	name: 'parkcar',
	data () {
		return {
			parkTimesInfo: null,
			finishParkInfo: null,
		}
	},
	mounted () {
		this.parkTimesInfo = echarts.init(document.getElementById('parkTimes'));
		this.finishParkInfo = echarts.init(document.getElementById('finishPark'));
		let parkTimes_op = {
			title : {
				text: '近7日进／出车次数走势',
				x: 'center',
				textStyle: {
					fontFamily: 'MicrosoftYaHei-Bold',
					fontSize: '16',
					color: '#B3CDE6',
					fontStyle: 'normal',					
				}
			},
			grid: {
				x: 40,
				x2: 40,
				borderWidth: 0,
				width: '85%'
			},
			tooltip : {
				trigger: 'axis'
			},
			legend: {
				data:['进车数','出车数'],
				y: 'bottom',
				textStyle: {
					fontFamily: 'MicrosoftYaHei',
					fontSize: '9',
					color: '#B3CDE6',
					fontStyle: 'normal',								
				}					
			},
			xAxis : [
				{
					type : 'category',
					boundaryGap : false,
					splitLine: {
						show: true,
						lineStyle: {
							style: 'dashed',
							color: '#222'
						},
					},
					axisLine: {
						lineStyle: {
							color: '#B0BEC5'
						}
					},
					axisLabel: {
						textStyle: {
							fontFamily: 'MicrosoftYaHei',
							fontSize: '9',
							color: '#B3CDE6',
							fontStyle: 'normal',								
						}	
					},					
					data : ['周一','周二','周三','周四','周五','周六','周日']
				}
			],
			yAxis : [
				{
					type : 'value',
					splitLine: {
						show: true,
						lineStyle: {
							color: '#222'
						},
					},	
					axisLine: {
						lineStyle: {
							color: '#B0BEC5'
						}
					},					
					axisLabel: {
						textStyle: {
							fontFamily: 'MicrosoftYaHei',
							fontSize: '9',
							color: '#B3CDE6',
							fontStyle: 'normal',								
						}	
					},
					boundaryGap: [0,0],				
				}
			],
			series : [
				{
					name:'进车数',
					type:'line',
					clickable: false,
					symbol: 'none',
					smooth:true,
					itemStyle: {normal: {areaStyle: {type: 'default'}}},
					data:[10, 12, 21, 54, 260, 830, 710]
				},
				{
					name:'出车数',
					type:'line',
					clickable: false,
					symbol: 'none',
					smooth:true,
					itemStyle: {normal: {areaStyle: {type: 'default'}}},
					data:[30, 182, 434, 791, 390, 30, 10]
				}
			]
		},

		finishPark_op = {
			title : {
				text: '历史完成停车总次数',
				x: 'center',
				y: '20',
				textStyle: {
					fontFamily: 'MicrosoftYaHei-Bold',
					fontSize: '16',
					color: '#B3CDE6',
					fontStyle: 'normal',					
				}
			},
			grid: {
				x: 40,
				x2: 40,
				y2:35,
				borderWidth: 0,
				width: '85%'
			},
			tooltip : {
				trigger: 'axis'
			},
			legend: {
				show: false,
				data:['进车数'],
				y: 'bottom',
				textStyle: {
					fontFamily: 'MicrosoftYaHei',
					fontSize: '9',
					color: '#B3CDE6',
					fontStyle: 'normal',								
				}					
			},
			xAxis : [
				{
					type : 'category',
					boundaryGap : false,
					splitLine: {
						show: true,
						lineStyle: {
							style: 'dashed',
							color: '#222'
						},
					},
					axisLine: {
						lineStyle: {
							color: '#B0BEC5'
						}
					},
					axisLabel: {
						textStyle: {
							fontFamily: 'MicrosoftYaHei',
							fontSize: '9',
							color: '#B3CDE6',
							fontStyle: 'normal',								
						}	
					},					
					data : ['周一','周二','周三','周四','周五','周六','周日']
				}
			],
			yAxis : [
				{
					type : 'value',
					splitLine: {
						show: true,
						lineStyle: {
							color: '#222'
						},
					},	
					axisLine: {
						lineStyle: {
							color: '#B0BEC5'
						}
					},					
					axisLabel: {
						textStyle: {
							fontFamily: 'MicrosoftYaHei',
							fontSize: '9',
							color: '#B3CDE6',
							fontStyle: 'normal',								
						}	
					},
					boundaryGap: [0,0],				
				}
			],
			series : [
				{
					name:'进车数',
					type:'line',
					clickable: false,
					symbol: 'none',
					smooth:true,
					tooltip: {
						show: true,
						axisPointer: {
							type: 'line'
						}
					},
					// markPoint: {
					// 	symbol: 'circle',
					// 	data:[
					// 		{
					// 			coord: ['周日', 710]
					// 		},							
					// 	]
					// },
					itemStyle: {normal: {areaStyle: {type: 'default'}}},
					data:[10, 12, 21, 54, 260, 830, 710]
				}
			]
		};		

		this.parkTimesInfo.setOption(parkTimes_op);
		this.finishParkInfo.setOption(finishPark_op);
	},
    methods:{

    },	  
}
</script>



