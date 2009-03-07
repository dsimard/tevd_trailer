/*
http://www.flickr.com/photos/deansouglass/1271941375/
http://www.flickr.com/photos/cfrausto/41327420/sizes/l/
http://www.flickr.com/photos/deansouglass/1272045819/sizes/l/
http://www.flickr.com/photos/ronalmog/2053473900/sizes/l/
http://www.flickr.com/photos/akeg/1218754772/sizes/l/
*/
$("document").ready(function() {
	console.log(niftyplayer);

	var nbImages = 5;
	var nbImagesLoaded = 0;	
	
	var imageLoaded = function(img) {
		nbImagesLoaded++;
		
		loadingMsg(img.src);
		
		// If ready, start 
		if (nbImagesLoaded == nbImages-1) {
			$("#loading").fadeOut(1500, function() {
				showLigthnings();
				showPhrase();

		   	// Start music
				niftyplayer("niftyplayer").play();
				
				// Stop music when clicking
				$("#nomusic").show().click(function() {
					niftyplayer("niftyplayer").stop();
					$(this).fadeOut();
				})
			});
		}
	}

	var preloadImages = function() {
		for (var i = 1; i <= 5; i++) {
			var img = new Image();
			$(img)
				.load(function() {
					imageLoaded(this);
				})
				.attr("src", "back" + i + ".jpg")
		}
	}

	preloadImages();
	
	var loadingMsg = function(text) {
		$("#loading").append($("<div>").text(text))
	}
	
	var showLigthnings = function() {
		setTimeout(lightning, rnd(800, 3000));
	}

	var lightning = function() {
		nbImages = 3;
		$("#lightning")
			.css("backgroundImage", "url(back"+rnd(1, nbImages).toString()+".jpg)")
			.css("backgroundPosition", rnd(-400, 0)+"px 0px")
			.show()
			.fadeOut(rnd(850, 1150), showLigthnings);
	}
	
	var rnd = function(min, max) {
		max |= min;
		if (max <= min) min = 0;
		return Math.round(min + (Math.random()*(max-min)));
	}

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
    "comes great expectations",
   ]
	var showPhrase = function() {
		if (phrases.length > 0) {
			setTimeout(function() {
				$("<span>")
					.hide()
					.text(phrases[0])
					.css("top", rnd($(window).height()-130)+"px")
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
	
  $("<object id='music'>")
    .attr("classid", "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000")
    .attr("codebase","http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0")
    .attr("width","0")
    .attr("height","0")
    .attr("id","niftyPlayer")
    .append($("<param>")
      .attr("name","movie")
      .attr("value","niftyplayer.swf?file=under.mp3")
    )
    .append($("<param>")
    	.attr("quality","high")
    )
    .append($("<param>")
      .attr("bgcolor","#000000")
    )       

    $("#music")
      .append($("<embed>")
        .attr("src","niftyplayer.swf?file=under.mp3")
        .attr("quality","high")
        .attr("bgcolor","#000000")
        .attr("width","0")
        .attr("height","0")
        .attr("name","niftyplayer")
        .attr("type","application/x-shockwave-flash")
        .attr("pluginspage","http://www.macromedia.com/go/getflashplayer")
        .appendTo($("body"))
      );  
      
    loadingMsg("composing music...")
});
