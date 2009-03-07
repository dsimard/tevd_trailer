$("document").ready(function() {
	$("h1, h2").hide();

	var lapse = function() {
		setTimeout(lightning, 800+(Math.random()*3200));
	}

	var lightning = function() {
		nbImages = 3;
		$("#lightning")
			.css("backgroundImage", "url(back"+Math.round(1+(Math.random()*(nbImages))).toString()+".jpg)")
			.css("backgroundPosition", Math.round(-300+(Math.random()*300)).toString()+"px 0px")
			.show()
			.fadeOut(850+(Math.random()*300), lapse);
	}
	lapse();

  var phrases = ["It all began with a great idea that came to life in a sudden.",
    "It was promising but unfinished",
    "So we stumbled... and failed",
    "We let the idea grow",
    "And what was once an ambitious experiment",
    "Has evolved into a complete solution where all pieces fit together",
    "It's no more a time tracking tool over Instant Messaging",
    "It is what it was meant to be.",
    "We understand",
    "that with great potential...",
    "comes great expectations",/**/
   ]

	var showPhrase = function() {
		if (phrases.length > 0) {
			setTimeout(function() {
				$("<span>")
					.hide()
					.text(phrases[0])
					.css("top", Math.round(Math.random()*300)+"px")
					.css("left", Math.round(Math.random()*300)+"px")
					.fadeIn(3500, function() {
						$(this).fadeTo(3500, 0.001, function() { showPhrase(); })
					}).insertBefore($("#lightning"));
			
				phrases.shift();

			}, 1000)
		} else {
			$("h1").hide().fadeIn(8000, function() {
				$("h2").fadeIn(6000, function() {
					$("h3").fadeIn(5000);
				});
			});
		}
	};
	
	showPhrase();
	

	/*$("<embed>")
		.attr("src", "under60.mp3")
		.attr("autostart", false)
		.attr("loop", true)
		.attr("width", 0)
		.attr("height", 0)
		.appendTo($("body"));*/
});
