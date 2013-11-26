/*
  ヾ(ΦωΦ=)にゃーにゃーにゃー
*/

(function(){
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
		//var nya = new Nya();
		var max = 40;
		var isAnimated = true;
		var loaded = false;
		
		
		var onResizeHandler = function() {
			necoContainer.setWidth($win);
			var container = necoContainer.body;
			if (!useragent.ios) {
				if (loaded) container.masonry('destroy');
			}
			
			container.masonry({
				itemSelector: '.box',
				isAnimated: isAnimated
			});
		}

		var loopLoader = function() {
			max = 1;
			setTimeout(function() {
				xmlLoadCommand.load(max, xmlLoadComplete);
			}, 5000);
		}
		
		
		var xmlLoadComplete = function(data) {
			necoContainer.setWidth($win);
			necoContainer.build(data, max, function(e){
				if (e=='resize') { 
					onResizeHandler();
					//nya.play();
				}
				loopLoader();
			})
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
			necoContainer.append(sns.body);
			header.fadeIn(800);
			nowLoading.fadeOut(800, function(){
				nowLoading.stop();
				nowLoading.remove();
				necoContainer.body.masonry({
					itemSelector: '.box',
					isAnimated: isAnimated
				});
				if (!useragent.ios) necoContainer.addEvents();
				necoContainer.show();
				pageTop.show();
				sns.show();
				
				addEvents();
				//nya.play();
				loaded = true;
			});
		}
		
		var init = function() {
			if (useragent.chrome) $('#copyright').css({'letter-spacing': '-0.1em'});
			if (useragent.ios) {
				necoContainer.isMob()
				isAnimated = false;
			} else necoContainer.isPc();
			
			//nya.init();
			$win.on('load', windowLoaded);
			nowLoading.init($win).fadeIn();
			nowLoading.start();
			sns.hide();
			xmlLoadCommand.load(max, xmlLoadComplete);
		}
		
		init();
		
		return _this;
	});
	
}).call(this)
