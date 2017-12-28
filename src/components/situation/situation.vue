<style scoped lang="less" rel="stylesheet/less">
@import '../../util/odometer/odometer-default.css';

.wrap{
	width:auto;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;	
	justify-content: space-between;  
	/*防止chrome浏览器Transition闪动Bug*/  
	-webkit-backface-visibility: hidden;
    -webkit-transform-style: preserve-3d;
	.left{
		width: 50%;
		height: 270px;
		text-align: left;
		display: flex;
		flex-direction: column;				
		.charge{
			width:auto;
			margin-top: 98px;
			.line{
				width: 380px;
				color: #B3CDE6;
				margin-left: 0;
			}
		}
		.parkcar{
			width:auto;
			margin-top: 10px;
			.line{
				width: 280px;
				color: #B3CDE6;
				margin-left: 0;
			}			
		}		
		.title{
			opacity: 0.8;
			font-family: MicrosoftYaHei-Bold;
			font-size: 15px;
			color: #FFFFFF;
			letter-spacing: 0;			
		}		
		.num{
			font-family: HelveticaNeue-Light;
			font-weight: lighter;
			font-size: 60px;
			color: #FFFFFF;
			letter-spacing: 3px;
			white-space:nowrap; 
			.unit{
				font-family: MicrosoftYaHei;
				font-size: 20px;
				color: #FFFFFF;
				letter-spacing: 0;	
				margin-left: 7px;			
			}		
		}				
	}
	.right{
		width: 50%;
		height: 270px;
		display: flex;
		flex-direction: column;		
		.time{
			width: auto;
			height: 24px;
			text-align: right;
			margin-top: 25px;	
			span{
				line-height: 24px;
				font-family: MicrosoftYaHei;
				font-size: 18px;
				color: #4D93DD;
				letter-spacing: 0;			
			}			
		}
		.pie_warp{
			width: auto;
			height: 221px;
			position: relative;
			circle {
				-webkit-transition: stroke-dasharray .25s;
				transition: stroke-dasharray .25s;
			}
			.circle_pie{
				width: 110px;
				height: 110px;
				margin: 53px auto;
			}
			.out{
				text-align: left;
				position: absolute;
				top: 85px;
    			left: 55px;
				.ratio{
					font-family: MicrosoftYaHei;
					font-size: 16px;
					color: #B3CDE6;
					letter-spacing: 0.44px;					
				}
				.title{
					font-family: MicrosoftYaHei;
					font-size: 10px;
					color: #B3CDE6;
					letter-spacing: 0.28px;					
				}
			}
			.inside{
				text-align: right;
				position: absolute;
				top: 60px;
    			left: 250px;
				.ratio{
					font-family: MicrosoftYaHei;
					font-size: 16px;
					color: #B3CDE6;
					letter-spacing: 0.44px;					
				}
				.title{
					font-family: MicrosoftYaHei;
					font-size: 10px;
					color: #B3CDE6;
					letter-spacing: 0.28px;					
				}
			}			
			.line{
				width: 120px;
				color: #B3CDE6;
			}		
		}
	}	
}
</style>

<template>
	<div class="wrap">
		<div class="left">
			<div class="charge">
				<span class="title">今日收入</span></br>
				<hr class="line"></hr> 	
				<span class="num"><span id="charge">000,000</span><span class="unit">元</span></span>				
			</div>	
			<div class="parkcar">
				<span class="title">当前停车</span></br>
				<hr class="line"></hr> 	
				<span class="num"><span id="carnum">000,000</span><span class="unit">辆</span></span>				
			</div>					
		</div>
		<div class="right">
			<div class="time">
				<span>{{currentDate.year}}年{{currentDate.month}}月{{currentDate.day}}日 {{currentDate.week}} {{currentDate.time}}</span>
			</div>
			<div class="pie_warp">
				<div class="out">
					<span class="ratio">{{`${(situationInfo.space_ratio/100).toFixed(2)}%`}}</span></br>
					<span class="title">当前车位占有率</span>
					<hr class="line"></hr> 
				</div>
				<div class="inside">
					<span class="ratio">{{`${(situationInfo.space_ratio_max/100).toFixed(2)}%`}}</span></br>
					<span class="title">今日最高车位占有率</span>
					<hr class="line"></hr> 				
				</div>			
				<div class="circle_pie">
					<svg width="110" height="110" viewbox="0 0 110 110">
						<circle cx="55" cy="55" r="48" stroke-width="7" stroke="rgba(27,68,123,0.3)" fill="none"></circle>
						<circle cx="55" cy="55" r="48" stroke-width="7" stroke="#2798F7" fill="none" transform="matrix(0,-1,1,0,0,110)" stroke-dasharray="0 1069"></circle>
						<circle cx="55" cy="55" r="38" stroke-width="7" stroke="rgba(0,0,0,0)" fill="none"></circle>
						<circle cx="55" cy="55" r="38" stroke-width="7" stroke="rgba(14, 241, 242, 0.7)" fill="none" transform="matrix(0,-1,1,0,0,110)" stroke-dasharray="0 1069"></circle>
					</svg>		
				</div>					
			</div>
		</div>
	</div>
</template>

<script>
const odometer = require('../../util/odometer/odometer');
import DateFormat from '../..//util/formatDate.js';
export default {
  	name: 'situation',
	props: ['situationInfo'],
	data () {
		return {
			currentDate: {
				year: '2017',
				month: '1',
				day: '1',
				week: '星期日',
				time: '00:00',
			},
			chargeEl: null,
			carnumEl: null,
			charge: null,
			carnum: null,
			circleOut: null,
			circleIn: null,
			iTime: 0,
			isfirst: true,
		}
	},
    watch: {
        'situationInfo':{
            deep:true,
            handler:function(newVal,oldVal){
				let now = Date.now();  
				if(this.isfirst || (now - this.iTime) > 3500) {
					//iDT Show的数据 等比放大1.5倍
					this.charge.update(newVal.pay_sum/100*1.5);
					this.carnum.update(newVal.parking*1.5);
					this.circle(newVal);
					this.iTime = now;
					this.isfirst = false;
				}; 
            }
        }
	},	
	mounted () {
		this.showInfo(this.situationInfo);
		this.showDate();
		
		this.circle1 = document.querySelectorAll("circle")[1];
		this.circle2 = document.querySelectorAll("circle")[3];	
		//this.circle(this.situationInfo);	
	},
    methods:{
		circle (data) {
			let perimeter1 = Math.PI * 2 * 48,
				perimeter2 = Math.PI * 2 * 38,
				percent1 = data.space_ratio/10000,
				percent2 = data.space_ratio_max/10000;
			this.circle1.setAttribute('stroke-dasharray', perimeter1 * percent1 + " " + perimeter1 * (1- percent1));
			this.circle2.setAttribute('stroke-dasharray', perimeter2 * percent2 + " " + perimeter1 * (1- percent2));
		},
		//日期显示
		showDate() {
			this.interval= setInterval(() => {
				let date = new Date(),
					weekday = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
					this.currentDate = {
						year: date.getFullYear(),
						month: date.getMonth()+1,
						day: date.getDate(),
						week: weekday[date.getDay()],
						time: DateFormat.format(date, 'hh:mm'),
					};
			}, 1000);	
		},
		showInfo(data) {
			this.chargeEl = document.getElementById('charge');
			this.carnumEl = document.getElementById('carnum');
			this.charge = new Odometer({
				el: this.chargeEl,
				//iDT Show的数据 等比放大1.5倍
				value: data.pay_sum/100*1.5,
				// Any option (other than auto and selector) can be passed in here
				format: '(,ddd)',
				theme: 'default'
			});
			this.carnum = new Odometer({
				el: this.carnumEl,
				value: data.parking*1.5,
				// Any option (other than auto and selector) can be passed in here
				format: '(,ddd)',
				theme: 'default'
			});	
		}
    },
	beforeDestroy () {
		clearInterval(this.interval);
	}			  
}
</script>



