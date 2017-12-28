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
import DateFormat from '../..//util/formatDate.js';
export default {
  	name: 'parkcar',
	props: ['couponInfo'],
	data () {
		return {
			coupontrendInfo: null,
			couponrankInfo: null,
		}
	},
    watch: {
        'couponInfo':{
            deep:true,
            handler:function(newVal,oldVal){
                this.createCharts(newVal)
            }
        }
	},	
	mounted () {
		//console.log(this.couponInfo)
	},
    methods:{
		trend_filter(item) {
			let chartLine = Object.assign([], item.data) 
			return chartLine.map((ele)=> {
				switch (item.type) {  
					case 'count':
						return parseInt(ele.count*1.5);
						break;  
					case 'ctime':
						return DateFormat.format(DateFormat.formatToDate (ele.ctime), 'MM-dd');
						break;                                                                                                                                                            
				}
				return ele[item.type];
			});
		},
		history_filter(item) {
			let chartLine = Object.assign([], item.data) 
			return chartLine.map((ele)=> {
				switch (item.type) {
					case 'count':
						return parseInt(ele.count*1.5);
						break;  
					case 'name':
						if(ele.name.length>8){
							return `${ele.name.slice(0, 7)}...`
						} else{
							return ele.name
						}
						break;                                                                                                                                                            
				}
				console.log(ele[item.type])
				return ele[item.type];
			});
		},	
		createCharts(data) {
			this.coupontrendInfo = echarts.init(document.getElementById('coupontrend'));
			this.couponrankInfo = echarts.init(document.getElementById('couponrank'));
			let coupontrend_op = {
				title : {
					text: '近7日优惠券发放张数走势',
					x: 'center',
					textStyle: {
						fontFamily: 'MicrosoftYaHei-Bold',
						fontSize: '16',
						color: '#B3CDE6',
						fontStyle: 'normal',					
					}
				},
				grid: {
					x: 70,
					x2: 40,
					y2:35,
					borderWidth: 0,
					width: '80%'
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
						data : this.trend_filter({data:data.trendData,type:'ctime'})
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
								color: '#248AE9',
								areaStyle: {
									type: 'default',
									color: 'rgba(30,121,213,0.65)'
								}
							}
						},
						data:this.trend_filter({data:data.trendData,type:'count'})
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
					x: 85,
					x2: 40,
					y2:35,
					borderWidth: 0,
					width: '75%'
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
						data : this.history_filter({data:data.history,type:'name'})
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
						data: this.history_filter({data:data.history,type:'count'}).reverse()
					}
				]
			};		

			this.coupontrendInfo.setOption(coupontrend_op);
			this.couponrankInfo.setOption(couponrank_op);
		}
    },	  
}
</script>



