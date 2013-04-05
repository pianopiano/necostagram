<?php
	header("Content-type: text/plain; charset=UTF-8");
	$access_token = $_POST['access_token'];
	$media_id = $_POST['media_id'];
	$type = $_POST['type'];
	$AJAX_TYPE = 'none';
	
	//$url = 'https://api.instagram.com/v1/media/'.$media_id.'/likes?'.http_build_query($access_token);
	//$ch = curl_init($url);
	//curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 60);
    //curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    //curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
	if ($type=='POST'){
		$AJAX_TYPE = $type;
		//curl_setopt($ch, CURLOPT_POST, 1);
	} else if ($type=='DELETE'){
		$AJAX_TYPE = $type;
		//curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
	}
	
	if (curl_errno($ch)){
		echo curl_error($ch);
	} else {
		echo '$access_token='.$access_token.'$media_id='.$media_id.'$AJAX_TYPE='.$AJAX_TYPE;
	}
	
    //$result = curl_exec($ch);
    //curl_close($ch);
	
	//if(isset($access_token)&&isset($media_id)&&isset($type)){
	//} else {
	//}
?>