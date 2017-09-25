<style scoped lang="less" rel="stylesheet/less">
.wrap{
	width:auto;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;	
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
			margin-top: 27px;
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
			color: #B3CDE6;
			letter-spacing: 0;			
		}		
		.num{
			font-family: HelveticaNeue-Light;
			font-weight: lighter;
			font-size: 60px;
			color: #FFFFFF;
			letter-spacing: 0;
			.unit{
				font-family: MicrosoftYaHei;
				font-size: 20px;
				color: #2273C7;
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
    			left: 50px;
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
				<span class="num">332,617,40<span class="unit">元</span></span>				
			</div>	
			<div class="parkcar">
				<span class="title">当前停车</span></br>
				<hr class="line"></hr> 	
				<span class="num">168,933<span class="unit">辆</span></span>				
			</div>					
		</div>
		<div class="right">
			<div class="time">
				<span>2017年9月5日 星期二 16:00</span>
			</div>
			<div class="pie_warp">
				<div class="out">
					<span class="ratio">62.5%</span></br>
					<span class="title">当前车位占有率</span>
					<hr class="line"></hr> 
				</div>
				<div class="inside">
					<span class="ratio">87.5%</span></br>
					<span class="title">今日最高车位占有率</span>
					<hr class="line"></hr> 				
				</div>			
				<div class="circle_pie">
					<svg width="110" height="110" viewbox="0 0 110 110">
						<circle cx="55" cy="55" r="47" stroke-width="8" stroke="#D1D3D7" fill="none"></circle>
						<circle cx="55" cy="55" r="47" stroke-width="8" stroke="#2798F7" fill="none" transform="matrix(0,-1,1,0,0,110)" stroke-dasharray="0 1069"></circle>
						<circle cx="55" cy="55" r="37" stroke-width="8" stroke="#D1D3D7" fill="none"></circle>
						<circle cx="55" cy="55" r="37" stroke-width="8" stroke="#AA4DC0" fill="none" transform="matrix(0,-1,1,0,0,110)" stroke-dasharray="0 1069"></circle>
					</svg>		
				</div>					
			</div>
		</div>
	</div>
</template>

<script>
export default {
  	name: 'situation',
	data () {
		return {
		}
	},
	mounted () {
		this.circle();
	},
    methods:{
		circle () {
			let	circle1 = document.querySelectorAll("circle")[1],
				circle2 = document.querySelectorAll("circle")[3],
				perimeter1 = Math.PI * 2 * 47,
				perimeter2 = Math.PI * 2 * 37,
				percent1 = 0.625,
				percent2 = 0.875;
			circle1.setAttribute('stroke-dasharray', perimeter1 * percent1 + " " + perimeter1 * (1- percent1));
			circle2.setAttribute('stroke-dasharray', perimeter2 * percent2 + " " + perimeter1 * (1- percent2));
		}
    },	  
}
</script>



