function serviceOrderEntry(){
	var combinedOrderNumber = $('.serviceOrderEntry_SO').val();
	
	var serviceOrderStatusURL = '/your-repair/?';
	serviceOrderStatusURL += 'serviceOrderNumber=' + combinedOrderNumber;
	trackEvent.event('event.link',{lastLink: 'track your repair'});
	window.location.href = serviceOrderStatusURL;
}

$(function ($) {
	$('.serviceOrderEntry_SO').keypress(function (event) {
		if (event.keyCode == '13') {
			serviceOrderEntry();
			return false;
		}
	});

	$('.track_btn a').click(function () { serviceOrderEntry(); });
});