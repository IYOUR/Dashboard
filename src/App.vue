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
			.situation{
				height: 270px;
			}
			.map{
				height: 646px;
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
			<div class="top">
				<parkcar :parkcarInfo="parkcarInfo"></parkcar>
			</div>
			<div class="bottom">
				<parkduration :parkdurationInfo="parkdurationInfo"></parkduration>
			</div>
		</div>			
		<div class="middle-layout">
			<div class="head">
				<p>艾润物联全国停车场实时数据监控</p>
			</div>	
			<div class="situation_wrap">
				<div class="situation">
					<situation :situationInfo="situationInfo"></situation>
				</div>		
				<div class="map">
					<chinamap :chinamapInfo="chinamapInfo"></chinamap>
				</div>	
			</div>				
		</div>
		<div class="right-layout">
			<div class="top">
				<payhistory :payhistoryInfo="payhistoryInfo"></payhistory>
			</div>
			<div class="bottom">
				<coupon :couponInfo="couponInfo"></coupon>
			</div>		
		</div>
    </div>
</template>

<script>
import situation from './components/situation/situation'
import chinamap from './components/situation/chinamap'
import parkcar from './components/situation/parkcar'
import parkduration from './components/situation/parkduration'
import payhistory from './components/situation/payhistory'
import coupon from './components/situation/coupon'

const ReconnectingWebSocket = require('./util/ReconnectingWebSocket');
export default {
    name: 'app',
    data () {
		return{
			contentSize:{
				width: document.body.clientWidth,
				height: document.body.clientHeight
			},		
			ws: null,
			parkcarInfo: {
				inoutCar: [],
				history: []
			},
			couponInfo: {
				trendData: [],
				history: []
			},
			situationInfo: {
				pay_sum: '0',
				parking: '0',
				space_ratio: '0',
				space_ratio_max: '0'
			},
			payhistoryInfo: [],
			parkdurationInfo: [],
			chinamapInfo: {
				park:{
					park_count: '0',
					space_total: '0',
				},
				data: {
					gps: [],
					status: '',
				}
			}
		}
    },
    // computed:{
	// 	contentSize () {
	// 		return {
	// 		width: document.body.clientWidth,
	// 		height: document.body.clientHeight
	// 		}  
	// 	}
    // },
    mounted () {
		//日期显示	
    	this.reszie();
		this.socket();
		window.onresize=() => {
			this.contentSize = {
				width: document.body.clientWidth,
				height: document.body.clientHeight				
			}
		};	
    },
	watch: {
        'contentSize':{
            handler:function(newVal,oldVal){
				this.reszie();	
            }
        }
	},
    methods:{
		//重新计算内容显示高度以及缩放比例
		reszie () {
			let container = document.getElementById("container"),ratio = this.contentSize.width/1920;
			container.style.transform=`scale(${ratio})`;
			document.body.style.height=`${ratio*1080}px`;
		},
		socket() {
			if (window.WebSocket){
				//this.ws = new ReconnectingWebSocket('ws://180.97.80.42:8793/ws');
				this.ws = new ReconnectingWebSocket('ws://idata.parkingwang.com:8793/ws');
			} else {
				console.log("This browser does not support WebSocket.");
			}
			this.ws.onopen = ()=>{
			
			};      
			this.ws.onmessage = (event) => {
				//console.log(event.data)
				let info = JSON.parse(event.data)
				if(info.type_id === 0){
					this.situationInfo = {
						pay_sum: info.data.pay_sum,
						parking: info.data.parking,
						space_ratio: info.data.space_ratio,
						space_ratio_max: info.data.space_ratio_max
					};
					this.chinamapInfo.park.park_count = info.data.park_count;	
					this.chinamapInfo.park.space_total = info.data.space_total;	
				
					if(info.data.gps && info.data.status){
						this.chinamapInfo.data.gps = info.data.gps.split(',');
						this.chinamapInfo.data.status = info.data.status;
					}							
				}				
				if(info.type_id === 1){
					this.parkcarInfo.inoutCar = info.data;
				}
				if(info.type_id === 2){
					this.parkcarInfo.history = info.data;
				}
				if(info.type_id === 3){
					this.parkdurationInfo = info.data;
				}
				if(info.type_id === 4){
					this.payhistoryInfo = info.data;
				}	
				if(info.type_id === 5){
					this.couponInfo.trendData = info.data;
				}	
				if(info.type_id === 6){
					this.couponInfo.history = info.data;
				}																				
			};
			this.ws.onerror =(event) => {
				console.log(event);
			}; 
			this.ws.onclose =(event) => {
				console.log('close');
			};    
		},		

    },
	beforeDestroy () {
		this.ws.onclose();
		this.ws = null;
	},	  	
    components: {
        situation,
		chinamap,
		parkcar,
		parkduration,
		payhistory,
		coupon,
    }	
}
</script>


