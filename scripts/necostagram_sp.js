/*
  ヾ(ΦωΦ=)にゃーにゃーにゃー
*/
var UserAgent = (function(){
	function UserAgent() {
		var ua = navigator.userAgent;
		var ios = false;
		var ie = false;
		if (ua.indexOf('iPhone') > 0 && ua.indexOf('iPad') === -1 || ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
			ios = true;
			$(document.body).addClass('smp');
		} else {
			$(document.body).addClass('pc');
		}
		
		if (ua.search(/Safari/) !== -1) {
			if (ua.search(/Chrome/) !== -1) {
			$(document.body).addClass('chrome');
			}
		} else if (ua.search(/MSIE 10/) !== -1 || ua.search(/MSIE 9/) !== -1 || ua.search(/MSIE 8/) !== -1) {
			ie = true;
		}
		
		this.ios = ios;
		this.ie = ie;
	}
	return UserAgent;
})();

/*
  ヾ(ΦωΦ=)にゃーにゃーにゃー
*/

var XMLLoadCommand = (function(){
	function XMLLoadCommand() {
		this.load = function(max, collback){
			$.ajax({
				url: "https://api.instagram.com/v1/tags/ねこ/media/recent?client_id=f39149070d2d4c5fb73cdddcaf00e0dd",
				data: {count: max.toString()},
				dataType: 'jsonp',
				error: function(jqXHR, textStatus, errorThrown) {
					return collback(textStatus);
				},
				success: function(data, textStatus, jqXHR) {
					return collback(data);
				}
			});
		};
	}
	return XMLLoadCommand;
})();


/*
  ヾ(ΦωΦ=)にゃーにゃーにゃー
*/
var NecoContainer = (function(){
	function NecoContainer() {
		var $this = $('#necoContainer');
		var $thumbneco = $('.thumbneco');
		var contents = '';
		var firstBuild = true;
		
		this.setWidth = function($win) {
			return;
			var ww = $win.width();
			if (ww >= 1200) {
				return $this.width(ww);
			} else if (ww < 1200 && ww > 960) {
				return $this.width(960);
			} else if (ww < 950 && ww > 720) {
				return $this.width(720);
			} else if (ww < 720 && ww > 480) {
				return $this.width(480);
			} else if (ww < 480) {
				return $this.width(280);
			}
		};
		
		this.build = function(data, max, collback){
			var capsText, content, i, len, link, url, user, _data, _i;
			i = 0;
			len = data.data.length;
			user = '';
			link = '';
			url = '';
			capsText = '';
			_data = {};
			for (i = _i = 0; 0 <= max ? _i <= max : _i >= max; i = 0 <= max ? ++_i : --_i) {
				_data = data.data[i];
				try {
					if (_data.images.low_resolution.url === void 0) url = _data.images.low_resolution;
					else url = _data.images.low_resolution.url;
				} 
				catch (e) {url = '#';}
				try {link = _data.link;}
				catch (e) {link = '#';}
				try {user = _data.user;} 
				catch (e) {
					user = {'profile_picture': '','username': ''};
				}
				try {capsText = _data.caption.text;}
				catch (e) {capsText = '';}
				link = link.replace("instagr.am", "instagram.com");
				if (link !== '#' || url !== '#') {
					content = '<div class="box image shadow" id="' + _data.id + '"><a href="' + link + '" target="_blank"><img class="thumbneco" src="' + url + '" width="200" /></a><br /><div class="description"><a href="http://instagram.com/' + user.username + '" target="_blank"><img class="thumbnail" src="' + user.profile_picture + '" width="30" /><p class="username"><strong>' + user.username + '</strong></p></a><p class="caption">' + capsText + '</p></div></div>';
					contents += content;
					
					if (firstBuild) {
						if (i === (len - 1)) {
							$this.append(contents);
							firstBuild = false;
							collback(null);
						}
					} else {
						$this.prepend(content);
						if (i === (len - 1)) {
							collback('resize');
						}
						for (var j = 0, l2 = $this.find('.image').length; j < l2; j++) {
							if ($this.find('.image').eq(j).css('opacity')=='0') {
								var h = $this.find('.image').eq(j).outerHeight();
								$this.find('.image').eq(j).height(0).css({'opacity': '1'}).animate({'height': h+$(window).width()}, 1000, 'easeOutExpo')
							}
						}
						
					}
				}
			}
		};
		
		this.body = $this;
		
		this.init = function(win) {
			//$this.find('.image').css({'top': '500px','left': win.width() / 2 - 200 + 'px'});
		}
		
		this.addEvents = function() {
		
			
		}
		
		this.show = function() {
			$this.find('.image').css('opacity', '1');
		}
		
		this.append = function(obj) {
			$this.append(obj);
		}
	}
	return NecoContainer;
})();


/*
  ヾ(ΦωΦ=)にゃーにゃーにゃー
*/
var NowLoading = (function(){
	function NowLoading() {
		var $this = $('#necoLoader');
		var timer = null;
		
		this.init = function(win) {
			$this.css({'left': win.width() / 2 - 35 + 'px','top': win.height() / 2 - 100 + 'px'});
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
})();

/*
  ヾ(ΦωΦ=)にゃーにゃーにゃー
*/
var Header = (function(){
	function Header() {
		var $this = $('#header');
		this.fadeIn = function(sec, collback) {
			$this.animate({'top': '0'}, sec, 'easeOutExpo', collback);
		};
	}
	return Header;
})();


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
			var gif = new Image();
			for (var i = 0; i < 3; i++) {gif.src = img[i];};
		
			isJump = false;
			addEvents();
			
			$this.on('mouseenter', mouseenter)
			.on('mouseleave', mouseleave)
			.on('click', jump).css({
				'right': '0',
				'bottom': '-90px'
			}).find('img').attr('src', img[0]);
		}
		
		var mouseenter = function() {
			$this.find('img').attr('src', img[1]);
		};
		
		var mouseleave = function() {
			$this.find('img').attr('src', img[0]);
		};

		var jump = function() {
			isJump = true;
			setTimeout(function() {
				$this.find('img').attr('src', img[2]);
			}, 200);
			$this.off('mouseenter').off('mouseleave').off('click').stop().animate({
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
})();

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
})();

/*
  ヾ(ΦωΦ=)にゃーにゃーにゃー
*/
var Nya = (function() {
	function Nya() {
		var ext = null;
		var SOUNDS = null;
		this.init = function() {
			ext = (function() {
				var ext = "";
				var audio = new Audio();
				if (audio.canPlayType("audio/ogg") == 'maybe') {
					ext = "ogg";
				} else if (audio.canPlayType("audio/mp3") == 'maybe') {
					ext = "mp3";
				} else if (audio.canPlayType("audio/wav") == 'maybe') {
					ext = "wav";
				}
				return ext;
			})();
			
			SOUNDS = [
				new Audio("sounds/1." + ext),
				new Audio("sounds/2." + ext),
				new Audio("sounds/3." + ext)
			]
		};
		
		this.play = function() {
			var n = Math.floor(Math.random()*(SOUNDS.length));
			SOUNDS[n].play();
      SOUNDS[n] = new Audio( SOUNDS[n].src );
		}
	}
	return Nya;
})();