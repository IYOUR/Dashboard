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
import DateFormat from '../..//util/formatDate.js';
export default {
  	name: 'payhistory',
	props: ['payhistoryInfo'],
	data () {
		return {
			payhistory: null,
		}
	},
    watch: {	
        'payhistoryInfo':{
            deep:true,
            handler:function(newVal,oldVal){
                this.createCharts(newVal)
            }
        }
	},	
	mounted () {

	},
    methods:{
		history_filter(item) {
			//将数据按月分组
			let data = [];
			let idx = 0;
			data[idx] = [item.data[0]];
			for(let i=1;i<item.data.length;i++){
				let t = item.data[i]['ctime'].split('-');
				let f = item.data[i-1]['ctime'].split('-');
				if(t[1]==f[1]){
					data[idx].push(item.data[i]);
				}else{
					idx = idx+1;
					data[idx] = [];
					data[idx].push(item.data[i]);
				}
			}		
			
			//取每个月最后一天的数据
			return data.map((ele,idx)=> {
				switch (item.type) {
					case 'count':
						return ele[ele.length-1].count
						break;  
					case 'ctime':
						return DateFormat.format(DateFormat.formatToDate (ele[ele.length-1].ctime), 'yyyy-MM')
						break;                                                                                                                                                            
				}
			});
		},	 			
		createCharts(data) {
			this.payhistory = echarts.init(document.getElementById('payhistory'));
			let payhistory_op = {
				title : {
					text: '历史在线支付订单数增长趋势',
					x: 'center',
					textStyle: {
						fontFamily: 'MicrosoftYaHei-Bold',
						fontSize: '16',
						color: '#B3CDE6',
						fontStyle: 'normal',					
					}
				},
				grid: {
					x: 80,
					x2: 40,
					y2:60,
					borderWidth: 0,
					width: '75%'
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
							},	
							interval: 'auto',
							rotate: 90,								
						},					
						data : this.history_filter({data:data,type:'ctime'})
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
								color: '#248AE9',
								areaStyle: {
									type: 'default',
									color: 'rgba(30,121,213,0.65)'
								}
							}
						},
						data:this.history_filter({data:data,type:'count'})
					}
				]
			};	
			this.payhistory.setOption(payhistory_op);
		}
    },	  
}
</script>



