/*
*	ヾ(ΦωΦ=)にゃーにゃーにゃー
*/

(function(){
	$(function(){
		var $header=$('#header')
		,	$necoLoader=$('#necoLoader')
		,	$necoContainer=$('#necoContainer')
		,	$pageTop=$('#pageTop')
		,	$win=$(window)
		,	num=0
		,	max=39
		,	_isAnimated=true
		,	loaded=false
		,	isJump=false
		,	IDs=[]
		,	necoTags=['ねこ','ネコ','猫','neco','neko']
		,	pTopImgs=['images/j1.gif','images/j2.gif','images/j3.gif']
		,	$sns = $('#sns');
		
		$sns.hide();
		if (navigator.userAgent.indexOf('iPhone') > 0){
			max=19;
			$('.box').css({
				'-webkit-transition-duration':'0s',
				'-moz-transition-duration':'0s',
				'-ms-transition-duration':'0s',
				'-o-transition-duration':'0s',
				'transition-duration':'0s'
			});
			_isAnimated=false;
		} //else if (navigator.userAgent.indexOf('iPad') == -1){}
		
		$necoLoader.css({'left':$win.width()/2-30+'px','top':($win.height()/2)-100+'px'}).fadeIn(500);
		
		$win.resize(resizeHandler);
		necoLoad(necoTags[num]);
		
		
		function necoLoad(hash){
			setWidth ();
			$.ajax({
				url: "https://api.instagram.com/v1/tags/"+hash+"/media/recent?client_id=f39149070d2d4c5fb73cdddcaf00e0dd",
				data:{count:max.toString()},
				dataType: "jsonp",
				error: function(jqXHR,textStatus,errorThrown){$necoContainer.text(textStatus);},
				success: function(data,textStatus,jqXHR){
					necoBuild(data);
				}
			});
		}
		
		
		function necoBuild(data){			
			var _neco=data
			,	i
			,	len=0;
			for (i=0; i < max; i++){
				var user
				,	link
				,	url
				,	capsText
				,	_data=_neco.data[i];
				
				try{url=_data.images.thumbnail.url;} 
				catch(e){url='#'};
				
				try{link=_data.link;} 
				catch(e){link='#'};
				link=link.replace("instagr.am","instagram.com");
				
				try{user=_data.user;} 
				catch(e){user={'profile_picture':'','username':''};};
				
				try{capsText=_data.caption.text;} 
				catch(e){capsText='';};
				
				if (link!='#'||url!='#'){
					var content=	'<div class="box image shadow" id="'+_data.id+'">'+
										'<a href="'+link+'" target="_blank">'+
										'<img class="thumbneco" src="'+url+'" width="200" /></a><br />'+
										'<div class="description">'+
											'<a href="http://instagram.com/'+user.username+'" target="_blank">'+
												'<img class="thumbnail" src="'+user.profile_picture+'" width="30" />'+
												'<p class="username"><strong>'+user.username+'</strong></p>'+
											'</a>'+
											'<p class="caption">'+capsText+'</p>'+
										'</div>'+
									'</div>';
					if (max!=1){
						len += 1;
						$necoContainer.append(content);
						IDs.push(user.id);
						if (len==(max-1)){};
					} else{
						if (IDs[0]!=user.id){
							IDs.unshift(user.id);
							$necoContainer.prepend(content);
							setTimeout(function(){
								resizeHandler();
								$necoContainer.find('.image').css({'opacity':'1'});
							},1000);
						};
					};
				};
			};
			setTimeout(function(){
				max=1;
				necoLoad(necoTags[num]);
			},5000);
		};
		
		function setWidth(){
			$ww=$win.width();
			if (($ww>=1200)){$necoContainer.width($ww)} else 
			if (($ww<1200)&&($ww>960)){$necoContainer.width(960);} else 
			if (($ww<950)&&($ww>720)){$necoContainer.width(720);} else 
			if (($ww<720)&&($ww>490)){$necoContainer.width(490);} else 
			if ($ww<480){$necoContainer.width(200);} else{};
		}
		
		function resizeHandler(){
			setWidth();
			if(loaded)$necoContainer.masonry('destroy');
			$necoContainer.masonry({itemSelector:'.box',isAnimated:_isAnimated});
		}
		
		
		function mover(){$pageTop.find('img').attr('src',pTopImgs[1]);};
		function mout(){$pageTop.find('img').attr('src',pTopImgs[0]);};
		
		setupPageTop();
		function setupPageTop(){
			isJump=false;
			$pageTop.bind('mouseover',mover).bind('mouseout',mout).bind('click',necoJump).css({'right':'0','bottom':'-90px'}).find('img').attr('src',pTopImgs[0]);
		}
		
		function necoJump(){
			isJump=true;
			setTimeout(function(){$pageTop.find('img').attr('src',pTopImgs[2]);},200);
			$pageTop.unbind('mouseover',mover).unbind('mouseout',mout).unbind('click',necoJump).stop().animate({'right':'100px','bottom':$win.height()+'px'},1500,'easeInOutExpo',setupPageTop);
			$('body,html').animate({scrollTop: 0},1200,'easeInOutExpo');
			return false;
		}
		
		$win.scroll(function(){
	        if ($(this).scrollTop() > 500){
	            if(!isJump)$pageTop.stop().animate({'bottom':'0px'},300);
	        } else{
	            if(!isJump)$pageTop.stop().animate({'bottom':'-80px'},300);
	        }
	    });
	    
	    
		window.onload=function(){
			$header.animate({'top':'0'},1000);
			$necoLoader.fadeOut(1000,function(){
				$necoContainer.append($sns)
				$necoLoader.remove();
				$necoContainer.masonry({itemSelector:'.box',isAnimated:_isAnimated});
				console.log($necoContainer.children().length)
				loaded = true;
				
				$sns.fadeIn();	
				for (var i=0; i<max;i++){
					$necoContainer.find('.image').eq(i).delay(i*30).animate({'opacity':'1'},300,'swing');
				}
			});
			
			
			$('.thumbneco').live('mouseover',function(){
				//$(this).css({'border-bottom':'1px dotted #ddd','background-color':'#f0ebec'});
				$(this).stop().transition({"-webkit-mask-size":"200px"}, 30, 'ease-out').css({ transform: "rotate(5deg)" }).closest('.image').stop().transition({
					'background-color':'#f2f0f0',
					'-webkit-border-top-left-radius':'110px','-moz-border-radius-topleft':'110px',
					'-webkit-border-top-right-radius':'110px','-moz-border-radius-topright':'110px'
				}, 30, 'ease-out');
			}).live('mouseout',function(){
				//$(this).css({'border-bottom':'1px dotted #ddd','background-color':'#ffffff'});
				$(this).stop().transition({"-webkit-mask-size":"280px"}, 30, 'ease-out').css({ transform: "rotate(0deg)" }).closest('.image').stop().transition({
					'background-color':'#ffffff',
					'-webkit-border-top-left-radius':'0px','-moz-border-radius-topleft':'0px',
					'-webkit-border-top-right-radius':'0px','-moz-border-radius-topright':'0px'
				}, 30, 'ease-out');
			})
			$('.description').hover(function(){
				$(this).find('.thumbnail').css({'border':'1px solid #8c7e7e'}).end().find('.username').css({'color':'#8c7e7e'});
			},function(){
				$(this).find('.thumbnail').css({'border':'1px solid #ccc'}).end().find('.username').css({'color':'#444444'});
			});
			$('#icon').hover(function(){
				$(this).fadeTo(0,0.8);
			},function(){
				$(this).fadeTo(0,1);
			})
			
		}
	return this;
	});
}).call(this);