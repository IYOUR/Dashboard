<style lang="less" rel="stylesheet/less">
body {
  margin: 0;
}
body::-webkit-scrollbar {
    display: none;
}
#container {
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 1920px;
    height: 1080px;
	-webkit-box-sizing: border-box;
	box-sizing: border-box; 
	padding:15px;
    background-image:url(./assets/background.jpg);
    background-size:contain;
    transform: scale(1);
    transform-origin: left top 0px;
    display: -webkit-flex; 
    display: flex;
    flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	.left-layout{
		height:1050px;
		width:466px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: space-between;		
		.top{
			width: auto;
			height: 700px;
			background-size:contain;
			background-image:url(./assets/border_bg@2x.png);	
		}
		.bottom{
			width: auto;
			height: 340px;
			background-size:contain;
			background-image:url(./assets/border_bg@1x.png);
		}		
	}
	.middle-layout{
		height:1050px;
		width:939px;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;	
		align-items: center;			
		.head{
			width: 939px;
			height: 81px;
			text-align: center;
			background-size:contain;
			background-image:url(./assets/border_head.png);		
			p{
				font-family: MicrosoftYaHei;
				font-size: 28px;
				color: #B3CDE6;
				letter-spacing: 3.23px;
				margin: 0 auto;
    			line-height: 81px;
			}	
		}	
		.situation_wrap{
			width: 846px;
			height: 916px;
			//background: #333;
			.situation{
				height: 270px;
				//background: #222;
			}
			.map{
				height: 646px;
				//background: #777;
			}			
		}		
	}
	.right-layout{
		height: 1050px;
		width: 466px;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: space-between;	
		.top{
			width: auto;
			height: 340px;
			background-size:contain;
			background-image:url(./assets/border_bg@1x.png);			
		}
		.bottom{
			width: auto;
			height: 700px;
			background-size:contain;
			background-image:url(./assets/border_bg@2x.png);	
		}								
	}		
}
</style>

<template>
    <div id="container">
		<div class="left-layout">
			<div class="top"></div>
			<div class="bottom"></div>
		</div>			
		<div class="middle-layout">
			<div class="head">
				<p>艾润物联全国停车场实时数据监控</p>
			</div>	
			<div class="situation_wrap">
				<div class="situation">
					<situation></situation>
				</div>		
				<div class="map">
					<chinamap></chinamap>
				</div>	
			</div>				
		</div>
		<div class="right-layout">
			<div class="top"></div>
			<div class="bottom"></div>		
		</div>
    </div>
</template>

<script>
import situation from './components/situation'
import chinamap from './components/chinamap'
export default {
    name: 'app',
    data () {
		return{

		}
    },
    computed:{
		contentSize () {
			return {
			width: document.body.clientWidth,
			height: document.body.clientHeight
			}  
		}
    },
    mounted () {
    	this.reszie();
		// window.onresize=() => {
		// 	console.log(this.contentSize)
		// };		
    },
    methods:{
		reszie () {
			let container = document.getElementById("container"),ratio = this.contentSize.width/1920;
			container.style.transform=`scale(${ratio})`;
			document.body.style.height=`${ratio*1080}px`;
		}
    },
    components: {
        situation,
		chinamap,
    }	
}
</script>


