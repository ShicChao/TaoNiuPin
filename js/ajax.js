/*
 *  obj.type   http连接的方式，包括POST和GET两种方式
 *  obj.url  发送请求的url
 *  obj.async 是否为异步请求，true 为异步，false为同步
 *  obj.data  发送的参数，格式为对象类型
 *  obj.success ajax发送并接收成功调用的回调函数
 * 
 *  setRequestHeader 设置请求头
 * 	设置请求头前需先调用open方法打开一个url
 * 	设置数据格式
 *  1.发送json格式数据
 * 	xhr.setRequestHeader("Content-type","application/json; charset=utf-8");
 *  2.发送表单数据
 *  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=utf-8");
 *  3.发送纯文本
 *  xhr.setRequestHeader("Content-type","text/plain;charset=utf-8");
 *  4.发送html文本
 *  xhr.setRequestHeader("Content-type","text/html;charset=utf-8");
 */

function ajax(obj){
	//设置初始值
	obj = obj || {};
	obj.method = obj.method.toUpperCase() || "POST";
	obj.url = obj.url || '';
	obj.async = obj.async || true;
	obj.data = obj.data || null;
	obj.success = obj.success || function (){};
	//创建ajax对象
	var xhr = null;
	xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	var params = []; //创建参数数组
	//遍历数据
	for(var key in obj.data){
		params.push(key + "=" + obj.data[key]); //将数据转换为key=value的格式存入数组
	}
	var postData = params.join("&"); //将数组转为字符串。连接符为&
	//判断发送方式
	if(obj.method.toUpperCase() == 'POST'){
		xhr.open(obj.method,obj.url,obj.async); //建立连接
		//设置请求头
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=uutf-8");
		xhr.send(postData); //发送请求
	}else if(obj.method.toUpperCase() === "GET"){
		xhr.open(obj.method,obj.url + "?" + postData,obj.async); //建立连接
		xhr.send(null); //发送请求
	}
	//添加状态改变事件
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			obj.success(xhr.responseText); //如果成功则返回请求的数据
		}
	};
}
