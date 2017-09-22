function getStyle(obj,attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,1)[attr];
}
function sport(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var stop = true;
		for(var attr in json){
			var cur = attr === "opacity" ? parseInt(parseFloat(getStyle(obj,attr)) * 100) : parseInt(getStyle(obj,attr));
			var speed = (json[attr] - cur) / 8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if(cur != json[attr]){
				stop = false;
			}
			if(attr == "opacity"){
				obj.style.opacity = (cur + speed) / 100;
				obj.style.filter = "alpha(opacity=" + (cur + speed) + ")";
			}else{
				obj.style[attr] = cur + speed + "px";
			}
		}
		if(stop){
			clearInterval(obj.timer);
			fn && fn();
		}
	},30);
}
