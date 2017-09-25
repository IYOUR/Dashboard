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
	data () {
		return {
			parkduration: null,
		}
	},
	mounted () {
		this.parkduration = echarts.init(document.getElementById('parkduration'));
		let parkduration_op = {
			title : {
				text: '历史完成停车总次数',
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


		this.parkduration.setOption(parkduration_op);
	},
    methods:{

    },	  
}
</script>



