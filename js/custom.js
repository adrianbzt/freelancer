$( document ).ready(function() {
var dateFormat = 'YYYY-MM-DD';

buttons = new Buttons();

$(function() {

    var start = moment();
    var maxDate = moment();
    
    let selectedDay = start.format(dateFormat);

	$('#freelancer-calendar span').html(selectedDay);
	window.Freelancer.selected_day = selectedDay;
	buttons.updateButtons();

    $('#freelancer-calendar').daterangepicker({
        startDate: start,
        maxDate: maxDate,
        opens: "right",
        linkedCalendars: false,
        singleDatePicker: true,
    });
});

  $('#freelancer-calendar').on('apply.daterangepicker', function(ev, picker) {
  		let selectedDay = picker.startDate.format(dateFormat);
    	$('#freelancer-calendar span').html(selectedDay);
     	window.Freelancer.selected_day = selectedDay;
     	buttons.updateButtons();
  });


$('#work-button').on('click', function() {
	buttons.updateWorkButtonStatus();

});

$('#break-button').on('click', function() {
	if(window.Freelancer.taken_daily_breaks <= window.Freelancer.max_daily_breaks) {
		buttons.updateBreakButtonStatus();
	} else {
		alert('You cannot take so many breaks! Try tomorrow :)');
		$('#break-button').val('No more beaks left');
		$('#break-button').prop('disabled', true);
        $('#break-button').attr("data-pause-in-progress", 0);
	}
	

});

});