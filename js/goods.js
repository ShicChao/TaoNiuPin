require.config({
	paths : {
		"jquery" : "jquery",
        "ajax" : "ajax",
        "cookie" : "jquery.cookie",
        "sport" : "sport"
	}
})
require(["jquery","ajax","cookie","sport"],function(){
	var oBox=document.getElementById("taoNiu_4");
	var oBox3=document.getElementById("taoNiu_8");
	//获取上下ul
	var oUl_t=document.getElementById("top");
	var oUl_b=document.getElementById("ul2");
	//获取左右按钮
	var oBtnL=document.getElementById("btn_l");
	var oBtnR=document.getElementById("btn_r");
	//获取所有图片
	var oBigPic=oUl_t.getElementsByTagName("li");
	var oSmallPic=oUl_b.getElementsByTagName("li");
	//获取遮罩层
	var oMark=document.getElementById("Mark");
	//获取小框
	var oFloat=document.getElementById("float");
		
	//获取右边大图的元素
	var oBox2=document.getElementById("taoNiu_5");
	var oUl_y=document.getElementById("ul3")
	var oYouPic=oUl_y.getElementsByTagName("li");

	//轮播图效果
	//添加点击事件
	var nowPic=0;
	oBtnL.onclick=function(){
		if(nowPic<=0){
			return;
		}else{
			nowPic--;
			init();
			init1();
		}
	}
	oBtnR.onclick=function(){				
		if(nowPic>=oSmallPic.length-1){
			return;
		}else{
			nowPic++;
			init();
			init1();
		}
	}
	
	//给小图绑定点击事件
	for(var i=0;i<oSmallPic.length;i++){
		oSmallPic[i].index=i;
		oSmallPic[i].onclick=function(){
			nowPic=this.index;
			init();
			init1();
		}				
	}
	
	//封装运动函数
	var zIndex=0;
	function init(){
		//大图跟着点击的小图变化
		oBigPic[nowPic].style.zIndex =  ++zIndex;
		//小图位置变化
		if(nowPic==0){
			sport(oUl_b,{left:0})
		}else if(nowPic==1){
			sport(oUl_b,{left:0})
		}else if(nowPic==oSmallPic.length-1){
			sport(oUl_b,{left:-(oSmallPic.length-4)*oSmallPic[0].offsetWidth})
		}else if(nowPic==oSmallPic.length-2){
			sport(oUl_b,{left:-(oSmallPic.length-4)*oSmallPic[0].offsetWidth})
		}else{
			sport(oUl_b,{left:-(nowPic-2)*oSmallPic[0].offsetWidth})
		}
	}
	//右边放大图片封装方法
	var zIndex1=0;
	function init1(){
		//大图跟着点击的小图变化
		oYouPic[nowPic].style.zIndex =  ++zIndex1;
	}
	
	//放大镜效果
	//鼠标事件
	oMark.onmouseover=function(){
		oFloat.style.display="block";
		oBox2.style.display="block"
	}
	oMark.onmouseout=function(){
		oFloat.style.display="none";
		oBox2.style.display="none"
	}
			
	oMark.onmousemove=function(evt){
		var evt=evt||window.event;
		var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
		//获取滑块中心坐标
		var l= evt.clientX- oBox.offsetLeft- oUl_t.offsetLeft-oBox3.offsetLeft - oFloat.offsetWidth /2;
		var h= evt.clientY- oBox.offsetTop -oUl_t.offsetTop- oBox3.offsetTop- oFloat.offsetHeight/2 + scrollTop;
		
		//设置边界
		if(l<0){
			l = 0;
		}else if(l>oMark.offsetWidth-oFloat.offsetWidth){
			l=oMark.offsetWidth-oFloat.offsetWidth;
		}					
		if(h<0){
			h=0;
		}else if(h>oMark.offsetHeight-oFloat.offsetHeight){
			h=oMark.offsetHeight-oFloat.offsetHeight;
		}
		//滑块跟随鼠标移动
		oFloat.style.left=l+"px";
		oFloat.style.top=h+"px"
	
		//滑块在小图上的滑动比例(当前left值 / 滑块在小图上的滑动范围)
		var percentX = l / (oMark.offsetWidth - oFloat.offsetWidth);
		var percentY = h / (oMark.offsetHeight - oFloat.offsetHeight);
		
		//滑动系数 * 大图在其所在Div中的移动范围
		oYouPic[nowPic].style.left = percentX * (oUl_y.offsetWidth - oYouPic[0].offsetWidth) + "px";
		oYouPic[nowPic].style.top =  percentY * (oUl_y.offsetHeight - oYouPic[0].offsetHeight) + "px";
	}
	
	//点击商品边框变色，并选中
	var aaa=0;
	var oGoods=$("#taoNiu_6 ul li");
	$.each(oGoods, function(index,value){
		$(value).click(function(){
			oGoods.css("border-color","#ccc");
			oGoods.removeAttr("class");
			$(this).css("border-color","#e63955");
			$(this).attr("class","oli");
			aaa=1;
		})		
	});
	
	
	
	
	//加载已有的购物车信息
	loadCart();
				
	//给购物车按钮加一个点击事件
	$("#buy").click(function(){
		location.href = "buy.html";
	})
	
	//给加入购物车按钮添加点击事件
	$("#add").click(function(e){
		//获取商品的id（用来区分不同的商品）
		var goodId = $(".oli img").attr("id");
		//获取商品的名称
		var goodName = $(".oli span").html();
		//获取商品的价格
		var goodPrice = 139;
		//获取商品的图片src
		var goodSrc = $(".oli img").attr("src");
//		document.cookie = "key=value"
		//存到购物车中去，商品信息统一可以放在cookie当中
		//购物车中是否有商品？
		//购物车中是否加过同一个商品？
		//"sp1,香蕉,30,1,src1:sp2,苹果,40,2,src2:sp3,梨,50,3,str3"

		//获取cookie中的信息
		//如果cookie中没有信息会返回一个undefined ,我所须是一个字符串类型的数据，所以将它转成一个“”空字符串。保持数据类型一致。
		var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
		//将字符串转成对象
		var cartObj = convertCartStrToObj(cartStr);
		//判断该商品是否已经在购物车中存在
		if(goodId in cartObj){
			//如果已存在，那么该商品的数量加1
			cartObj[goodId].num += 1;
		}else{
			//如果不存在，那么将新商品的信息存入
			cartObj[goodId] = {
				name : goodName,
				price : goodPrice,
				num : 1,
				src : goodSrc
			};
		}
		if(aaa==1){
			//将新的购物车信息存回cookie
			//将对象转为字符串
			cartStr = convertObjToCartStr(cartObj);
			//存入cookie
			//document.cookie = "key=value"
			$.cookie("cart",cartStr,{expires : 7,path:"/"});
					
			$("#buy").val(function(index,v){
				//"购物车（0）"
				var pattern = /(\d+)/;
				var num = parseInt(v.match(pattern)[1]);
				return "购物车(" + (num + 1) + ")";
			});
		}else{
			return;
		}
	})
})


function convertCartStrToObj(cartStr){
	//"sp1,香蕉,30,1,src1:sp2,苹果,40,2,src2:sp3,梨,50,3,str3"
	//如果是空字符串，即没有购物车信息，那么购物车为空，直接返回一个空对象
	if(!cartStr){
		return {};
	}
	var goods = cartStr.split(":");
	var obj = {};
	for(var i = 0; i < goods.length; i ++){
		var data = goods[i].split(",");
		//以商品的id为健，商品的其他信息为值，这个值也设计为一个对象
		obj[data[0]] = {
			name : data[1],
			price : parseFloat(data[2]),
			num : parseInt(data[3]),
			src : data[4]
		}
	}
	return obj;
}
function convertObjToCartStr(obj){
	/* {
	 * 	sp1 : {
	 * 		name : "香蕉",
		 * price : 30,
		 * num : 1,
		 * src : "img/1.jpg"
	 * },
	 * sp2 :{
		 * 	name :"苹果",
		 * price : 40,
		 * num:2,
		 * src : "img/2.jpg"
	 * },
	 * sp3{
		 * 	name : "梨"，
		 * price : 50,
		 * num : 3,
		 * src : "img/3.jpg"
	 * }
	 * }
	 */
	var cartStr = "";
	//遍历对象
	for(var id in obj){
		if(cartStr){
			cartStr += ":";
		}
		//"sp1,香蕉,30,1,src1:sp2,苹果,40,2,src2:sp3,梨,50,3,str3"
		cartStr += id + "," + obj[id].name + "," + obj[id].price + "," + obj[id].num + "," + obj[id].src;
	}
	return cartStr;
}

//加载购物车中的信息（使商品页与购物车页中的购物车数量同步）
function loadCart(){
	var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
		var cartObj = convertCartStrToObj(cartStr);
		//获取到购物车中所有商品的数量
		var total = 0;
		for(var id in cartObj){
			total += cartObj[id].num;
		}
		$("#buy").val("购物车(" + total + ")");
}
