require.config({
	paths : {
		"jquery" : "jquery",
        "ajax" : "ajax",
        "denglu" : "denglu"
	}
})

require(["jquery","ajax","denglu"],function($,ajax,denglu){
	var $Box = $("#taoNiu_6");
	var oCh = document.documentElement.clientHeight;
		
	jiazai();
	
	function jiazai(){			
		$.getJSON("JSON/ZhuYe.json",function(data){			
			$(data).each(function(index,value){
				if(value.youhui){
					if(value.href){						
						$("<ul><li><a href="+ value.href +"><img src='" + value.src + "'/><p>" + value.name + "</p></a><span id='ospan'>今日上新</span><span id='ospan1'>" + value.youhui + "元优惠券免费领取</span><span id='ospan2'>￥<span>" + value.price + "</span></span><span id='ospan3'><span id='ospan3_1'>" + value.discount + "折</span><span id='ospan3_2'>￥" + value.cost + "</span></span><img src='img/tianmao.jpg' id='oimg1'/><p id='op1'>去天猫抢购</p></li></ul>").appendTo($("#taoNiu_6"));						
					}else{
						$("<ul><li><a href='#'><img src='" + value.src + "'/><p>" + value.name + "</p></a><span id='ospan'>今日上新</span><span id='ospan1'>" + value.youhui + "元优惠券免费领取</span><span id='ospan2'>￥<span>" + value.price + "</span></span><span id='ospan3'><span id='ospan3_1'>" + value.discount + "折</span><span id='ospan3_2'>￥" + value.cost + "</span></span><img src='img/tianmao.jpg' id='oimg1'/><p id='op1'>去天猫抢购</p></li></ul>").appendTo($("#taoNiu_6"));												
					}
				}else{
					if(value.href){
						$("<ul><li><a href="+ value.href +"><img src='" + value.src + "'/><p>" + value.name + "</p></a><span id='ospan'>今日上新</span><span id='ospan2'>￥<span>" + value.price + "</span></span><span id='ospan3'><span id='ospan3_1'>" + value.discount + "折</span><span id='ospan3_2'>￥" + value.cost + "</span></span><img src='img/tianmao.jpg' id='oimg1'/><p id='op1'>去天猫抢购</p></li></ul>").appendTo($Box);						
					}else{
						$("<ul><li><a href='#'><img src='" + value.src + "'/><p>" + value.name + "</p></a><span id='ospan'>今日上新</span><span id='ospan2'>￥<span>" + value.price + "</span></span><span id='ospan3'><span id='ospan3_1'>" + value.discount + "折</span><span id='ospan3_2'>￥" + value.cost + "</span></span><img src='img/tianmao.jpg' id='oimg1'/><p id='op1'>去天猫抢购</p></li></ul>").appendTo($Box);												
					}
				}
			})
		})			
	}	
	//当滚动高度+当前可视高度>可视滚动条高度的80%时，加载图片
	$(document).scroll(function(){
		var oTh=$(document).scrollTop();
		var oSh=document.body.scrollHeight ;
		if(oCh+oTh>oSh*0.8){
			jiazai();
		}
	})
	
	//右边浮动框事件
	var $Box_7=$("#taoNiu_7");
	var $img1=$("#img1");
	var $img1=$("#img1");
	var $img2=$("#img2");
	var $img3=$("#img3");
	var $span_1=$("#span_1");
	var $span_2=$("#span_2");
	var $taoNiu_7=$("#taoNiu_7");
	
	$(document).scroll(function(){
		if($(document).scrollTop()>500){
			$Box_7.show();
		}else{
			$Box_7.hide();
		}
	})
	$img1.mouseover(function(){
		$img2.show();
	})
	$span_1.mouseover(function(){
		$img3.show();
	})
	$taoNiu_7.mouseout(function(){
		$img2.hide();
		$img3.hide();
	})
	
	$span_2.click(function(){
		$(document).scrollTop(0);
	})
	
	//顶部悬浮列表
	var $Box_8=$("#taoNiu_8");
	$(document).scroll(function(){
		if($(document).scrollTop()>500){
			$Box_8.show();
		}else{
			$Box_8.hide();
		}
	})
})