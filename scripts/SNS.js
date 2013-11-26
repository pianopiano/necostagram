/*
  ヾ(ΦωΦ=)にゃーにゃーにゃー
*/
var SNS = (function(){
	function SNS() {
		var $this = $('#sns');
		
		this.show = function() {
			$this.show();
		};
		
		this.hide = function() {
			$this.hide();
		};
		
		this.body = $this;
	}
	return SNS;
})()