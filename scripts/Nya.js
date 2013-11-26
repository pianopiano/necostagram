/*
  ヾ(ΦωΦ=)にゃーにゃーにゃー
*/
var Nya = (function() {
	function Nya() {
		var ext = null;
		var SOUNDS = null;
		this.init = function() {
			ext = (function() {
				var ext = "";
				var audio = new Audio();
				if (audio.canPlayType("audio/ogg") == 'maybe') {
					ext = "ogg";
				} else if (audio.canPlayType("audio/mp3") == 'maybe') {
					ext = "mp3";
				} else if (audio.canPlayType("audio/wav") == 'maybe') {
					ext = "wav";
				}
				return ext;
			})();
			
			SOUNDS = [
				new Audio("sounds/1." + ext),
				new Audio("sounds/2." + ext),
				new Audio("sounds/3." + ext)
			]
		};
		
		this.play = function() {
			var n = Math.floor(Math.random()*(SOUNDS.length));
			SOUNDS[n].play();
            SOUNDS[n] = new Audio( SOUNDS[n].src );
		}
	}
	return Nya;
})()