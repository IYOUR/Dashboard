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
import DateFormat from '../../util/formatDate.js';
export default {
  	name: 'parkcar',
	props: ['parkcarInfo'],
	data () {
		return {
			parkTimesInfo: null,
			finishParkInfo: null,
		}
	},
    watch: {
        'parkcarInfo':{
            deep:true,
            handler:function(newVal,oldVal){
				if(newVal.inoutCar.length>0&&newVal.history.length>0){
					this.createCharts(newVal)
				}
            }
        }
	},
	mounted () {
		//this.createCharts(this.parkcarInfo)
	},
    methods:{
		inoutCar_filter(item) {
			return item.data.map((ele)=> {
				//iDT Show的数据 等比放大1.5倍
				switch (item.type) {
					case 'ins':
						return parseInt(ele.ins*1.5);
						break;   
					case 'outs':
						return parseInt(ele.outs*1.5);
						break;  
					case 'ctime':
						return DateFormat.format(DateFormat.formatToDate (ele.ctime), 'MM-dd');
						break;                                                                                                                                                            
				}
			});
		},
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
						return parseInt(ele[ele.length-1].count*1.5)
						break;  
					case 'ctime':
						return DateFormat.format(DateFormat.formatToDate (ele[ele.length-1].ctime), 'yyyy-MM')
						break;                                                                                                                                                            
				}
			});
		},		
		createCharts(data) {
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
					x: 80,
					x2: 40,
					borderWidth: 0,
					width: '75%'
				},
				tooltip : {
					trigger: 'axis'
				},
				legend: {
					data:['进车次数','出车次数'],
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
						},					
						data : this.inoutCar_filter({data:data.inoutCar,type:'ctime'})
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
						name:'进车次数',
						type:'line',
						clickable: false,
						symbol: 'none',
						smooth:true,
						itemStyle: {
							normal: {
								color: 'rgba(30,220,240,0.8)',
								areaStyle: {
									type: 'default',
									color: 'rgba(14, 241, 242, 0.5)'
								}
							}
						},
						data:this.inoutCar_filter({data:data.inoutCar,type:'ins'})
					},
					{
						name:'出车次数',
						type:'line',
						clickable: false,
						symbol: 'none',
						smooth:true,
						itemStyle: {
							normal: {
								color: '#248AE9',
								areaStyle: {
									type: 'default',
									color: 'rgba(30,121,213,0.65)'
								}
							}
						},
						data:this.inoutCar_filter({data:data.inoutCar,type:'outs'})
					}
				]
			},

			finishPark_op = {
				title : {
					text: '历史累计进出车总次数',
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
					x: 85,
					x2: 40,
					y2:65,
					borderWidth: 0,
					width: '75%'
				},
				tooltip : {
					trigger: 'axis'
				},
				legend: {
					show: false,
					data:['进出车数'],
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
						data : this.history_filter({data:data.history,type:'ctime'})
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
						name:'进出车数',
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
						data:this.history_filter({data:data.history,type:'count'})
					}
				]
			};		

			this.parkTimesInfo.setOption(parkTimes_op);
			this.finishParkInfo.setOption(finishPark_op);			
		}
    },	  
}
</script>



