require.config({
	paths : {
		"jquery" : "jquery",
        "ajax" : "ajax",
        "cookie" : "jquery.cookie"
	}
})

require(["jquery","ajax","cookie"],function($,ajax,cookie){	
	//注册切换
	$("#span1").click(function(){
		$(this).css("border-bottom","2px solid #e63955");
		$("#span2").css("border-bottom","2px solid #ccc");
	})
	$("#span2").click(function(){
		$(this).css("border-bottom","2px solid #e63955");
		$("#span1").css("border-bottom","2px solid #ccc");
	})
	
	//点击input出边框
	var inp=$("input");
	var inp1=$("#inp1");
	var inp2=$("#inp2");
	var inp3=$("#inp3");
	var inp4=$("#inp4");
	var inp5=$("#inp5");
	var p1=$("#p1");
	var p2=$("#p2");
	var p3=$("#p3");
	var p4=$("#p4");
	var p5=$("#p5");
	var btn= $("#sec");	
	var tijiao=0;	
	var a1=0;
	var a2=0;
	var a3=0;
	var a4=0;
	var a5=0;
	//提交条件
	var iphone=/\d{11}/g;
	var name=/\w{4,}/g;
	var pass=/\w{6,32}/g;
		
	for(var i=0; i<inp.length;i++){
		inp[i].onclick=function(){
			this.parentNode.style.borderColor="#e63955";
		}
	}
	//表单验证
	inp1.blur(function(){
		if(inp1.val() != inp1.val().match(iphone) && inp1.val() != ""){
			p1.html("请输入正确的手机号");
			$("#box ul li:eq(0) #img_1").hide();
			$("#box ul li:eq(0) #img_2").show();			
		}else if(inp1.val()==""){
			p1.html("手机号不能为空");
			$("#box ul li:eq(0) #img_1").hide();
			$("#box ul li:eq(0) #img_2").show();
		}else{
			$(this).parent().css("border-color","#ccc");	
			p1.html("");
			$("#box ul li:eq(0) #img_2").hide();
			$("#box ul li:eq(0) #img_1").show();
			a1=1;
		}
	})
	inp2.blur(function(){
		if(inp2.val() != inp2.val().match(name)&&inp2.val() != ""){
			p2.html("支持中英文、下划线、数字（至少四位）");
			$("#box ul li:eq(1) #img_1").hide();
			$("#box ul li:eq(1) #img_2").show();
		}else if(inp2.val()==""){
			p2.html("用户名不能为空");
			$("#box ul li:eq(1) #img_1").hide();
			$("#box ul li:eq(1) #img_2").show();
		}else{
			$(this).parent().css("border-color","#ccc");
			p2.html("");
			$("#box ul li:eq(1) #img_2").hide();
			$("#box ul li:eq(1) #img_1").show();
			a2=1;
		}		
	})
	inp3.blur(function(){
		if(inp3.val() != inp3.val().match(pass)&&inp3.val() != ""){
			p3.html("输入密码需在6位到32位间");
			$("#box ul li:eq(2) #img_1").hide();
			$("#box ul li:eq(2) #img_2").show();
		}else if(inp3.val()==""){
			p3.html("密码不能为空");
			$("#box ul li:eq(2) #img_1").hide();
			$("#box ul li:eq(2) #img_2").show();
		}else{
			$(this).parent().css("border-color","#ccc");
			p3.html("");
			$("#box ul li:eq(2) #img_2").hide();
			$("#box ul li:eq(2) #img_1").show();
			a3=1;
		}		
	})
	inp4.blur(function(){
		if(inp4.val() != inp3.val() &&inp4.val() != ""){
			p4.html("两次密码输入不一致，请重新输入");
			$("#box ul li:eq(3) #img_1").hide();
			$("#box ul li:eq(3) #img_2").show();
		}else if(inp4.val()==""){
			p4.html("你还没有填写确认密码哦");
			$("#box ul li:eq(3) #img_1").hide();
			$("#box ul li:eq(3) #img_2").show();
		}else{
			$(this).parent().css("border-color","#ccc");
			p4.html("");
			$("#box ul li:eq(3) #img_2").hide();
			$("#box ul li:eq(3) #img_1").show();
			a4=1;
		}		
	})
	
	//验证码函数调用
	yanzhengma();
	var $box1=$("#box1");
	var $li=$("#box ul li:last");
	
	function yanzhengma(){
		//调用随机函数，产生0-5之间的数
		var num = number(0,5);
		//获取验证码的json
		$.getJSON("../JSON/yanzhengma.json",function(data){	
			
			$box1.attr("src",data[num].src);			
			//验证码验证
			inp5.blur(function(){
				if(inp5.val() != data[num].name && inp5.val() !=""){
					p5.html("验证码不正确，请检验");
					$("#box ul li:eq(4) #img_1").hide();
					$("#box ul li:eq(4) #img_2").show();
				}else if(inp5.val()==""){
					p5.html("你还没有填写验证码哦");
					$("#box ul li:eq(4) #img_1").hide();
					$("#box ul li:eq(4) #img_2").show();
				}else{
					$(this).parent().css("border-color","#ccc");
					p5.html("");
					$("#box ul li:eq(4) #img_2").hide();
					$("#box ul li:eq(4) #img_1").show();
					a5=1;
				}
			})		
		})		
	}
	//点击切换验证码
	var img_0=$("#img_0");
	img_0.click(function(){
		yanzhengma();
	})
	
	//注册按钮事件
	btn.click(function(){	
		
		//如果有没填写的内容提示
		if(inp1.val()==""){
			p1.html("手机号不能为空");
			$("#box ul li:eq(0) #img_1").hide();
			$("#box ul li:eq(0) #img_2").show();
		}
		if(inp2.val()==""){
			p2.html("用户名不能为空");
			$("#box ul li:eq(1) #img_1").hide();
			$("#box ul li:eq(1) #img_2").show();
		}
		if(inp3.val()==""){
			p3.html("密码不能为空");
			$("#box ul li:eq(2) #img_1").hide();
			$("#box ul li:eq(2) #img_2").show();
		}
		if(inp4.val()==""){
			p4.html("你还没有填写确认密码哦");
			$("#box ul li:eq(3) #img_1").hide();
			$("#box ul li:eq(3) #img_2").show();
		}
		if(inp5.val()==""){
			p5.html("你还没有填写验证码哦");
			$("#box ul li:eq(4) #img_1").hide();
			$("#box ul li:eq(4) #img_2").show();
		}
		
		
		//检测一下用户是否已经存在
		//假设："test1,123:test2,abc:test3,888"
		/*转为对象
		 * {
		 * 	test1:123,
		 *  test2:abc,
		 *  test3:888
		 * }
		 */		
		//获取cookie中的用户信息
		var users = $.cookie("registerUsers") ? $.cookie("registerUsers") : "";		
		//将字符串转为对象
		users = convertStrToObj(users);		
		//判断inp2.val()是否在users对象中
		if(inp2.val() in users){ 
			p2.html("用户名已经被注册");
			return;
		}else{		
			//提交条件
			tijiao=a1+a2+a3+a4+a5;
			if(tijiao==5){
				//注册成功，设置用户信息的cookie
				//test1 123  test2 abc  test3 888
				//"test1,123:test2,abc:test3,888"设置cookie的value值
				//registerUsers 设置cookie的name(key)值
				//将用户添加到已注册用户列表对象中
				users[inp2.val()] = inp3.val();
				//假设users[李涛] = 123						
				//将用户信息对象转化回字符串，以便于设置cookie
				userStr = convertObjToStr(users);
				//设置用户信息cookie
				$.cookie("registerUsers",userStr,{expires:7,path:"/"});
				console.log(decodeURIComponent(document.cookie))
				p5.html("注册成功，稍后为您跳转到登录页面");
				var timer=setTimeout(function(){
					location.href = "denglu.html";
				},2000);
			}
		}
	})
	var denglu=$("#box p:last span");
	denglu.click(function(){
		location.href="denglu.html";
	})
})

//随机数函数
function number(min,max){
	return (Math.floor(Math.random()*(max-min))+min);
}
	
	
//将字符串转为对象
function convertStrToObj(str){
	if(!str){
		return {};
	}
	//假设不为空："test1,123:test2,abc:test3,888:李涛,123"
	var users = str.split(":"); //将字符串转为数组 ["test1,123","test2,abc","test3,888"]
	var obj = {};
	/*
	 * var obj = new Object();
	 * obj["name"] = "zhangsan";
	 * 
	 */
	//遍历数组
	for(var i = 0; i < users.length; i ++){
		//将字符串转为数组
		var userData = users[i].split(",");
		//["test1",123] ["test2","abc"] ["test3",888]
		obj[userData[0]] = userData[1];
		/*转为对象如下：
		 * obj = {
		 * 	test1 : 123,
		 *  test2 : abc,
		 *  test3 : 888
		 * }
		 */
	}
	return obj;
}

//将对象转为字符串
function convertObjToStr(obj){
	//假设不为空："test1,123:test2,abc:test3,888:李涛,123"
	var str = "";
	for(var usn in obj){
		var pwd = obj[usn];
		if(str){
			//看是否是第一组用户名和密码，如果不是，先在前面添加一个：
			str += ":";
		}
		str += usn + ',' + pwd;
	}
	return str;
}


	