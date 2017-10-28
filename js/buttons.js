class Buttons {

  updateButtons() {

    let start = moment();
    let maxDate = moment();
    let dateFormat = 'YYYY-MM-DD'
    let selectedDay = window.Freelancer.selected_day;
    let currentDay = start.format(dateFormat);

    if(selectedDay == currentDay) {
      $('#work-button').prop("disabled", false);
      $('#break-button').prop("disabled", true);
      $('#work-button').addClass("btn-success");
    } else {
      $('#work-button').prop("disabled", true);
      $('#break-button').prop("disabled", true);
      $('#work-button').removeClass("btn-success");
      $('#break-button').removeClass("btn-success");      
  }
}
    updateWorkButtonStatus() {
      let isWorkInProgress = $('#work-button').attr("data-work-in-progress");

      if(isWorkInProgress == undefined) {
        $('#work-button').attr("data-work-in-progress", 1);
        $('#work-button').addClass("btn-danger");
        $('#work-button').val('Stop Work');
        $('#break-button').prop("disabled", false);
        $('#break-button').addClass("btn-success");

        let activityTime = moment();
        let activity = new Activity();
        let activityRecord = activity.returnActivity('Start Work', activityTime.format('HH:mm:ss'));
        window.Freelancer.start_work_day_timestamp = activityTime.format('HH:mm:ss');

        $('#daily_activity').append(activityRecord);

      } else if(isWorkInProgress == 1) {
        $('#work-button').attr("data-work-in-progress", 0);
        $('#work-button').removeClass("btn-danger");
        $('#work-button').addClass("btn-default");
        $('#work-button').prop("disabled", true);
        $('#work-button').val('Job Done');

        $('#break-button').prop("disabled", true);
        $('#break-button').addClass("btn-default");      

        let activityTime = moment();

        var oneHourInMilliseconds = moment.duration(1, 'hours');

        let activity = new Activity();
        let activityRecord = activity.returnActivity('Work End', activityTime.format('HH:mm:ss'));
        window.Freelancer.end_work_day_timestamp = activityTime.format('HH:mm:ss');
        $('#daily_activity').append(activityRecord);
        $('#summary').append(activity.returnSummary());

      }
    }

    updateBreakButtonStatus() {
      let isPauseInProgress = $('#break-button').attr("data-pause-in-progress");
      let activityTime = moment();

      if(isPauseInProgress == 0) { 
        $('#break-button').val('Stop Break');
        $('#break-button').attr("data-pause-in-progress", 1);

        let activity = new Activity();
        let activityRecord = activity.returnActivity('Break Started', activityTime.format('HH:mm:ss'));
        $('#daily_activity').append(activityRecord);
        window.Freelancer.taken_daily_breaks += 1; 

      } else {
        $('#break-button').val('Start Break');
        $('#break-button').attr("data-pause-in-progress", 0);        

        let activity = new Activity();
        let activityRecord = activity.returnActivity('Break Ended', activityTime.format('HH:mm:ss'));
        $('#daily_activity').append(activityRecord);

      }
    }
}