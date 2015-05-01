/*
  ヾ(ΦωΦ=)にゃーにゃーにゃー
*/

(function($){
	var _this = this;

	$(function() {
		var $win = $(window);
		var xmlLoadCommand = new XMLLoadCommand();
		var necoContainer = new NecoContainer();
		var nowLoading = new NowLoading();
		var useragent = new UserAgent();
		var pageTop = new PageTop();
		var header = new Header();
		var sns = new SNS();
		var max = 40;
		var loaded = false;
		var firstId = null;
		var idArray = [];
		var newArrival = {};
		
		var onResizeHandler = function() {
			necoContainer.setWidth($win);
			var container = necoContainer.body;
			if (!useragent.ios) {
			} else {
				if ($('#necoContainer').children('div').eq(0).attr('id')!=firstId) {
					firstId = $('#necoContainer').children('div').eq(0).attr('id');
				}
			}
		}

		var loopLoader = function() {
			max = 10;
			setTimeout(function() {
				xmlLoadCommand.load(max, xmlLoadComplete);
			}, 5000);
		}
		
		var xmlLoadComplete = function(data) {
			var json = data;
			newArrival = {data: []};
			for (var i = 0, l = json.data.length; i < l; i++) {
				var flag = false;
				for (var j = 0, l2 = idArray.length; j < l2; j++) {
					if (idArray[j]==json.data[i].id) flag = true;
				}
				if (!flag) {
					idArray.push(json.data[i].id);
					newArrival.data.push(json.data[i])
				}
			};
			if (newArrival.data.length==0) {
				loopLoader();
				return;
			} else {
				necoContainer.setWidth($win);
				necoContainer.build(newArrival, newArrival.data.length, function(e){
					onResizeHandler();
					loopLoader();
				})
			}
		}
		
		
		var addEvents = function(){
			$win.on('resize', onResizeHandler);
			var me = $('#me');
			$('#icon').hover(function() {
				$(this).fadeTo(0, 0.8);
				me.fadeIn(200);
			}, function() {
				$(this).fadeTo(0, 1);
				me.fadeOut(200);
			}).click(function() {
				me.fadeOut(0);
			});
		}
		
		var windowLoaded = function() {
			$win.off('load');
			pageTop.init();
			necoContainer.init($win);
			header.fadeIn(800);
			nowLoading.fadeOut(1000, function(){
				nowLoading.stop();
				nowLoading.remove();
				necoContainer.show();
				pageTop.show();
				setTimeout(function() {
					$('#necoContainer').children('div').eq($('#necoContainer').children('div').length-1).after(sns.body);
					onResizeHandler();
					setTimeout(function() {
						$('#sns').css({'opacity': '1'});
					}, 200)
				}, 200)
				addEvents();
				loaded = true;
			});
		}
		
		var init = function() {
			$win.on('load', windowLoaded);
			nowLoading.init($win).fadeIn();
			nowLoading.start();
			xmlLoadCommand.load(max, xmlLoadComplete);
			
			$('#snsinner').next('br').remove();
			$('#icon').parents('a').css({'float': 'left'})
		}
		
		init();
		
		return _this;
	});
	
})(jQuery);
