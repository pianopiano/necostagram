/*
  ヾ(ΦωΦ=)にゃーにゃーにゃー
*/
var NowLoading = (function(){
	function NowLoading() {
		var $this = $('#necoLoader');
		var timer = null;
		
		this.init = function(win) {
			$this.css({
				'left': win.width() / 2 - 35 + 'px',
				'top': win.height() / 2 - 100 + 'px'
			});
			return $this;
		};
		
		var setPosX = function(X) {
			$this.css({
				'background-position-x': X + 'px'
			})
		}
		
		this.start = function() {
			var num = 0;
			var sec = 80;
			timer = setInterval(function() {
				if (num===10) num = 0;
				setPosX(-(70 * num));
				num++;
			}, sec);
		}
		
		this.stop = function() {
			clearInterval(timer);
			timer = null;
		}
		
		this.show = function() {
			$this.show();
		};
		
		this.hide = function() {
			$this.hide();
		};
		
		this.fadeIn = function(sec) {
			if (sec===undefined) sec = 500;
			$this.fadeIn(sec);
		}
		
		this.fadeOut = function(sec, callback) {
			if (sec===undefined) sec = 500;
			if (callback===undefined) callback = function(){};
			$this.fadeOut(sec, callback);
		}
		
		this.remove = function() {
			$this.empty().remove();
			$this = null;
		};
	}
	return NowLoading;
})()