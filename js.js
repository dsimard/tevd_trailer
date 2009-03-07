$("document").ready(function() {
	$("h1, h2").hide();

	var lapse = function() {
		setTimeout(lightning, rnd(800, 4000));
	}

	var lightning = function() {
		nbImages = 3;
		$("#lightning")
			.css("backgroundImage", "url(back"+rnd(1, 3).toString()+".jpg)")
			.css("backgroundPosition", rnd(-400, 0)+"px 0px")
			.show()
			.fadeOut(rnd(850, 1150), lapse);
	}
	
	var rnd = function(min, max) {
		max |= min;
		if (max <= min) min = 0;
		return Math.round(min+(Math.random()*(max-min)));
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
					.css("top", rnd(300)+"px")
					.css("left", rnd(300)+"px")
					.fadeIn(3500, function() {
						$(this).fadeOut(3500);
						showPhrase();
					}).insertBefore($("#lightning"));
			
				phrases.shift();

			}, 0)
		} else {
			$("h1").hide().fadeIn(8000, function() {
				$("h2").fadeIn(6000, function() {
					$("h3").fadeIn(5000);
				});
			});
		}
	};
	
	showPhrase();
	

	$("<embed>")
		.attr("src", "under.mp3")
		.attr("autostart", false)
		.attr("loop", true)
		.attr("width", 0)
		.attr("height", 0)
		.appendTo($("body"));
});
