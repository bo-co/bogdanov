var aside = $("div.container > div.workspace > div.aside"),
	asideWidth = null,
	vhCSS = null,
	menuHeight = null,
	baron__aside = null,
	baron__article = null,
	baron__scroller = "div.baron > div.baron__scroller",
	baron__bar = "div.baron > div.baron__track > div.baron__bar";

function loadCSS(source, type) {
	var s = document.getElementsByTagName('head')[0],
		sc = document.createElement('link');
		sc.rel = type;
		sc.href = source;
		s.appendChild(sc);
	}
	
function resize() {
	if (window.innerWidth > 960) {
		asideWidth = Math.round(aside.parent().innerWidth()*0.3);
		}
	else {
		asideWidth = "100%";
		}	
	if (!vhCSS) {
		loadCSS("css/vh.css?" + $.now(), "stylesheet");
		vhCSS = true;
		}
	setTimeout(function() {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		baron__aside.update();
		baron__article.update();
		}, 50);
	if (aside.hasClass("max")) {
		aside.width(asideWidth);
		}
	}

$(document).ready(function() {
	if (aside.outerWidth() >= 270) {
		if (!aside.hasClass("max")) {
			aside.removeClass("min").addClass("max");
			}
		}
	else {
		if (!aside.hasClass("min")) {
			aside.removeClass("max").addClass("min");
			}		
		}
	if (aside.find("div.ui-resizable-handle").lenght !== 0) {
		aside.find("div.ui-resizable-handle").append('<ul><li></li></ul>');
		}
	aside.find("div.ui-resizable-handle > ul > li:first-child").on("touchstart mousedown", function(e) {
		e.preventDefault();
		if (!aside.hasClass("min") && aside.hasClass("max")) {
			aside.removeClass("max").addClass("min");
			aside.animate({
  				width: "2.5em"
				}, 250, function() {
				baron__aside.update();
				baron__article.update();
  				});
			}
		else {
			aside.removeClass("min").addClass("max");
			aside.animate({
  				width: asideWidth
				}, 250, function() {
				baron__aside.update();
				baron__article.update();
				});
			}
		});
	$("ul.burger").on("click", function() {
		if ($("div.container").hasClass("opened")) {
			$("div.container").removeClass("opened").addClass("closed");
			$("div.container > nav").animate({
  				right: Math.round(0 - $("div.container > nav").innerWidth() + 50)
				}, 250);
			}
		else {
			$("div.container").removeClass("closed").addClass("opened");
			$("div.container > nav").animate({
  				right: 50
				}, 250);
			}
		});
    $("aside > ul > li > span").on("click", function() {
		if ($(this).parent("li.more").hasClass("selected")) {
			$(this).parent("li.more").find("ul").animate({
  				height: 0
				}, 250);
			$(this).parent("li.more").removeClass("selected");
			}
		else {
			menuHeight = 0;
			$(this).parent("li.more").find("ul").find("li").each(function() {
				menuHeight = Math.round(menuHeight + $(this).outerHeight());
				});
			$(this).parent("li.more").find("ul").animate({
  				height: menuHeight
				}, 250);
			$(this).parent("li.more").addClass("selected");
			}
		});
    baron__aside = baron({
    	root: "div.baron__aside",
        scroller: baron__scroller,
        bar: baron__bar
        }).autoUpdate();
    baron__article = baron({
    	root: "div.baron__article",
        scroller: baron__scroller,
        bar: baron__bar
        }).autoUpdate();
	$("div.baron__scroller").on("scroll", $.debounce(250, true, function(){
    	$(this).next("div.baron__track").find("div.baron__bar").css({"opacity" : "1"});
		}));
	$("div.baron__scroller").on("scroll", $.debounce(1000, function(){
   		$(this).next("div.baron__track").find("div.baron__bar").css({"opacity" : "0"});
		}));
    resize();
   	return false;
	});