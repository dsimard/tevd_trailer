var bodyBackground = "http://img27.imageshack.us/img27/7315/back1i.jpg";
var lightnings = [
	{url:"http://img14.imageshack.us/img14/8394/bodyf.jpg", yOffset:0},
	{url:"http://farm2.static.flickr.com/1160/1272045819_ee2919522f_o.jpg", yOffset:-900},
	{url:"http://farm3.static.flickr.com/2417/2053473900_68aa754870_o.jpg", yOffset:-120},
	{url:"http://farm2.static.flickr.com/1220/1218754772_d85c2e3407_o.jpg", yOffset:-120},
]

var lightning_images = [];
for (var lightning in lightnings) {
	lightning_images.push(lightnings[lightning].url);
}

var mp3Url = "http://1715839795222571267-a-azankatech-com-s-sites.googlegroups.com/a/azankatech.com/timmyevolved/Home/under.mp3";

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
      .attr("value","niftyplayer.swf?file="+mp3Url)
    )
    .append($("<param>")
    	.attr("quality","high")
    )
    .append($("<param>")
      .attr("bgcolor","#000000")
    )       

	$("#music")
		.append($("<embed>")
		  .attr("src","niftyplayer.swf?file="+mp3Url)
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
	$("body").css("backgroundImage", "url(body.jpg)");

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
	var lightning = function() {
		var l = lightnings[rnd(lightnings.length-1)];
		$("#lightning")
			.css("backgroundImage", "url("+l.url+")")
			.css("backgroundPosition", rnd(-400, 0)+"px "+l.yOffset+"px")
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
	

