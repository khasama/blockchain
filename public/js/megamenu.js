// carousel
$(document).ready(function()
{


if($('.bbb_viewed_slider').length)
{
var viewedSlider = $('.bbb_viewed_slider');

viewedSlider.owlCarousel(
{
loop:true,
margin:30,
autoplay:true,
autoplayTimeout:6000,
nav:false,
dots:false,
responsive:
{
0:{items:1},
575:{items:2},
768:{items:3},
991:{items:4},
1199:{items:6}
}
});

if($('.bbb_viewed_prev').length)
{
var prev = $('.bbb_viewed_prev');
prev.on('click', function()
{
viewedSlider.trigger('prev.owl.carousel');
});
}

if($('.bbb_viewed_next').length)
{
var next = $('.bbb_viewed_next');
next.on('click', function()
{
viewedSlider.trigger('next.owl.carousel');
});
}
}


});

//button show mtm
function metamask() {
    var x = document.getElementById("metamask");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
function closemtm() {
  var y = document.getElementById("metamask");
  if (y.style.display === "none") {
    y.style.display = "block";
  } else {
    y.style.display = "none";
  }
}

//button login/reg
function log() {
  var z = document.getElementById("log");
  if (z.style.display === "block") {
    z.style.display = "none";
  } else {
    z.style.display = "block";
  }
}

// Root
$.fn.megamenu=function(e){function r(){$(".megamenu").find("li, a").unbind();if(window.innerWidth<=768){o();s();if(n==0){$(".megamenu > li:not(.showhide)").hide(0)}}else{u();i()}}function i(){$(".megamenu li").bind("mouseover",function(){$(this).children(".dropdown, .megapanel").stop().fadeIn(t.interval)}).bind("mouseleave",function(){$(this).children(".dropdown, .megapanel").stop().fadeOut(t.interval)})}function s(){$(".megamenu > li > a").bind("click",function(e){if($(this).siblings(".dropdown, .megapanel").css("display")=="none"){$(this).siblings(".dropdown, .megapanel").slideDown(t.interval);$(this).siblings(".dropdown").find("ul").slideDown(t.interval);n=1}else{$(this).siblings(".dropdown, .megapanel").slideUp(t.interval)}})}function o(){$(".megamenu > li.showhide").show(0);$(".megamenu > li.showhide").bind("click",function(){if($(".megamenu > li").is(":hidden")){$(".megamenu > li").slideDown(300)}else{$(".megamenu > li:not(.showhide)").slideUp(300);$(".megamenu > li.showhide").show(0)}})}function u(){$(".megamenu > li").show(0);$(".megamenu > li.showhide").hide(0)}var t={interval:250};var n=0;$(".megamenu").prepend("<li class='showhide'><span class='title'>MENU</span><span class='icon1'></span><span class='icon2'></span></li>");r();$(window).resize(function(){r()})}