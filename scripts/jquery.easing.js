
jQuery(function($){$.easing.easeInQuad=function(x,t,b,c,d){return c*(t/=d)*t+b;};$.easing.easeOutQuad=function(x,t,b,c,d){return-c*(t/=d)*(t-2)+b;};$.easing.easeInOutQuad=function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return-c/2*((--t)*(t-2)-1)+b;};$.easing.easeInCubic=function(x,t,b,c,d){return c*(t/=d)*t*t+b;};$.easing.easeOutCubic=function(x,t,b,c,d){return c*((t=t/d-1)*t*t+1)+b;};$.easing.easeInOutCubic=function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b;};$.easing.easeInQuart=function(x,t,b,c,d){return c*(t/=d)*t*t*t+b;};$.easing.easeOutQuart=function(x,t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b;};$.easing.easeInOutQuart=function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return-c/2*((t-=2)*t*t*t-2)+b;};$.easing.easeInQuint=function(x,t,b,c,d){return c*(t/=d)*t*t*t*t+b;};$.easing.easeOutQuint=function(x,t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b;};$.easing.easeInOutQuint=function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b;};$.easing.easeInSine=function(x,t,b,c,d){return-c*Math.cos(t/d*(Math.PI/2))+c+b;};$.easing.easeOutSine=function(x,t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b;};$.easing.easeInOutSine=function(x,t,b,c,d){return-c/2*(Math.cos(Math.PI*t/d)-1)+b;};$.easing.easeInExpo=function(x,t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b;};$.easing.easeOutExpo=function(x,t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b;};$.easing.easeInOutExpo=function(x,t,b,c,d){if(t==0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b;return c/2*(-Math.pow(2,-10*--t)+2)+b;};$.easing.easeInCirc=function(x,t,b,c,d){return-c*(Math.sqrt(1-(t/=d)*t)-1)+b;};$.easing.easeOutCirc=function(x,t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b;};$.easing.easeInOutCirc=function(x,t,b,c,d){if((t/=d/2)<1)return-c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;};$.easing.easeInElastic=function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;};$.easing.easeOutElastic=function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;};$.easing.easeInOutElastic=function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)p=d*(.3*1.5);if(a<Math.abs(c)){a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b;};$.easing.easeInBack=function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b;};$.easing.easeOutBack=function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;};$.easing.easeInOutBack=function(x,t,b,c,d,s){if(s==undefined)s=1.70158;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;};$.easing.easeInBounce=function(x,t,b,c,d){return c-jQuery.easing.easeOutBounce(x,d-t,0,c,d)+b;};$.easing.easeOutBounce=function(x,t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b;}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;}};$.easing.easeInOutBounce=function(x,t,b,c,d){if(t<d/2)return jQuery.easing.easeInBounce(x,t*2,0,c,d)*.5+b;return jQuery.easing.easeOutBounce(x,t*2-d,0,c,d)*.5+c*.5+b;};});