/*
*	ヾ(ΦωΦ=)にゃーにゃーにゃー
*/

(function() {
	var $header
	,	$necoLoader
	,	$necoContainer
	,	max=39
	,	dev='pc'
	,	isAnimated=true
	,	_isAnimated=true;
	window.onload = function() {
		$header.animate({'top':'0'},1000);
		$necoLoader.fadeOut(1000, function(){
			$necoLoader.remove();
			$necoContainer.masonry({itemSelector:'.box',isAnimated:_isAnimated});
			for (var i=0; i<max;i++){
				$necoContainer.find('.image').eq(i).delay(i*30).animate({'opacity':'1'},300,'swing');
			}
		});
	}
	
	
	$(function() {
		var num = 0,len = 0,IDs = [],necoTags = ['ねこ','ネコ','猫','neco','neko'],$win = $(window);
		if (navigator.userAgent.indexOf('iPhone') > 0){
			max=19;
			$('.box').css({
				'-webkit-transition-duration':'0s',
				'-moz-transition-duration':'0s',
				'-ms-transition-duration':'0s',
				'-o-transition-duration':'0s',
				'transition-duration':'0s'
			});
			_isAnimated = false;
		} else if (navigator.userAgent.indexOf('iPad') == -1){};
		
		$header = $('#header');
		$necoLoader = $('#necoLoader');
		$necoContainer = $('#necoContainer');
		$necoLoader.css({'left':$win.width()/2-30+'px','top':($win.height()/2)-100+'px'}).fadeIn(500);
		
		$win.resize(resizeHandler);
		necoLoad(necoTags[num]);
		
		
		function necoLoad(hash){
			setWidth();
			$.ajax({
				url: "https://api.instagram.com/v1/tags/"+hash+"/media/recent?client_id=2832c5afa7ad40c29cc84477817056b4",
				data: { count:max.toString() },
				dataType: "jsonp",
				error: function(jqXHR, textStatus, errorThrown) {$necoContainer.text(textStatus);},
				success: function(data, textStatus, jqXHR) {
					necoBuild(data, textStatus, jqXHR);
				}
			});
		}
		
		
		function necoBuild(data, textStatus, jqXHR) {			
			var _neco = data;
			for (var i = 0; i < max; i++) {
				var d = _neco.data,capsText;
				var user,link,url;
				try {url = _neco.data[i].images.thumbnail.url;} 
				catch(e) {url = '#'};
				
				try {link = _neco.data[i].link;} 
				catch(e){link = '#'};
				
				try {user = _neco.data[i].user;} 
				catch(e) {user = {'profile_picture':'','username':''};};
				
				try {capsText = _neco.data[i].caption.text;} 
				catch(e) {capsText = '';};
				
				if (link!='#'||url!='#') {
					var content = 	'<div class="box image shadow" id="'+data.data[i].id+'">'+
										'<a href="'+link+'" target="_blank"><img src="'+url+'" width="200" /></a><br />'+
										'<div class="description">'+
											'<a href="http://instagram.com/'+user.username+'" target="_blank">'+
												'<img class="thumbnail" src="'+user.profile_picture+'" width="30" />'+
												'<p class="username"><strong>'+user.username+'</strong></p>'+
											'</a>'+
											'<p class="caption">'+capsText+'</p>'+
											//'<p class="like"></p>'+
											//'<p class="like">'+_neco.data[i].likes.count+'</p>'+
										'</div>'+
									'</div>';
														
					if (max!=1){
						len += 1;
						$necoContainer.append(content);
						IDs.push(user.id);
						if (len==(max-1)){};
					} else {
						if (IDs[0]!=user.id){
							IDs.unshift(user.id);
							$necoContainer.prepend(content);
							setTimeout(function(){
								resizeHandler();
								$necoContainer.find('.image').css({'opacity':'1'});
							}, 1000);
						};
					};
				};
			};
			setTimeout(function(){
				max=1;
				necoLoad(necoTags[num]);
			}, 5000);
		};
		
		function setWidth(){
			$ww = $win.width();
			if (($ww>=1200)){$necoContainer.width($ww)} 
			else if (($ww<1200)&&($ww>960)){$necoContainer.width(960);} 
			else if (($ww<950)&&($ww>720)){$necoContainer.width(720);} 
			else if (($ww<720)&&($ww>480)){$necoContainer.width(480);} 
			else if ($ww<480){$necoContainer.width(200);}
			else {}			
		}
		
		function resizeHandler() {
			setWidth();
			$necoContainer.masonry('destroy');
			$necoContainer.masonry({itemSelector : '.box',isAnimated : _isAnimated});
		}
		
		var $pageTop = $('#pageTop'),isJump = false,pTopImgs = ['images/j1.gif','images/j2.gif','images/j3.gif'];
		function mover(){$pageTop.find('img').attr('src',pTopImgs[1]);};
		function mout() {$pageTop.find('img').attr('src',pTopImgs[0]);};
		setupPageTop();
		function setupPageTop(){
			isJump = false;
			$pageTop.bind('mouseover', mover).bind('mouseout', mout).bind('click', necoJump).css({'right':'-100','bottom':'-90px'}).find('img').attr('src',pTopImgs[0]);
		}
		
		function necoJump(){
			isJump = true;
			setTimeout(function(){$pageTop.find('img').attr('src',pTopImgs[2]);}, 200);
			$pageTop.unbind('mouseover', mover).unbind('mouseout', mout).unbind('click',necoJump).stop().animate({'right':'-100px','bottom':$win.height()+'px'}, 1500,'easeInOutExpo',setupPageTop);
			$('body,html').animate({scrollTop: 0}, 1200,'easeInOutExpo');
			return false;
		}
		
		$win.scroll(function() {
	        if ($(this).scrollTop() > 1000) {
	            if(!isJump)$pageTop.stop().animate({'bottom':'0px'},200);
	        } else {
	            if(!isJump)$pageTop.stop().animate({'bottom':'-90px'},200);
	        }
	    });
	});
}).call(this);