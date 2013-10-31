$(document).ready(function(){
	Cufon.now();
	Cufon.replace('body');
	Cufon.replace('span.linktop', {fontFamily: 'nevis_700',hover: {textShadow: '0px 1px #fff'},textShadow:'0px 1px #fff', hover:true});
	/* Global Variables */
	window.loadednewcontent = 0;
	window.uitoggled = 0;
	/* End of Global Variables */
	loadMore(3);
	$("#blackui").hide();
});

function loadMore(amount) {
	window.loadednewcontent = 1;
	$('.loadmorebtncontent').html('Loading More...<br>');
	$('.news').load('includes/loadnews.php?limit='+amount, function() {
		window.loadednewcontent = 0;
	});
}

$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() > $(document).height() - 85 && window.loadednewcontent == 0) {
       $(".loadmorebtn").click();
   }
});

function toggleui() {
	if(window.uitoggled == 0) {
		$("#blackui").fadeIn(1000);
		$(".mainuibox").remove();	
		$(".whitebox").remove();
		$(".closebuibtn").remove();
		$("<div></div>", { "class":"closebuibtn", "id":"closebuibtn" }).appendTo(".blackui");
		$("<div></div>", { "class":"whitebox", "id":"whitebox" }).appendTo(".blackui");
    	$("<div></div>", { "class":"mainuibox", "id":"mainuibox" }).appendTo(".whitebox");
		$("#closebuibtn").css({"height":"auto","min-width":"5px","float":"right","margin":"60px","color":"#FFFFFF"});
		$("#closebuibtn").html("<a href='javascript:void(0);' onclick='toggleui();'><img src='images/dialog_close.png'></a>");
		$("#whitebox").css({"height":"300px","width":"800px","margin-left":"auto","margin-right":"auto","margin-top":"150px"});
		window.uitoggled = 1;
		} else {
		$("#blackui").fadeOut(1000);
		$(".closebuibtn").remove();
		window.uitoggled = 0;
	}
}

function showStaff(evt) {
	evt.preventDefault();
	toggleui();
	$('#mainuibox').load('showstaff.php');
}
