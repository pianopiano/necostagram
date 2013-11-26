/*
  ヾ(ΦωΦ=)にゃーにゃーにゃー
*/
var UserAgent = (function(){
	function UserAgent() {
		var ua = navigator.userAgent;
		var ios = false;
		var ie = false;
		var chrome = false;
		if (ua.indexOf('iPhone') > 0 && ua.indexOf('iPad') === -1 || ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
			ios = true;
		}
		
		if (ua.search(/Safari/) !== -1) {
			if (ua.search(/Chrome/) !== -1) {
				chrome = true;
			}
		} else if (ua.search(/MSIE 10/) !== -1 || ua.search(/MSIE 9/) !== -1 || ua.search(/MSIE 8/) !== -1) {
			ie = true;
		}
		
		this.ios = ios;
		this.ie = ie;
		this.chrome = chrome;
	}
	return UserAgent;
})()