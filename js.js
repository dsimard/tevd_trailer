var bodyBackground = "http://img14.imageshack.us/img14/8394/bodyf.jpg";
var lightnings = [
	{url:"http://img27.imageshack.us/img27/7315/back1i.jpg", yOffset:0},
	{url:"http://farm2.static.flickr.com/1160/1272045819_ee2919522f_o.jpg", yOffset:-900},
	//{url:"http://farm3.static.flickr.com/2417/2053473900_68aa754870_o.jpg", yOffset:-120},
	{url:"http://farm2.static.flickr.com/1220/1218754772_d85c2e3407_o.jpg", yOffset:-120},
]

var lightning_images = [];
for (var lightning in lightnings) {
	lightning_images.push(lightnings[lightning].url);
}

var mp3Url = "http://1715839795222571267-a-azankatech-com-s-sites.googlegroups.com/a/azankatech.com/timmyevolved/Home/under.mp3";
mp3Url = "under.mp3";

var phrases = ["It all began with a great idea that came to life in a sudden",
  "It was promising but unfinished",
  "So we stumbled... and fell",
  "We let the idea grow",
  "and what was once an ambitious experiment",
  "has evolved into a complete solution where all pieces fit together",
  "It's no more a time tracking tool over Instant Messaging",
  "It is what it was meant to be.",
  "We understand",
  "that with great potential...",
  "comes great expectations"
 ];
var privateBeta = [
	"I want to participate to your amazing private beta",
	"I can't wait to try timmyEvolved but for now, I have to go to the bathroom",
	"would you marry me?",
	"I want to be part of the private beta of the best project monitoring app in the world"
];

$(document).ready(function() {	
	$("#show_credits, #close_credits").click(function() {
		$("#more").toggle();
	});
	
	if (document.location.hash == "#serge") {
		$("body").css("backgroundImage", "url(body.jpg)");
		$("h1,h2,h3").show();
		$("#more").show();
		return;
	}
	
	// private beta
	$("#beta").click(function() {
		document.location = "http://twitter.com/home?status=" + 
			escape("#tevd_private @timmyevolved " + privateBeta[rnd(privateBeta.length-1)]);
	});
	
	loadingMsg("Loading music...");
	niftyplayer("niftyPlayer").load(mp3Url);

	preloadImages(lightning_images.concat([bodyBackground]));
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

// Preload images
function preloadImages(images) {
	loadingMsg("loading images...");
	var nbImagesLoaded = 0;
	
	var imageLoaded = function(img) {
		nbImagesLoaded++;
		
		loadingMsg("Image loaded : "+img.src);
		
		// If ready, start 
		if (nbImagesLoaded == images.length) {
			startAnimation();
		}
	}

	for (var image in images) {
		loadingMsg("Loading "+images[image])
		var img = new Image();
		$(img)
			.load(function() {
				imageLoaded(this);
			})
			.attr("src", images[image])
	}
}

function startAnimation() {
	// set background for body
	$("body").css("backgroundImage", "url("+bodyBackground+")");

	$("#loading").fadeOut(1500, function() {
	 	// Start music
		niftyplayer("niftyPlayer").play();
	
		// Stop music when clicking
		$("#nomusic").show().click(function() {
			niftyplayer("niftyPlayer").stop();
			$(this).fadeOut();
		})
	
		showLigthnings();
		
		// Wait for the song to play to show phrases
		var waitPlaying = setInterval(function() {
			if (niftyplayer("niftyPlayer").getPlayingState() == "playing") {
				showPhrase();
				clearInterval(waitPlaying);
			}
		}, 100);
	});
}

// Show a lightning after some time
function showLigthnings() {
	var lightning = function() {
		var l = lightnings[rnd(lightnings.length-1)];
		$("#lightning")
			.css("backgroundImage", "url("+l.url+")")
			.css("backgroundPosition", rnd(-400, 0)+"px "+l.yOffset+"px")
			.show()
			.fadeOut(rnd(850, 1150), showLigthnings);
	}

	setTimeout(lightning, rnd(800, 3000));
}

// Cycling phrases
function showPhrase() {
		if (phrases.length > 0) {
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
		} else {
			$("h1").hide().fadeIn(8000, function() {
				$("h2").fadeIn(6000, function() {
					$("h3").fadeIn(5000);
				});
			});
		}
	};	
	

