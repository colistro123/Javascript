<script type="text/javascript">
$(document).ready(function(){
	/* Global Variables */
	window.cityid = -1;
	window.uitoggled = 0;
	window.lastactivityid = 0;
	window.loadedamount = 0;
	window.loadednewcontent = 0;
	/* End of Global Variables */
	$("#shoopbarvideo").hide();
	$("#blackui").hide();
	$("#livesearch").centersearch();
	$("#livesearch").hide();
	//$('#loadcontent').load('includes/pageload.php?screennr=1').fadeIn("slow");
	$('#loadcontent').load('includes/pageload.php?screennr=1', function() {
		$("#countrycontainerdiv").hide();
		$('#commentsdiv').load('includes/showmessages.php?cityid=-1&&loadmorein=0&&limit=15').fadeIn("slow");
	});
});

function showHot(evt, from) {
	evt.preventDefault();
	if(from == 1) { //From the main page
		toggleui();
		$('#mainuibox').load('includes/showmessages.php?cityid=' + cityid + '&&loadmorein=1' + '&&limit=15');
	}
	if(from == 2) {
		$('#mainuibox').load('includes/showmessages.php?cityid=' + cityid + '&&loadmorein=1' + '&&limit=15');
	}
}

var auto_refresh;
auto_refresh = 0;

//.focus
$(window).hover(function() {
//alert('on tab');
        if(!auto_refresh)
        {
        	auto_refresh = setInterval(
			function reloadstring()
			{
				$.get("includes/checknewactivity.php", function(activity){
				//alert("Data Loaded: " + activity);
				var arractivity = activity.split("+");
				var useractivity = arractivity[0];
				var lastactiveid = arractivity[1];
				console.log("useractivity: " + useractivity + "lastactiveid:" + lastactiveid);
				if (useractivity == 1) 
    			{
        			$('#commentsdiv').load('includes/showmessages.php?cityid=-1&&loadmorein=0&&limit=15').fadeIn("slow");
					if(window.lastactivityid != lastactiveid) {
						playSound("audio/messagenotif.wav");
						window.lastactivityid = lastactiveid;
						window.loadedamount++;
						document.title = "(" + window.loadedamount + ")" + " While Ago - Share what's happening nearby";
					}
   	 			}
				if (useractivity == 2) 
    			{
        			$('#commentsdiv').load('includes/showmessages.php?cityid=-1&&loadmorein=0&&limit=15').fadeIn("slow");
					if(window.lastactivityid != lastactiveid) {
						playSound("audio/messagenotif.wav");
						window.lastactivityid = lastactiveid;
						window.loadedamount++;
						document.title = "(" + window.loadedamount + ")" + " While Ago - Share what's happening nearby";
					}
   	 			}
				});
			}, 2500); // refresh every 2500 milliseconds
        }
});

function showResult(str)
{
	if (str.length==0)
  	{
  		document.getElementById("livesearch").innerHTML="";
  		document.getElementById("livesearch").style.border="0px";
  		return;
  	}
	if (window.XMLHttpRequest)
  	{// code for IE7+, Firefox, Chrome, Opera, Safari
  		xmlhttp=new XMLHttpRequest();
  	}
	else
  	{// code for IE6, IE5
  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}
	xmlhttp.onreadystatechange=function()
  	{
  		if (xmlhttp.readyState==4 && xmlhttp.status==200)
    	{
    		document.getElementById("livesearch").innerHTML=xmlhttp.responseText;
    	}
	}
	$("#livesearch").fadeIn(1000);
	$("#livesearch").empty().html('<center><img src="images/loading.gif" /></center>');
	$("#livesearch").centersearch();
	xmlhttp.open("GET","includes/search.php?search="+str,true);
	xmlhttp.send();
}

function searchcountry(str, fieldid)
{
	var fieldget = document.getElementById(fieldid);
	var printin = fieldget.getAttribute('data-target'); 
	$.get("includes/searchcountry.php?search="+str, function(countryresult){
		//alert("Data String: " + str + "Print IN #" + printin);
		var country_result_field = document.getElementById(printin);
		country_result_field.unselectable = "on";
    	// Disable in Mozilla
    	country_result_field.style.MozUserSelect = 'none';
    	// Safari/Chrome
    	country_result_field.style.webkitUserSelect = 'none';
    	// Other browsers
    	country_result_field.style.userSelect = 'none';
		$('#' + printin).css({'cursor':'pointer'});
		$('#' + printin).attr('readonly', true);
		$('#' + printin).attr('readonly', 'readonly');
		$('#' + printin).html('');
		$('#' + printin).html(countryresult);
		$('#' + printin).fadeIn(1500);
	});
}

jQuery.fn.centersearch = function () {
    this.css("position","fixed");
    this.css("left", (($(window).width() - this.outerWidth()) / 2 - 85) + $(window).scrollLeft() + 100 + "px");
    return this;
}

function loadMore(amount) {
	window.loadednewcontent = 1;
	$('.loadmorebtncontent').html('Loading More...<br>');
	$('#commentsdiv').load('includes/showmessages.php?cityid=-1&&loadmorein=0&&limit='+amount, function() {
		window.loadednewcontent = 0;
	});
}

$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() > $(document).height() - 85 && window.loadednewcontent == 0) {
       $(".loadmorebtn").click();
   }
});

function onUIEventSuccess(value) {
	/* Code Here*/
	$(".uiSuccessDialog").remove();
	$("<div></div>", { "class":"uiSuccessDialog", "id":"uiSuccessDialog" }).appendTo("html");
	$("<div></div>", { "class":"uiSuccessDialogText", "id":"uiSuccessDialogText" }).appendTo("#uiSuccessDialog");
	$("#uiSuccessDialog").fadeIn("slow").delay(3500);
	$("#uiSuccessDialogText").html(value);
	$("#uiSuccessDialog").fadeOut("slow");
}

function showTopComments(evt) {
	evt.preventDefault();
	toggleui();
	$('#mainuibox').load('includes/showtopmessages.php?limit=100');
}
function morenewsin(evt, from, cityid) {
	evt.preventDefault();
	if(from == 1) {
		toggleui();
		$('#mainuibox').load('includes/showmessages.php?cityid=' + cityid + '&&loadmorein=1' + '&&limit=15');
	}
	if(from == 2) {
		$('#mainuibox').load('includes/showmessages.php?cityid=' + cityid + '&&loadmorein=1' + '&&limit=15');
	}
}

function replyto(evt, frompost) {
	evt.preventDefault();
	if(frompost) {
		if(window.uitoggled == 0) {
			toggleui();
		}
		$('#mainuibox').load('includes/showreplyinterface.php?replyto=' + frompost);
		$("#mainuibox").scrollTop($("#mainuibox").height());
	}
}

function flagcomment(evt, postid) {
	evt.preventDefault();
	if (confirm("Are you sure you want to flag this comment?\nYou cannot undo this action.")) {
		$.ajax({
			type: "POST",
			url: "includes/flagcomment.php",
			data: { postflag: postid },
			beforeSend: function(html) { // this happens before actual call
				$("#" + postid + ".boxcomment").slideUp();
			},
			success: function(html){ // this happens after we get results 
				$("#resultscomments").fadeIn('slow');
				$('#commentsdiv').load('includes/showmessages.php?cityid=-1&&loadmorein=0&&limit=15').fadeIn("slow");
				$("#resultscomments").append(html);
				onUIEventSuccess(html);
			}
		});
	}
}

function likecomment(evt, postid) {
	evt.preventDefault();
	$.ajax({
		type: "POST",
		url: "includes/likecomment.php",
		data: { postlike: postid },
		beforeSend: function(html) { // this happens before actual call
			/* */
		},
		success: function(html){ // this happens after we get results 
			$("#resultscomments").fadeIn('slow');
			$('#commentsdiv').load('includes/showmessages.php?cityid=-1&&loadmorein=0&&limit=15').fadeIn("slow");
			$("#resultscomments").append(html);
			onUIEventSuccess(html);
		}
	});
}


function playSound(audiourl) {
	var audio = document.createElement("audio");
	audio.src = audiourl;
	audio.addEventListener("ended", function () {
		document.removeChild(this);
	}, false);
    audio.play();   
}

function load_others(evt, toload) {
	evt.preventDefault();
	if(toload) {
		toggleui();
		$('#mainuibox').load('includes/load_others.php?toload=' + toload);
		$("#mainuibox").scrollTop($("#mainuibox").height());
	}
}

function postreplymessage(evt, frompost) {
        // getting the value that user typed
        var umessage   = $("#replytobox").val();
        //alert('test:' + umessage);
        var uposter;
        uposter = -1;
        if(umessage) {
            // ajax call
            $.ajax({
                type: "POST",
                url: "includes/postreply.php",
                data: { message: umessage, poster: uposter, relatedid: frompost },
                beforeSend: function(html) { // this happens before actual call
                    $("#resultscomments").html('');
                    $('#replytobox').val('');
                    $("#commentsdiv").fadeIn('slow');
                    //$("#profcommentsdiv").html('<center><img src="images/loading.gif" /></center>');
               },
                    success: function(html){ // this happens after we get results 
                    $("#resultscomments").fadeIn('slow');
                    $('#commentsdiv').load('includes/showmessages.php?cityid=-1&&loadmorein=0&&limit=15').fadeIn("slow");
                    /*
                     $('#commentsdiv').load('includes/showmessages.php?type=1',function() {
    			     $('#delete a');
    				});
    				*/
                    $("#resultscomments").append(html);
					onUIEventSuccess(html);
					toggleui();
              }
            });
        }
        return false;
}

function toggleui() {
	if(window.uitoggled == 0) {
		$("#blackui").fadeIn(1000);
		$(".mainuibox").remove();	
		$(".whitebox").remove();
		$(".closebuibtn").remove();
		//$(".uiclock").remove();	
		$("<div></div>", { "class":"closebuibtn", "id":"closebuibtn" }).appendTo(".blackui");
		$("<div></div>", { "class":"whitebox", "id":"whitebox" }).appendTo(".blackui");
    	$("<div></div>", { "class":"mainuibox", "id":"mainuibox" }).appendTo(".whitebox");
		$("#closebuibtn").css({"height":"auto","min-width":"5px","float":"right","margin":"35px","color":"#FFFFFF"});
		$("#closebuibtn").html("<a href='javascript:void(0);' onclick='toggleui();'><img src='images/dialog_close.png'/></a>");
		$("#whitebox").css({"height":"300px","width":"800px","margin-left":"auto","margin-right":"auto","margin-top":"150px"});
		//$("<div></div>", { "class":"uiclock", "id":"uiclock" }).css({'position':'fixed','right':'250px','bottom':'100px'}).appendTo("body");
		window.uitoggled = 1;
		//startTime();
		} else {
		$("#blackui").fadeOut(1000);
		$(".closebuibtn").remove();
		//$(".uicontainerbox").remove();
		//$(".uiclock").remove();
		window.uitoggled = 0;
	}
}

$(function postprofmessage() {

    $("#uicomment_btn_small").live('click', function(){
        // getting the value that user typed
        var umessage   = $("#commentboxui").val();
        //alert('test:' + umessage);
        var uposter;
        uposter = -1;
        var cityidsend;
        cityidsend = window.cityid;
        if(umessage) {
            // ajax call
            $.ajax({
                type: "POST",
                url: "includes/postmessage.php",
                data: { message: umessage, poster: uposter, cityidsent: cityidsend },
                beforeSend: function(html) { // this happens before actual call
                    $("#resultscomments").html('');
                    $('#commentboxui').val('');
                    $("#commentsdiv").fadeIn('slow');
                    //$("#profcommentsdiv").html('<center><img src="images/loading.gif" /></center>');
               },
                    success: function(html){ // this happens after we get results 
                    $("#resultscomments").fadeIn('slow');
                    $('#commentsdiv').load('includes/showmessages.php?cityid=-1&&loadmorein=0&&limit=15').fadeIn("slow");
                    /*
                     $('#commentsdiv').load('includes/showmessages.php?type=1',function() {
    			     $('#delete a');
    				});
    				*/
					onUIEventSuccess(html);
                    $("#resultscomments").append(html);
              }
            });
        }
        return false;
    });
});

function focusfield(id)
{
	$('#'+id).val('');
	$('#'+id).focus();
}

function sToggle(id)
{
	$('#'+id).slideToggle('fast');
}

function selectcity(evt, id) {
	evt.preventDefault();
	var cityname = $('#'+id+'.cityselectorui').text();
	console.log('id' + id + 'name' + cityname);
	$('#citynameui1.cityname').html(cityname);
	window.cityid = id;
}

function loadvideo(evt, from, videoid, closeoption)
{
	evt.preventDefault();
    //alert(vidid);
    if(window.uitoggled == 1)
    {
    	toggleui();
    }
    $("#shoopbarvideo").slideDown(1500);
    $('#shoopbarvideo').load('includes/loadvideo.php?from=' + from + '&ytvideoid=' + videoid + '&optionclose='+ closeoption); //pop down thingy
    //$("#shoopbarfriendrequests").slideToggle();
    //$('#friendrequests').load('loadfrequests.php?username='+username).fadeIn("slow"); 
}

function loadimage(evt, from, imgid, closeoption) {
	evt.preventDefault();
	if(from == 1) {
	toggleui();
	$('.whitebox').css({'height':'auto','width':'auto','background-color':'rgba(0,0,0,0)'});
	$('.mainuibox').css({'height':'auto','width':'auto','background-color':'rgba(0,0,0,0)'});
	//$('#mainuibox').load('includes/loadimage.php?from=' + from + '&imgid=' + imgid + '&optionclose='+ closeoption);
		$('#mainuibox').load('includes/loadimage.php?from=' + from + '&imgid=' + imgid + '&optionclose='+ closeoption, function() {
			$('.loadedimageshow').each(function() {
				var maxWidth = 720; // Max width for the image
				var maxHeight = 480;    // Max height for the image
				var ratio = 0;  // Used for aspect ratio
				var width = $(this).width();    // Current image width
				var height = $(this).height();  // Current image height

				// Check if the current width is larger than the max
				if(width > maxWidth) {
					ratio = maxWidth / width;   // get ratio for scaling image
					$(this).css("width", maxWidth); // Set new width
					$(this).css("height", height * ratio);  // Scale height based on ratio
					height = height * ratio;    // Reset height to match scaled image
				}
				var width = $(this).width();    // Current image width
				var height = $(this).height();  // Current image height
				// Check if current height is larger than max
				if(height > maxHeight) {
					ratio = maxHeight / height; // get ratio for scaling image
					$(this).css("height", maxHeight);   // Set new height
					$(this).css("width", width * ratio);    // Scale width based on ratio
					width = width * ratio;    // Reset width to match scaled image
				}
			});
		});
	}
}

function closevideo(evt)
{
	evt.preventDefault();
    $('#shoopbarvideo').slideUp(1500); //pop up thingy
    $('#videoloadui').html(''); //stops the video
}
</script>

<script type="text/javascript">
$(document).ready(function() {
	$('#commentboxui').live('keyup keypress', function() {
      	$(this).height('');
      	var brCount = this.value.split('\n').length;
      	this.rows = brCount;
    	var areaH = this.scrollHeight,
    	lineHeight = $(this).css('line-height').replace('px',''),
    	calcRows = Math.floor(areaH/lineHeight);
      	this.rows = calcRows;
	});
	$('#replytobox').live('keyup keypress', function() {
		$(this).height('');
      	var brCount = this.value.split('\n').length;
      	this.rows = brCount;
    	var areaH = this.scrollHeight,
    	lineHeight = $(this).css('line-height').replace('px',''),
    	calcRows = Math.floor(areaH/lineHeight);
      	this.rows = calcRows;
		$("#mainuibox").scrollTop($("#replytobox").height()+100);
	});
});
</script>

<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=511650732196347";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
</script>
