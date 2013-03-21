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
		<div id="fb-root"><div class="fb-like" data-href="http://necostagram.com/" data-send="false" data-layout="button_count" data-width="450" data-show-faces="true"></div></div>
		<script>(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = "//connect.facebook.net/ja_JP/all.js#xfbml=1&appId=156418954419215";
		  fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));</script>
	</footer>
</body>
</html>


