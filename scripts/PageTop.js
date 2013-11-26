/*
  ヾ(ΦωΦ=)にゃーにゃーにゃー
*/
var PageTop = (function(){
	function PageTop() {
		var $win = $(window);
		var $this = $('#pageTop');
		var isJump = false;
		var img = [
			'images/j1.gif',
			'images/j2.gif',
			'images/j3.gif'
		];
		
		var addEvents = function() {
			$win.scroll(function() {
				if ($(this).scrollTop() > 100) {
					if (!isJump) $this.stop().animate({'bottom': '0px'}, 500, 'easeOutExpo');
				} else {
					if (!isJump) $this.stop().animate({'bottom': '-80px'}, 300, 'easeOutExpo');
				}
			});
		}
		
		var init = function() {
			isJump = false;
			addEvents();
			
			$this.on('mouseover', mouseover)
			.on('mouseout', mouseout)
			.on('click', jump).css({
				'right': '0',
				'bottom': '-90px'
			}).find('img').attr('src', img[0]);
		}
		
		var mouseover = function() {
			$this.find('img').attr('src', img[1]);
		};
		
		var mouseout = function() {
			$this.find('img').attr('src', img[0]);
		};

		var jump = function() {
			isJump = true;
			setTimeout(function() {
				$this.find('img').attr('src', img[2]);
			}, 300);
			$this.off('mouseover').off('mouseout').off('click').stop().animate({
				'right': '100px',
				'bottom': $win.height() + 'px'
			}, 1500, 'easeInOutExpo', init);
			$('body,html').animate({
				scrollTop: 0
			}, 1200, 'easeInOutExpo');
		};
		
		this.init = init;
		
		this.show = function() {
			$this.show();
		}
		
	}
	return PageTop;
})()