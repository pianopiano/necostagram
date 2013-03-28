<?php
    $client_id = "f39149070d2d4c5fb73cdddcaf00e0dd";
    $client_secret = "7f29987013714e51ad7b6ce43b0533ed";
    $redirect_uri = "http://necostagram.com/";
    $token_uri = 'https://api.instagram.com/oauth/access_token';
    $at="0";
    $post = "client_id=".$client_id."&client_secret=".$client_secret."&grant_type=authorization_code&redirect_uri=".$redirect_uri."&code=".$_GET["code"];
     
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $token_uri);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
     
    $json = json_decode(curl_exec($ch));
    curl_close($ch);
    
    if ($json->access_token){
    	$at = $json->access_token;
	    //echo "<div id='access_token'>".$json->access_token."</div>";
    } else {
	   	//echo "<div id='access_token'>".$at."</div>";
    }
    
    //https://api.instagram.com/oauth/authorize/?client_id=f3af4e71702d492793ff32c61af1bbdc&redirect_uri=http://pianopiano.jp/neco.stagram/index.php&response_type=code&scope=likes
?>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ja" xml:lang="ja" dir="ltr" xmlns:og="http://ogp.me/ns#" xmlns:fb="http://www.facebook.com/2008/fbml">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=0.6,user-scalable=yes,maximum-scale=0.6">
	<meta property="og:title" content="necostagram" />
	<meta property="og:type" content="article" />
	<meta property="og:description" content="ヾ(ΦωΦ=)にゃにゃにゃにゃにゃにゃにゃにゃにゃんーにゃーにゃーにゃーにゃーにゃーにゃーにゃーにゃーにゃーにゃーにゃーー。" />
	<meta property="og:url" content="http://necostagram.com/" />
	<meta property="og:image" content="http://necostagram.com/images/ogp.jpg" />
	<meta property="og:site_name" content="necostagram" />
	<meta property="og:locale" content="ja_JP" />
	<title>necostagram</title>
	<link rel="stylesheet" href="styles/base.css" type="text/css" />
	<link rel="stylesheet" href="styles/necostagram.css" type="text/css" />
	<script type="text/javascript" src="scripts/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="scripts/jquery.easing.js"></script>
	<script type="text/javascript" src="scripts/jquery.masonry.min.js"></script>
	<script type="text/javascript" src="scripts/jquery.transit.min.js"></script>
	<script type="text/javascript" src="scripts/necostagram.js"></script>
	<script type="text/javascript">
		var at = <?php echo $at; ?>;
		console.log(at[0]);
	</script>
</head>

<body id="body">
	<header id="header">
		<h1>necostagram</h1>
		<div id="login">log-in</div>
	</header>
	<div id="necoContainer" class="clearfix" style="position: relative;">
		<img src="images/necoLoader.gif" id="necoLoader" width="80" height="152">
	</div>
	<footer id="footer">
		<div id="footer-inner">
			<div id="pageTop"><a href="#header"><img src="images/j1.gif" alt="ねこ" width="100" height="100"></a></div>
		</div>
	</footer>
		<div id="sns" class="box image shadow masonry-brick">
			<div id="fb-root"><div class="fb-like" data-href="http://necostagram.com/" data-send="false" data-layout="box_count" data-width="250" data-show-faces="true" data-font="tahoma"></div></div>
			<a href="https://twitter.com/share" target="_blank"	 class="twitter-share-button" data-url="http://necostagram.com/" data-text="にゃーにゃーにゃーヾ(ΦωΦ=)" data-lang="en" data-hashtags="necostagram" data-count="vertical">ツイート</a>
			<a href="http://instagram.com/necostagram" target="_blank"><img id="icon" src="images/icon.jpg" width="56" height="56" /></a>
	<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
	</div>
		<script>(function(d, s, id) {
			  var js, fjs = d.getElementsByTagName(s)[0];
			  if (d.getElementById(id)) return;
			  js = d.createElement(s); js.id = id;
			  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
			  fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
		</script>
		
	
	

</body>
</html>


