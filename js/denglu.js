require.config({
	paths : {
		"jquery" : "jquery",
        "ajax" : "ajax",
        "cookie" : "jquery.cookie"
	}
})
require(["jquery","ajax","cookie"],function(){
	var inp=$("input");
	var inp1=$("#inp1");
	var inp2=$("#inp2");	
	var p1=$("#p1");
	var p2=$("#p2");
	var img_1=$("#img_1");
	var img_2=$("#img_2");
	var img_3=$("#img_3");
	var img_4=$("#img_4");
	var btn= $("#sec");
	var tijiao=0;
	
	for(var i=0;i<inp.length;i++){
		inp[i].onclick=function(){
			this.parentNode.style.borderColor="#e63955";
		}
	}
	inp1.blur(function(){
		if(inp1.val()==""){
			p1.html("账号不能为空");
			img_1.hide();
			img_2.show();
		}else{
			$(this).parent().css("border-color","#ccc");	
			p1.html("");
			img_1.show();
			img_2.hide();
			tijiao++;
		}
	})
	inp2.blur(function(){
		if(inp2.val()==""){
			p2.html("密码不能为空");
			img_3.hide();
			img_4.show();
		}else{
			$(this).parent().css("border-color","#ccc");
			p2.html("");
			img_3.show();
			img_4.hide();
			tijiao++;
		}		
	})
	//登录按钮事件
	
	btn.click(function(){
		
		//如果有没填写的内容提示
		if(inp1.val()==""){
			p1.html("账号不能为空");
		}else{		
			//校验用户名和密码是否正确
			//获取到cookie中的用户信息
			var users = $.cookie("registerUsers") ? $.cookie("registerUsers") : "";
			//将字符串转为对象
			users = convertStrToObj(users);
			
			if(users[inp1.val()] == inp2.val()){
				//登录成功
				$.cookie("loginedUsers",inp1.val(),{expires:7,path:"/"});
				p2.html("登录成功,稍后为您跳转到主页面");
				var timer=setTimeout(function(){
					location.href = "../index.html";
				},2000);				
			}else{
				//登录失败
				p1.html("用户名不存在，请确认后重试！");
			}
		}
		
		if(inp2.val()==""){
			p2.html("密码不能为空");
		}		
	})

	var zhuce=$("#box div span");
	zhuce.click(function(){
		location.href="zhuce.html";
	})
})

//将字符串转为对象
function convertStrToObj(str){
	if(!str){ //如果是空字符串
		return {}; //返回空对象
	}
	var users = str.split(":");
	var obj = {};
	for(var i = 0; i < users.length; i ++){
		var userData = users[i].split(",");
		obj[userData[0]] = userData[1];
	}
	return obj;
}

//将对象转为字符串
function convertObjToStr(obj){
	var str = "";
	//遍历对象
	for(var usn in obj){
		var pwd = obj[usn];
		if(str){
			str += ":";
		}
		str += usn + ',' + pwd;
	}
	return str;
}
