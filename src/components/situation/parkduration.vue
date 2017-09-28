<style scoped lang="less" rel="stylesheet/less">
	.wrap{
		height: 100%;
		width: auto;
		padding: 15px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box; 		
		display: flex;		
	}
</style>

<template>
	<div class="wrap">
		<div id="parkduration" style="width:100%; height:100%;"></div>
	</div>
</template>

<script>
import echarts from 'echarts/src/echarts';
import 'echarts/src/chart/bar';
export default {
  	name: 'parkduration',
	props: ['parkdurationInfo'],
	data () {
		return {
			parkduration: null,
		}
	},
    watch: {
        'parkdurationInfo':{
            deep:true,
            handler:function(newVal,oldVal){
                this.createCharts(newVal)
            }
        }
	},	
	mounted () {
		//console.log(this.parkdurationInfo)
		//this.createCharts(this.parkdurationInfo)

	},
    methods:{
		parkduration_filter(data) {
			return [
				data[0] = data.duration_10m,
				data[0] = data.duration_30m,
				data[0] = data.duration_60m,
				data[0] = data.duration_120m,
				data[0] = data.duration_360m,
				data[0] = data.duration_360m_up,
				data[0] = data.duration_24h_up,
			];
		},		
		createCharts(data) {
			this.parkduration = echarts.init(document.getElementById('parkduration'));			
			let parkduration_op = {
				title : {
					text: '昨日停车时长分布',
					x: 'center',
					textStyle: {
						fontFamily: 'MicrosoftYaHei-Bold',
						fontSize: '16',
						color: '#B3CDE6',
						fontStyle: 'normal',					
					}
				},
				grid: {
					x: 83,
					x2: 30,
					y2:35,
					borderWidth: 0,
					width: '74%'
				},
				tooltip : {
					show: false,
					trigger: 'axis'
				},
				legend: {
					show: false,
					data:['停车总次数']					
				},
				xAxis : [
					{
						type : 'value',
						splitLine: {
							show: false,
							lineStyle: {
								style: 'solid',
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
					}
				],
				yAxis : [
					{
						type : 'category',
						boundaryGap : true,
						axisLine: {
							lineStyle: {
								color: '#B0BEC5'
							}
						},							
						splitLine: {
							show: false,
							lineStyle: {
								style: 'solid',
								color: '#222'
							},
						},
						axisLabel: {
							textStyle: {
								fontFamily: 'MicrosoftYaHei',
								fontSize: '9',
								color: '#B3CDE6',
								fontStyle: 'normal',								
							}	
						},					
						data : ['10分钟以内','30分钟以内','30-60分钟','60-120分钟','120-360分钟','360分钟以上','24小时以上']
					}				
				],
				series : [
					{
						name:'停车总次数',
						type:'bar',
						clickable: false,
						barWidth: '10',
						itemStyle: {
							normal: {
								color: '#2798F7',
								barBorderRadius:[0, 5, 5, 0],
								label: {
									show: true,
									position: 'right',
									textStyle: {  
										fontFamily:'MicrosoftYaHei',  
										fontSize : '10',  
										color : '#B3CDE6',  
									} 								
								}
							},
						},
						data: this.parkduration_filter(data)
					}
				]
			};	
			
			this.parkduration.setOption(parkduration_op);
		}
    },	  
}
</script>



