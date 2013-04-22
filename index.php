<?php
    $client_id = "28977a1a96d94967a2cb14709492c46d";
    $client_secret = "7440a71b6098430cb58f02868df40e1f";
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
    
    $username = '';
    $profile_picture = '';
    $id = '';
    
    if ($json->access_token){
    	$at = (string) $json->access_token;
    	$username = (string) $json->user->username;
		$profile_picture = (string) $json->user->profile_picture;
		$id = (string) $json->user->id;
		//echo "full_name=".$json->user->full_name;
    }
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
	<meta name="keywords" content="にゃーにゃーにゃー">
	<meta name="description" content="ヾ(ΦωΦ=)にゃにゃにゃにゃにゃにゃにゃにゃにゃんーにゃーにゃーにゃーにゃーにゃーにゃーにゃーにゃーにゃーにゃーにゃーー">
	<title>necostagram</title>
	<link rel="stylesheet" href="styles/necostagram.css" type="text/css" />
</head>
<body id="body">
	<header id="header">
		<h1><img src="images/logo.png" alt="necostagram" /></h1>
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
		<div id="snsinner">
		<img id="me" src="images/me!.gif" width="70" height="50" />
			<iframe src="//www.facebook.com/plugins/like.php?locale=en_US&amp;href=http%3A%2F%2Fnecostagram.com&amp;send=false&amp;layout=box_count&amp;width=60&amp;show_faces=true&amp;font&amp;colorscheme=light&amp;action=like&amp;height=90&amp;appId=156418954419215" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:54px; height:90px;" allowTransparency="true"></iframe>
			<a href="https://twitter.com/share" target="_blank"	 class="twitter-share-button" data-url="http://necostagram.com/" data-text="にゃーにゃーにゃーヾ(ΦωΦ=)" data-lang="en" data-hashtags="necostagram" data-count="vertical">ツイート</a>
			<a href="http://instagram.com/necostagram" target="_blank"><img id="icon" src="images/icon.jpg" width="56" height="56" alt="necostagramのicon" /></a>
		</div><br /><div id="copyright">Copyright &copy; necostagram All Right Reserved.</div>
	
	</div>
	
	<script type="text/javascript" src="scripts/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="scripts/jquery.easing.js"></script>
	<script type="text/javascript" src="scripts/jquery.masonry.min.js"></script>
	<script type="text/javascript" src="scripts/jquery.transit.min.js"></script>
	<script type="text/javascript" src="scripts/necostagram.js"></script>
	<script type="text/javascript">
		var $accessToken = "<?php echo $at; ?>";
		var $username = "<?php echo $username; ?>";
		var $profile_picture = "<?php echo $profile_picture; ?>";
		var $id = "<?php echo $id; ?>";
		//var cookieName = "neco_token_id";
		//var period = 1;
		//var expires = new Date(new Date().getTime() + (60 * 60 * 24 * 1000 * period)).toGMTString();
		//if ($username){
			//var data = $accessToken+'/'+$username;
			//document.cookie = 'neco_token_id' + "=" + escape(data) + "; expires=" + expires;
		//} else {
		//}
	</script>
		<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
		
</body>
</html>


