/*
  ヾ(ΦωΦ=)にゃーにゃーにゃー
*/

var XMLLoadCommand = (function(){
	function XMLLoadCommand() {
		this.load = function(max, collback){
			$.ajax({
				url: "https://api.instagram.com/v1/tags/ねこ/media/recent?client_id=f39149070d2d4c5fb73cdddcaf00e0dd",
				data: {
					count: max.toString()
				},
				dataType: 'jsonp',
				error: function(jqXHR, textStatus, errorThrown) {
					return collback(textStatus);
				},
				success: function(data, textStatus, jqXHR) {
					return collback(data);
				}
			});
		};
	}
	return XMLLoadCommand;
})()
