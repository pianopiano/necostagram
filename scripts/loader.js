var readDevice = "";

var ua = navigator.userAgent;
if (ua.indexOf('iPhone') != -1 || ua.indexOf('iPod') != -1 || (ua.indexOf('Android') != -1 && ua.indexOf('Mobile') != -1)) {
	readDevice = "smp";
}
if (ua.indexOf('iPad') != -1 || (ua.indexOf('Android') != -1 && ua.indexOf('Mobile') == -1) || /\bSilk\b/.test(ua)) {
	readDevice = "tbl";
}	
if(!readDevice){
	readDevice = "pc";
}


if(readDevice == "smp"||readDevice == "tbl"){
	$("head").append("<link>");
	var css = $("head").children(":last");
	css.attr({rel: "stylesheet",type: "text/css",href: "/styles/necostagram_sp.css"});
	$.getScript("scripts/necostagram_sp.js", function() {
		$.getScript("scripts/index_sp.js");
	});
	
}

if(readDevice == "pc"){
	$("head").append("<link>");
	var css = $("head").children(":last");
	css.attr({rel: "stylesheet",type: "text/css",href: "/styles/necostagram_pc.css"});
	$.getScript("scripts/necostagram_pc.js", function() {
		$.getScript("scripts/index_pc.js");
	});
	
}