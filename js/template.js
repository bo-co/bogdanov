var aside = $("div.container > div.workspace > div.aside"),
	asideWidth = null,
	vhCSS = null;

function loadCSS(source, type) {
	var s = document.getElementsByTagName('head')[0],
		sc = document.createElement('link');
		sc.rel = type;
		sc.href = source;
		s.appendChild(sc);
	}
	
function resize() {
	/* убрать комментирование ниже, если нужен resizable */
	/* if (window.innerWidth > 1200) {
		asideWidth = Math.round(aside.parent().innerWidth()*0.3);
		}
	else if (window.innerWidth < 1201 && window.innerWidth > 960) {
		asideWidth = Math.round(aside.parent().innerWidth()*0.35);
		}
	else if (window.innerWidth < 961 && window.innerWidth > 720) {
		asideWidth = Math.round(aside.parent().innerWidth()*0.4);
		}
	else {
		asideWidth = 0;
		} */
	/* убрать комментирование выше, если нужен resizable */		
	if (!vhCSS) {
		loadCSS('css/vh.css?' + $.now(), 'stylesheet');
		vhCSS = true;
		}
	setTimeout(function() {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, 50);
	}

$(document).ready(function() {	
	resize();
	/* убрать комментирование ниже, если нужен resizable */
	/* aside.resizable({
		handles : "e",
		minWidth : 0,
		resize : function() {
			window.baron__aside.update();
			window.baron__content.update();
			}
		}); */
	/* убрать комментирование выше, если нужен resizable */
	if (aside.find("div.ui-resizable-handle").lenght !== 0) {
		aside.find("div.ui-resizable-handle").append('<ul><li></li><li></li></ul>');
		}
	aside.find("div.ui-resizable-handle > ul > li:first-child").on("touchstart mousedown", function(e) {
		e.preventDefault();
		/* добавить комментирование ниже, если нужен resizable */
		aside.animate({
  			width: 0
			}, 250, function() {
			window.baron__aside.update();
			window.baron__content.update();
			if (!aside.hasClass("min")) {
				aside.removeClass("max").addClass("min");
				}
  			});
  		/* добавить комментирование выше, если нужен resizable */
		/* убрать комментирование ниже, если нужен resizable */
		/* if (Math.round(aside.width()) > asideWidth) {
			aside.animate({
  				width: asideWidth
				}, 250, function() {
				window.baron__aside.update();
				window.baron__content.update();
  				});
			}
		else {
			aside.animate({
  				width: 0
				}, 250, function() {
				window.baron__aside.update();
				window.baron__content.update();
  				});
			} */
		/* убрать комментирование выше, если нужен resizable */
		});
	aside.find("div.ui-resizable-handle > ul > li:last-child").on("touchstart mousedown", function(e) {
		e.preventDefault();
		/* добавить комментирование ниже, если нужен resizable */
		aside.animate({
  			width: '100%'
			}, 250, function() {
			window.baron__aside.update();
			window.baron__content.update();
			if (!aside.hasClass("max")) {
				aside.removeClass("min").addClass("max");
				}
  			});
  		/* добавить комментирование выше, если нужен resizable */
		/* убрать комментирование ниже, если нужен resizable */
		/* if (Math.round(aside.width()) >= asideWidth) {
			aside.animate({
  				width: aside.parent().innerWidth()
				}, 250, function() {
				window.baron__aside.update();
				window.baron__content.update();
  				});
			}
		else {
			aside.animate({
  				width: asideWidth
				}, 250, function() {
				window.baron__aside.update();
				window.baron__content.update();
  				});
			} */
		/* убрать комментирование выше, если нужен resizable */
		});
	$("div.container > div.panel > ul").on("click", function() {
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
    window.baron__aside = baron({
    	root: "div.container > div.workspace > div > div.baron__aside",
        scroller: "div.container > div.workspace > div > div.baron > div.baron__scroller",
        bar: "div.container > div.workspace > div > div.baron > div.baron__track > div.baron__bar"
        });
    window.baron__content = baron({
    	root: "div.container > div.workspace > div > div.baron__content",
        scroller: "div.container > div.workspace > div > div.baron > div.baron__scroller",
        bar: "div.container > div.workspace > div > div.baron > div.baron__track > div.baron__bar"
        });
   	return false;
	});