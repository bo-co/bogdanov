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
	if (window.innerWidth > 1200) {
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
		}				
	if (!vhCSS) {
		loadCSS('css/vh.css?' + $.now(), 'stylesheet');
		vhCSS = true;
		}
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
	}

$(document).ready(function() {	
	resize();
	aside.resizable({
		handles : "e",
		minWidth : 0
		});
	if (aside.find("div.ui-resizable-handle").lenght !== 0) {
		aside.find("div.ui-resizable-handle").append('<ul><li></li><li></li></ul>');
		}
	aside.find("div.ui-resizable-handle > ul > li:first-child").on("click", function() {
		if (Math.round(aside.width()) > asideWidth) {
			aside.animate({
  				width: asideWidth
				}, 250);
			}
		else {
			aside.animate({
  				width: 0
				}, 250);
			}
		});
	aside.find("div.ui-resizable-handle > ul > li:last-child").on("click", function() {
		if (Math.round(aside.width()) >= asideWidth) {
			aside.animate({
  				width: aside.parent().innerWidth()
				}, 250);
			}
		else {
			aside.animate({
  				width: asideWidth
				}, 250);
			}
		});
	$("div.container > div.panel > ul").on("click", function() {
		if ($("div.container").hasClass("opened")) {
			$("div.container").removeClass("opened").addClass("closed");
			}
		else {
			$("div.container").removeClass("closed").addClass("opened");
			}	
		});
   	return false;
	});