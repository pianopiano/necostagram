/*
*	ヾ(ΦωΦ=)にゃーにゃーにゃー
*/

(function(){
	$(function(){
		var $header=$('#header')
		,	$necoLoader=$('#necoLoader')
		,	$necoContainer=$('#necoContainer')
		,	$pageTop=$('#pageTop')
		,	$thumbneco=$('.thumbneco')
		,	$win=$(window)
		,	$sns = $('#sns')
		,	max=40
		,	_isAnimated=true
		,	loaded=false
		,	isJump=false
		,	ios = false
		,	IDs=[]
		,	necoTag = 'ねこ'
		,	pTopImgs=['images/j1.gif','images/j2.gif','images/j3.gif']
		,	snd=1
		,	sndfmt='.mp3'
		,	sndPath='sound/n'
		,	cookieValue=''
		//,	num=0
		,	ie=false;
		
		
		var agent = navigator.userAgent;
		if ((agent.indexOf('iPhone') > 0 && agent.indexOf('iPad') == -1) || agent.indexOf('iPad') > 0 || agent.indexOf('Android') > 0) isIos();
		else isPc();
		
		if(navigator.userAgent.search(/Safari/) != -1){
			if (navigator.userAgent.search(/Chrome/) != -1){
				$('#copyright').css({'letter-spacing':'-0.1em'});
			}
		} else if (navigator.userAgent.search(/MSIE 10/) != -1||navigator.userAgent.search(/MSIE 9/) != -1||navigator.userAgent.search(/MSIE 8/) != -1) {
			ie = true;
		}
		
		if (!ie) {
			//var	audio = new Audio();
	        //if      (audio.canPlayType("audio/ogg") == 'maybe') { sndfmt = '.ogg'; }
	        //else if (audio.canPlayType("audio/mp3") == 'maybe') { sndfmt = '.mp3'; }
	        //else if (audio.canPlayType("audio/wav") == 'maybe') { sndfmt = '.wav'; }
			//audio=null;
		}
		
		function sndPlay() {
			if (!ie) {
				//snd++;
				//if (snd==7)snd=1;
				//var s = new Audio(sndPath+snd+sndfmt);
				//s.volume = 0.25;
				//s.play();
			}
		}
		
		
		
		function isIos() {
			ios = true;
			//max=15;
			//if (navigator.userAgent.indexOf('iPad') > 0) max=40;
			$('.box').css({
				'-webkit-transition-duration':'0s',
				'-moz-transition-duration':'0s',
				'-ms-transition-duration':'0s',
				'-o-transition-duration':'0s',
				'transition-duration':'0s'
			});
			_isAnimated=false;
		};
		
		function isPc() {
			$thumbneco.css({
				'-webkit-mask-image':'url(../images/circle.png)',
				'-webkit-mask-size':'280px',
				'-webkit-mask-repeat':'no-repeat',
				'-webkit-mask-position':'center'
			});
		};
		
		
		
		$sns.hide();
		$('#login').hide();
		$necoLoader.css({
			'left':$win.width()/2-30+'px',
			'top':$win.height()/2-100+'px'
		}).fadeIn(500);
		$win.resize(resizeHandler);
		necoLoad();
		
		
		
		function necoLoad(){
			setWidth();
			$.ajax({
				url: "https://api.instagram.com/v1/tags/"+necoTag+"/media/recent?client_id=f39149070d2d4c5fb73cdddcaf00e0dd",
				data:{count:max.toString()},
				dataType: "jsonp",
				error: function(jqXHR,textStatus,errorThrown){$necoContainer.text(textStatus);},
				success: function(data,textStatus,jqXHR){
					necoBuild(data);
				}
			});
		}
		
		function necoBuild(data){	
			var i
			,	len=0
			,	user
			,	link
			,	url
			,	capsText
			,	_data;
			
			for (i=0; i < max; i++){
				_data=data.data[i]
				try{
					if (_data.images.thumbnail.url==undefined){
						url=_data.images.thumbnail;
					} else {
						url=_data.images.thumbnail.url;
					}
				}catch(e){url='#'};
				try{link=_data.link;} 
					catch(e){link='#'};
				try{user=_data.user;} 
					catch(e){user={'profile_picture':'','username':''};};
				try{capsText=_data.caption.text;} 
					catch(e){capsText='';};
					
				link=link.replace("instagr.am","instagram.com");
				if (link!='#'||url!='#'){
					var content=	'<div class="box image shadow" id="'+_data.id+'">'+
										'<a href="'+link+'" target="_blank">'+
											'<img class="thumbneco" src="'+url+'" width="200" />'+
										'</a><br />'+
										'<div class="description">'+
											'<a href="http://instagram.com/'+user.username+'" target="_blank">'+
												'<img class="thumbnail" src="'+user.profile_picture+'" width="30" />'+
												'<p class="username"><strong>'+user.username+'</strong></p>'+
											'</a>'+
											'<p class="caption">'+capsText+'</p>'+
											//'<p class="like"></p>'+
										'</div>'+
									'</div>';
					if (max!=1){
						len += 1;
						//num += 1;
						$necoContainer.append(content);
						IDs.push(user.id);
						//if (len==(max-1)){};
					} else {
						if (IDs[0]!=user.id){
							IDs.unshift(user.id);
							$necoContainer.prepend(content);
							setTimeout(function(){
								//sndPlay();
								resizeHandler();
								$necoContainer.find('.image').css({'opacity':'1'});
							},1000);
						};
					};
				};
			};
			
			setTimeout(function(){
				max=1;
				necoLoad();
			},5000);
		};
		
		function setWidth(){
			$ww = $win.width();
			if (($ww>=1200)){$necoContainer.width($ww)} else 
			if (($ww<1200)&&($ww>960)){$necoContainer.width(960);} else 
			if (($ww<950)&&($ww>720)){$necoContainer.width(720);} else 
			if (($ww<720)&&($ww>480)){$necoContainer.width(480);} else 
			if ($ww<480){$necoContainer.width(200);} else{};
			/*
			if ($('#profPict')){
				$('#profPict').css({'right':0+'px'});
				$('#userContainer').css({'left':($win.width()/2+$necoContainer.width()/2)-15+'px'})
			}
			*/
		}
		
		function resizeHandler(){
			setWidth();
			if(!ios){
				if(loaded)$necoContainer.masonry('destroy');
			}
			$necoContainer.masonry({itemSelector:'.box',isAnimated:_isAnimated});
		}
		
		
		function mOver(){$pageTop.find('img').attr('src',pTopImgs[1]);};
		function mOut(){$pageTop.find('img').attr('src',pTopImgs[0]);};
		function setupPageTop(){
			isJump=false;
			$pageTop.bind('mouseover',mOver).bind('mouseout',mOut).bind('click',necoJump).css({'right':'0','bottom':'-90px'}).find('img').attr('src',pTopImgs[0]);
		};
		setupPageTop();
		
		function necoJump(){
			isJump=true;
			setTimeout(function(){
				$pageTop.find('img').attr('src',pTopImgs[2]);
			},300);
			$pageTop.unbind('mouseover',mOver).unbind('mouseout',mOut).unbind('click',necoJump).stop().animate({'right':'100px','bottom':$win.height()+'px'},1500,'easeInOutExpo',setupPageTop);
			$('body,html').animate({scrollTop: 0},1200,'easeInOutExpo');
			return false;
		};
		
		$win.scroll(function(){
	        if ($(this).scrollTop() > 500){
	            if(!isJump)$pageTop.stop().animate({'bottom':'0px'},300);
	        } else{
	            if(!isJump)$pageTop.stop().animate({'bottom':'-80px'},300);
	        }
	    });
	    
	    
		window.onload=function(){
			$('.image').css({
				'top':'500px',
				'left':$win.width()/2-200+'px'
			})
			//$('.like').hide();
			$necoContainer.append($sns);
			//sndPlay();
			$header.animate({'top':'0'},800);
			$necoLoader.fadeOut(800,function(){
				$necoLoader.remove();
				$necoContainer.masonry({itemSelector:'.box',isAnimated:_isAnimated});
				$necoContainer.find('.image').css('opacity','1');
				$sns.show();
				$pageTop.show()
				addMouseEvents();
				resizeHandler();
				loaded = true;
			});
			
			//getCookie();
			//setCookie();
			
		}
		
		
		function addMouseEvents() {
			if (!ios){
				$thumbneco.live('mouseover',function(){
					$(this).stop().transition({"-webkit-mask-size":"200px"}, 50, 'ease-out')
						.css({ transform: "rotate(5deg)" }).closest('.image').stop().transition({
							'background-color':'#f2f0f0',
							'-webkit-border-top-left-radius':'110px','-moz-border-radius-topleft':'110px',
							'-webkit-border-top-right-radius':'110px','-moz-border-radius-topright':'110px'
					}, 50, 'ease-out');
				}).live('mouseout',function(){
					$(this).stop().transition({"-webkit-mask-size":"280px"}, 30, 'ease-out')
						.css({ transform: "rotate(0deg)" }).closest('.image').stop().transition({
							'background-color':'#ffffff',
							'-webkit-border-top-left-radius':'10px','-moz-border-radius-topleft':'10px',
							'-webkit-border-top-right-radius':'10px','-moz-border-radius-topright':'10px'
					}, 30, 'ease-out');
				});
				
				$('#icon').hover(function(){
					$(this).fadeTo(0,0.8);
					$('#me').fadeIn(200);
				},function(){
					$(this).fadeTo(0,1);
					$('#me').fadeOut(200);
				}).click(function(){
					$('#me').fadeOut(0);
				});
				$('.description').hover(function(){
					$(this).find('.thumbnail').css({'border':'1px solid #8c7e7e'}).end().find('.username').css({'color':'#8c7e7e'});
				},function(){
					$(this).find('.thumbnail').css({'border':'1px solid #ccc'}).end().find('.username').css({'color':'#444444'});
				});
			}
			$thumbneco.live('click', function(){
				//sndPlay();
			})
		}
		
		
	    // login =================================================================
	    function setupLike($accessToken){
			$('.like').show().live('click',function(){
				var like = false;
				var id = $(this).parent('.description').parent('.box').attr('id');
				var src = $(this).css('background-image').split('like');
				if (src[1]=='.png)'){
					$(this).css({'background-image':src[0]+'like_x.png)'});
					like = true;
				} else if (src[1]=='_x.png)') {
					$(this).css({'background-image':src[0]+'like.png)'});
					like = false;
				}
				var accessType = '';
				if (like == true){
					accessType = 'POST';
				} else if (like == false) {
					accessType = 'DELETE';
				};
				
				
				$.ajax({
					type: 'POST',
					url: "likes.php",
					data: { access_token: $accessToken, media_id: id ,type: accessType},
					success: function(data, dataType) {
						//console.log('OK = '+data);
					},
					error: function(XMLHttpRequest, textStatus, errorThrown){
						//alert('error = ' + errorThrown);
					}
				})	
				
			})
	    }
	    
		function getCookie() {
			var data = $accessToken+'/'+$username;
			if (document.cookie) {
				var cookies = document.cookie.split("; ");
				for (var i = 0; i < cookies.length; i++) {
					var str = cookies[i].split("=");
					if (str[0] == cookieName) {
						var cookie_value = unescape(str[1]);
						cookieValue = unescape(str[1])
						getUser(cookie_value);
						if (!isNaN($accessToken)) $accessToken = ++cookie_value;
						break;
					}
				}
			}
		}
		
		function getUser(cv) {
			var cvs = cv.split('/');
			$.ajax({
				type: 'POST',
				url: "https://api.instagram.com/v1/users/search?q="+cvs[1]+'&access_token='+cvs[0],
				dataType: "jsonp",
				success: function(data, dataType) {
					$username = data.data[0].username;
					$profile_picture = data.data[0].profile_picture;
					$id = data.data[0].id;
					buildUser();
				},
				error: function(XMLHttpRequest, textStatus, errorThrown){
					alert('ログイン失敗');
					
				}
			})	
		}
		
		function setCookie(){
			if (!cookieValue) {
				setupLogin()
			}
		}
		
		function delCookie(){
			var date1 = new Date();
			date1.setTime(0);
			document.cookie = cookieName+"=;expires="+date1.toGMTString();
			$('#profPict,#userName').empty().remove();
			location.reload();
		}
		
		function buildUser() {
			if ($profile_picture) {
				setupLike($accessToken);
				$header.append(
					'<div id="userContainer">'+
						'<div id="userName"><p>'+$username+'</p></div>'+
						'<img id="profPict" src="'+$profile_picture+'" width="30" height="30" />'+
					'</div>');
				$('#profPict,#userName').hide();
				setTimeout(function(){
					$('#profPict').css({
						'position':'absolute',
						'right':0+'px',
						'top':'0px',
						'border':'2px solid #ccc'
					}).click(delCookie).fadeIn(300);
					$('#userContainer').css({
						'position':'absolute',
						'left':($win.width()/2+$necoContainer.width()/2)-15+'px',
						'top':'9px'
					})
					$('#userName').css({
						'position':'absolute',
						'right':45+'px',
						'top':'8px',
						'text-align':'right !important',
						'font-size':'14px !important'
					}).fadeIn(300);
					
				}, 1000);
			}
		}
		
		function setupLogin() {
			$('#login')/*.fadeIn()*/.animate({'right':'20px'}, 500,'swing').click(function(){
				var client_id = '28977a1a96d94967a2cb14709492c46d';
				var redirect_uri = 'http://necostagram.com/';
				location.href = 'https://api.instagram.com/oauth/authorize/?client_id='+client_id+'&redirect_uri='+redirect_uri+'&response_type=code&scope=likes';
			});
		}
	return this;
	});
}).call(this);