
$(function ($) {//on page ready


	var mto; //menu timeout

	//menu navigation
	$('#nav li').hover(
    function () {
    	if (mto) {
    		window.clearTimeout(mto);
    	}
    	$(this).parent().find('.menu_shown').removeClass('menu_shown');
    	$(this).addClass('menu_shown');

    },
    function () {
    	mto = window.setTimeout(hideAllMenus, 600);
    });

	$('#nav li ul').mouseover(function () {
		if (mto) {
			window.clearTimeout(mto);
		}
	});

	function hideAllMenus() {
		$('#nav li.menu_shown').removeClass('menu_shown');
	}

	$.fn.makeMenuColumns = function () {
		var className = "menu_col_";
		//outer loop of all first child list elements
		this.each(function () {
			var maxRows = 6;
			var numOfWrappers = 1;
			var parentID = '#' + $(this).parent().attr('id');
			//inner loop of list items within inner UL
			$(this).children().each(function (index) {
				$(this).addClass(className + numOfWrappers);
				if ((index + 1) % maxRows === 0) {
					numOfWrappers++;
				}
			});

			for (var i = 1; i <= numOfWrappers; i++) {
				$(parentID + ' .' + className + i).wrapAll('<div class="menu_column_wrapper" />');
			}
		});
	}

	$('#nav li ul .menu_list_wrapper').makeMenuColumns();

	$('.btp_plan').hover(function () { $(this).find('.btp_plan_icon').toggleClass('noshow'); }, function () { $(this).find('.btp_plan_icon').toggleClass('noshow'); });

	//setup AJAX
	jQuery.ajaxSetup({
		dataType: "jsonp",
		jsonp: "action"
	});

	//check for web fonts
	isFontFaceSupported.ready(function (supported) {
		if (!supported) { $('body').addClass('nofontface'); }
		else { $('body').addClass('fontface'); }
	});

	//remove border
	$('#nav > li:last > a, #sec_nav li:last a, .side_subscription .item:last, .chat_plans:last').css('border', 'none');
	//remove right border and margin
	$('.two_col:nth-child(2n), .two_col_wide:nth-child(2n), .two_col_noborder:nth-child(2n), .three_col:nth-child(3n), .three_col_noborder:nth-child(3n), .service_channel:last, .chat_category:nth-child(3n)').css({ 'borderRight': 'none', 'marginRight': '0px' });

	//global nav
	//$('#nav > li:last ul').css({ 'left': 'auto', 'right': '0' });
	//alert(navigator.platform);
	var adjustedWidth = (navigator.platform == 'iPad') ? '100px' : '117px';
	$('#nav > li:last').css('width', adjustedWidth);
	//get number of top level list elements on the global nav
	var navElements = $('#nav > li').length;
	//get number of top left list elements that should have their child ul positioned right
	var numOfRightElements = Math.round(navElements / 2);
	//position child ul lists to the right on all the right most top level list elements
	for (var i = numOfRightElements; i < navElements; i++) {
		$('#nav > li:eq(' + i + '):last ul').css({ 'left': 'auto', 'right': '0px' });
	}

	//make link lists into columns
	$('.columnize').makeacolumnlists();

	//home
	$('.home_category').each(function (index) {
		var category_link = $(this).find('li:last a').attr('href');
		$(this).find('a:first').attr('href', category_link);
	});
	$('.home_category').hover(function () {
		$(this).css('background-color', '#f5f5f5');
	}, function () {
		$(this).css('background-color', '#fff');
	});

});          //end page ready function                                                         

//link tracking
function trackContactForm(reason){
    if (trackEvent) { trackEvent.event('event.link', { contactReason: '' + reason + '' }); }
};