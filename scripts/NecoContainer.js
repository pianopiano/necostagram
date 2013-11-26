/*
  ヾ(ΦωΦ=)にゃーにゃーにゃー
*/
var NecoContainer = (function(){
	function NecoContainer() {
		var $this = $('#necoContainer');
		var $thumbneco = $('.thumbneco');
		var IDs = [];
		var contents = '';
		
		this.setWidth = function($win) {
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
					if (_data.images.thumbnail.url === void 0) url = _data.images.thumbnail;
					else url = _data.images.thumbnail.url;
				} 
				catch (e) {url = '#';}
				try {link = _data.link;}
				catch (e) {link = '#';}
				try {user = _data.user;} 
				catch (e) {
					user = {
						'profile_picture': '',
						'username': ''
					};
				}
				try {capsText = _data.caption.text;}
				catch (e) {capsText = '';}
				link = link.replace("instagr.am", "instagram.com");
				if (link !== '#' || url !== '#') {
					content = '<div class="box image shadow" id="' + _data.id + '">' + '<a href="' + link + '" target="_blank">' + '<img class="thumbneco" src="' + url + '" width="200" />' + '</a><br />' + '<div class="description">' + '<a href="http://instagram.com/' + user.username + '" target="_blank">' + '<img class="thumbnail" src="' + user.profile_picture + '" width="30" />' + '<p class="username"><strong>' + user.username + '</strong></p>' + '</a>' + '<p class="caption">' + capsText + '</p>' + '</div>' + '</div>';
					contents += content;
					if (max !== 1) {
						if (i === (len - 1)) {
							$this.append(contents);
							collback(null);
						}
						IDs.push(user.id);
					} else {
						if (IDs[0] !== user.id) {
							IDs.unshift(user.id);
							$this.prepend(content);
							setTimeout(function() {
								$this.find('.image').css({'opacity': '1'});
								collback('resize');
							}, 1000);
						} else {
							collback(null);
						}
					}
				}
			}
		};
		
		this.body = $this;
		
		this.init = function(win) {
			$this.find('.image').css({
				'top': '500px',
				'left': win.width() / 2 - 200 + 'px'
			});
		}
		
		this.addEvents = function() {
			$thumbneco.live('mouseover', function() {
				var duration = 20;
				var color = '#f2f0f0';
				var radius = '110px';
				return $(this).stop().transition({
					"-webkit-mask-size": "200px"
				}, duration, 'ease-out').css({
					transform: "rotate(5deg)"
				}).closest('.image').stop().transition({
					'background-color': color,
					'-webkit-border-top-left-radius': radius,
					'-moz-border-radius-topleft': radius,
					'-webkit-border-top-right-radius': radius,
					'-moz-border-radius-topright': radius
				}, duration, 'linear');
			}).live('mouseout', function() {
				var duration = 30;
				var color = '#ffffff';
				var radius = '10px';
				return $(this).stop().transition({
					"-webkit-mask-size": "280px"
				}, duration, 'ease-out').css({
					transform: "rotate(0deg)"
				}).closest('.image').stop().transition({
					'background-color': color,
					'-webkit-border-top-left-radius': radius,
					'-moz-border-radius-topleft': radius,
					'-webkit-border-top-right-radius': radius,
					'-moz-border-radius-topright': radius
				}, duration, 'linear');
			});
			
			
			$('.description').hover(function() {
				$(this).find('.thumbnail').css({'border': '1px solid #8c7e7e'}).end().find('.username').css('color', '#8c7e7e');
			}, function() {
				$(this).find('.thumbnail').css({'border': '1px solid #ccc'}).end().find('.username').css('color', '#444444');
			});
		}
		
		this.show = function() {
			$this.find('.image').css('opacity', '1');
		}
		
		this.append = function(obj) {
			$this.append(obj);
		}
		
		this.isMob = function() {
			$('.box').css({
				'-webkit-transition-duration': '0s',
				'-moz-transition-duration': '0s',
				'-ms-transition-duration': '0s',
				'-o-transition-duration': '0s',
				'transition-duration': '0s'
			});
		}
		
		this.isPc = function() {
			$thumbneco.css({
				'-webkit-mask-image': 'url(../images/circle.png)',
				'-webkit-mask-size': '280px',
				'-webkit-mask-repeat': 'no-repeat',
				'-webkit-mask-position': 'center'
			});
		}
	}
	return NecoContainer;
})()
