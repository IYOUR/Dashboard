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
		<div id="payhistory" style="width:100%; height:100%;"></div>
	</div>
</template>

<script>
import echarts from 'echarts/src/echarts';
import 'echarts/src/chart/bar';
export default {
  	name: 'payhistory',
	data () {
		return {
			payhistory: null,
		}
	},
	mounted () {
		this.payhistory = echarts.init(document.getElementById('payhistory'));
		let payhistory_op = {
			title : {
				text: '历史在线支付订单数增长趋势',
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
				data:['支付订单数'],
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
					name:'支付订单数',
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
					itemStyle: {
						normal: {
							color: '#87bdf3',
							areaStyle: {
								type: 'default',
								color: '#87bdf3'
							}
						}
					},
					data:[10, 12, 21, 54, 260, 830, 710]
				}
			]
		};	


		this.payhistory.setOption(payhistory_op);
	},
    methods:{

    },	  
}
</script>



