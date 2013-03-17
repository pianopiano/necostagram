<?php
    $client_id = "f3af4e71702d492793ff32c61af1bbdc";
    $client_secret = "75a28fdc2bb54b3095e420ee02ea357f";
    $redirect_uri = "http://pianopiano.jp/neco.stagram/index.php";
    $token_uri = 'https://api.instagram.com/oauth/access_token';
    $at = "12170108.f3af4e7.b7987e3570414c8b8eec7431058360d7";
     
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
	    echo "<div id='access_token'>".$json->access_token."</div>";
    } else {
	    echo "<div id='access_token'>".$at."</div>";
    }
    //echo "username=".$json->user->username;
    //echo "profile_picture=".$json->user->profile_picture;
    //echo "id=".$json->user->id;
    //echo "full_name=".$json->user->full_name;
//https://api.instagram.com/oauth/authorize/?client_id=f3af4e71702d492793ff32c61af1bbdc&redirect_uri=http://pianopiano.jp/neco.stagram/index.php&response_type=code&scope=likes
?>
<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=0.6,user-scalable=yes,maximum-scale=0.6">
	<title>necostagram</title>
	<link rel="stylesheet" href="styles/base.css" type="text/css" />
	<link rel="stylesheet" href="styles/necostagram.css" type="text/css" />
	<script type="text/javascript" src="scripts/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="scripts/jquery.easing.js"></script>
	<script type="text/javascript" src="scripts/jquery.masonry.min.js"></script>
	<script type="text/javascript" src="scripts/necostagram.js"></script>
</head>
<body id="body">
	<div id="login">
		<p>Login</p>
	</div>
	<header id="header">
		<h1>necostagram</h1>
	</header>
	<div id="necoContainer" class="clearfix" style="position: relative;">
		<img src="images/necoLoader.gif" id="necoLoader" width="80" height="152">
	</div>
	<footer id="footer">
		<div id="footer-inner">
			<div id="pageTop"><a href="#header"><img src="images/j1.gif" alt="j1" width="100" height="100"></a></div>
		</div>
	</footer>
</body>
</html>


