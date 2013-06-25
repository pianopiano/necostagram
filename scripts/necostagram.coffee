###
  ヾ(ΦωΦ=)にゃーにゃーにゃー
###
$ =>
  $header = $('#header')
  $necoLoader=$('#necoLoader')
  $necoContainer=$('#necoContainer')
  $pageTop=$('#pageTop')
  $thumbneco=$('.thumbneco')
  $win=$(window)
  $sns = $('#sns')
  max=40
  _isAnimated=true
  loaded=false
  isJump=false
  ios = false
  IDs=[]
  necoTag = 'ねこ'
  pTopImgs=['images/j1.gif','images/j2.gif','images/j3.gif']
  ie=false
  contents='';
  ag = navigator.userAgent

  isIos = ->
    ios = true
    $('.box').css
      '-webkit-transition-duration':'0s',
      '-moz-transition-duration':'0s',
      '-ms-transition-duration':'0s',
      '-o-transition-duration':'0s',
      'transition-duration':'0s'
    _isAnimated = false;

  isPc = ->
    $thumbneco.css
      '-webkit-mask-image':'url(../images/circle.png)',
      '-webkit-mask-size':'280px',
      '-webkit-mask-repeat':'no-repeat',
      '-webkit-mask-position':'center'

  if ag.indexOf('iPhone') > 0 && ag.indexOf('iPad') is -1 || ag.indexOf('iPad') > 0 || ag.indexOf('Android') > 0
    isIos()
  else
    isPc()
  if ag.search(/Safari/) isnt -1
    if ag.search(/Chrome/) isnt -1
      $('#copyright').css 'letter-spacing':'-0.1em'
  else if ag.search(/MSIE 10/) isnt -1 || ag.search(/MSIE 9/) isnt -1 || ag.search(/MSIE 8/) isnt -1
    ie = true

  $sns.hide()
  $('#login').hide()
  $necoLoader.css
    'left':$win.width()/2-30+'px',
    'top':$win.height()/2-100+'px'
  $necoLoader.fadeIn 500

  setWidth = ->
    $ww = $win.width()
    if $ww>=1200
      $necoContainer.width $ww
    else if $ww<1200 && $ww>960
      $necoContainer.width 960
    else if $ww<950 && $ww>720
      $necoContainer.width 720
    else if $ww<720 && $ww>480
      $necoContainer.width 480
    else if $ww<480
      $necoContainer.width 280

  resizeHandler = ->
    setWidth()
    if !ios
      if loaded
        $necoContainer.masonry 'destroy'
    $necoContainer.masonry itemSelector:'.box',isAnimated:_isAnimated
  $win.resize resizeHandler

  necoLoad = ->
    setWidth()
    $.ajax
      url: "https://api.instagram.com/v1/tags/"+necoTag+"/media/recent?client_id=f39149070d2d4c5fb73cdddcaf00e0dd",
      data:{count: max.toString()},
      dataType: 'jsonp',
      error: (jqXHR,textStatus,errorThrown) ->
        $necoContainer.text textStatus
      success: (data,textStatus,jqXHR) ->
        necoBuild(data)

  necoLoad()

  necoBuild = (data) ->
    i = 0
    len = data.data.length
    user = ''
    link = ''
    url = ''
    capsText = ''
    _data = {}
    for i in [0..max]
      _data = data.data[i]
      try
        if _data.images.thumbnail.url is undefined
          url = _data.images.thumbnail
        else
          url = _data.images.thumbnail.url
      catch e
        url = '#'
      try
        link = _data.link
      catch e
        link = '#'
      try
        user = _data.user
      catch e
        user = 'profile_picture':'','username':''
      try
        capsText = _data.caption.text
      catch e
        capsText = ''
      link = link.replace "instagr.am","instagram.com"
      if link isnt '#' || url isnt '#'
        content = '<div class="box image shadow" id="'+_data.id+'">'+
                  '<a href="'+link+'" target="_blank">'+
                  '<img class="thumbneco" src="'+url+'" width="200" />'+
                  '</a><br />'+'<div class="description">'+
                  '<a href="http://instagram.com/'+user.username+'" target="_blank">'+
                  '<img class="thumbnail" src="'+user.profile_picture+'" width="30" />'+
                  '<p class="username"><strong>'+user.username+'</strong></p>'+
                  '</a>'+
                  '<p class="caption">'+capsText+'</p>'+
                  '</div>'+
                  '</div>'
        contents += content
        if max isnt 1
          if i is (len-1)
            $necoContainer.append contents
          IDs.push user.id
        else
          if IDs[0] isnt user.id
            IDs.unshift user.id
            $necoContainer.prepend content
            setTimeout ->
              resizeHandker()
              $necoContainer.find('.image').css 'opacity': '1'
            , 1000
    setTimeout ->
      max = 1
      necoLoad()
    , 5000

  necoJump = ->
    isJump = true
    setTimeout ->
      $pageTop.find('img').attr 'src',pTopImgs[2]
    , 300
    $pageTop.off('mouseover',mOver)
      .off('mouseout',mOut)
      .off('click',necoJump)
      .stop().animate {'right':'100px','bottom':$win.height()+'px'},1500,'easeInOutExpo',setupPageTop
    $('body,html').animate {scrollTop: 0},1200,'easeInOutExpo'

  mOver = ->
    $pageTop.find('img').attr 'src',pTopImgs[1]
  mOut = ->
    $pageTop.find('img').attr 'src',pTopImgs[0]
  setupPageTop = ->
    isJump = false
    $pageTop.on('mouseover',mOver)
      .on('mouseout',mOut)
      .on('click',necoJump).css({'right':'0','bottom':'-90px'}).find('img').attr 'src',pTopImgs[0]
  setupPageTop()

  $win.scroll ->
    if $(@).scrollTop() > 500
      if !isJump
        $pageTop.stop().animate {'bottom':'0px'},300
    else
      if !isJump
        $pageTop.stop().animate {'bottom':'-80px'},300

  window.onload = ->
    $('.image').css
      'top': '500px',
      'left': $win.width()/2-200+'px'
    $necoContainer.append $sns
    $header.animate {'top': '0'}, 800
    $necoLoader.fadeOut 800, ->
      $necoLoader.remove()
      $necoContainer.masonry {itemSelector:'.box',isAnimated:_isAnimated}
      $necoContainer.find('.image').css 'opacity','1'
      $sns.show()
      $pageTop.show()
      addMouseEvents()
      resizeHandler()
      loaded = true

  addMouseEvents = ->
    if !ios
      $thumbneco.live 'mouseover', ->
        $(@).stop().transition({"-webkit-mask-size":"200px"}, 50, 'ease-out')
        .css({ transform: "rotate(5deg)" }).closest('.image').stop()
        .transition({
          'background-color':'#f2f0f0',
          '-webkit-border-top-left-radius':'110px',
          '-moz-border-radius-topleft':'110px',
          '-webkit-border-top-right-radius':'110px',
          '-moz-border-radius-topright':'110px'
        }, 50, 'ease-out')
      $thumbneco.live 'mouseout', ->
        $(@).stop().transition({"-webkit-mask-size":"280px"}, 30, 'ease-out')
        .css({ transform: "rotate(0deg)" }).closest('.image').stop()
        .transition({
          'background-color':'#ffffff',
          '-webkit-border-top-left-radius':'10px',
          '-moz-border-radius-topleft':'10px',
          '-webkit-border-top-right-radius':'10px',
          '-moz-border-radius-topright':'10px'
        }, 30, 'ease-out')
      $('#icon').hover ->
        $(@).fadeTo 0, 0.8
        $('#me').fadeIn 200
      , ->
        $(@).fadeTo 0, 1
        $('#me').fadeOut 200
      $('#icon').click ->
        $('#me').fadeOut 0
      $('.description').hover ->
        $(@).find('.thumbnail').css({'border':'1px solid #8c7e7e'}).end().find('.username').css 'color', '#8c7e7e'
      , ->
        $(@).find('.thumbnail').css({'border':'1px solid #ccc'}).end().find('.username').css 'color', '#444444'

  return @

