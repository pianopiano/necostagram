/*
  ヾ(ΦωΦ=)にゃーにゃーにゃー
*/
var Header = (function(){
	function Header() {
		var $this = $('#header');
		
		
		
		this.fadeIn = function(sec, collback) {
			$this.animate({
				'top': '0'
			}, sec, 'easeOutExpo', collback);
		};
	}
	return Header;
})()