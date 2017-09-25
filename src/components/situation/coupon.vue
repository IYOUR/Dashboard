<style scoped lang="less" rel="stylesheet/less">
	.wrap{
		height: 100%;
		width: auto;
		padding: 15px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box; 		
		display: flex;
		flex-direction: column;		
		.coupontrend{
			height: 50%;
			width: auto;
		}	
		.couponrank{
			height: 50%;
			width: auto;
		}			
	}
</style>

<template>
	<div class="wrap">
		<div class="coupontrend">
			<div id="coupontrend" style="width:100%; height:100%;"></div>
		</div>
		<div class="couponrank">
			<div id="couponrank" style="width:100%; height:100%;"></div>
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
			coupontrendInfo: null,
			couponrankInfo: null,
		}
	},
	mounted () {
		this.coupontrendInfo = echarts.init(document.getElementById('coupontrend'));
		this.couponrankInfo = echarts.init(document.getElementById('couponrank'));
		let coupontrend_op = {
			title : {
				text: '近7日优惠券发放张数走势',
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
		},

		couponrank_op = {
			title : {
				text: '昨日优惠券发放排行榜',
				x: 'center',
				y: 20,
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
					data : ['周一','周二','周三','周四','周五','周六','周日']
				}				
			],
			series : [
				{
					name:'停车总次数',
					type:'bar',
					clickable: false,
					barCategoryGap: '80%',
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
					data:[10, 12, 21, 54, 260, 830, 710]
				}
			]
		};		

		this.coupontrendInfo.setOption(coupontrend_op);
		this.couponrankInfo.setOption(couponrank_op);
	},
    methods:{

    },	  
}
</script>



