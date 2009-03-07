/*
http://www.flickr.com/photos/deansouglass/1271941375/
http://www.flickr.com/photos/cfrausto/41327420/sizes/l/
http://www.flickr.com/photos/deansouglass/1272045819/sizes/l/
http://www.flickr.com/photos/ronalmog/2053473900/sizes/l/
http://www.flickr.com/photos/akeg/1218754772/sizes/l/
*/
var lightnings = ["back1.jpg", "back2.jpg", "back3.jpg", "back4.jpg", "back5.jpg"]

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
 ];

$("document").ready(function() {	
	$("#show_credits, #close_credits").click(function() {
		$("#show_credits, #credits").toggle();
	});

	preloadMusic();
	preloadImages();
});

// Randomize
function rnd(min, max) {
	max |= min;
	if (max <= min) min = 0;
	return Math.round(min + (Math.random()*(max-min)));
}

// Show a loading message
function loadingMsg(text) {
	$("#loading").append($("<div>").text(text))
}

// Preload music
function preloadMusic() {
	loadingMsg("composing music...");
	
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
}

// Preload images
function preloadImages() {
	loadingMsg("loading images...");
	var nbImagesLoaded = 0;
	
	var imageLoaded = function(img) {
		nbImagesLoaded++;
		
		loadingMsg(img.src);
		
		// If ready, start 
		if (nbImagesLoaded == lightnings.length-1) {
			startAnimation();
		}
	}

	for (lightning in lightnings) {
		var img = new Image();
		$(img)
			.load(function() {
				imageLoaded(this);
			})
			.attr("src", lightnings[lightning])
	}
}

function startAnimation() {
	$("#loading").fadeOut(1500, function() {
	 	// Start music
		niftyplayer("niftyplayer").play();
	
		// Stop music when clicking
		$("#nomusic").show().click(function() {
			niftyplayer("niftyplayer").stop();
			$(this).fadeOut();
		})
	
		showLigthnings();
		showPhrase();
	});
}

// Show a lightning after some time
function showLigthnings() {
	console.log("Showlightnings");
	var lightning = function() {
		$("#lightning")
			.css("backgroundImage", "url("+lightnings[rnd(lightnings.length-1)].toString()+")")
			.css("backgroundPosition", rnd(-400, 0)+"px 0px")
			.show()
			.fadeOut(rnd(850, 1150), showLigthnings);
			console.log($("#lightning").css("backgroundImage"));
	}

	setTimeout(lightning, rnd(800, 3000));
}

// Cycling phrases
function showPhrase() {
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
	

