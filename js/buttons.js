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
        let breaksLeft = window.Freelancer.max_daily_breaks - window.Freelancer.taken_daily_breaks;

        $('#break-button').val('Start Break (' + breaksLeft + ')');

        let activityTime = moment();
        let activity = new Activity();
        let activityRecord = activity.returnActivity('Start Work', activityTime.format('HH:mm:ss'));
        window.Freelancer.start_work_day_timestamp = activityTime;

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


        let hour = moment.duration(1, 'hours');

        activityTime.add(8*hour);

        let activity = new Activity();
        let activityRecord = activity.returnActivity('Work End', activityTime.format('HH:mm:ss'));
        let isPauseInProgress = $('#break-button').attr("data-pause-in-progress");

        if(isPauseInProgress == 1) { 
          let breaksLeft = window.Freelancer.max_daily_breaks - window.Freelancer.taken_daily_breaks;          
          $('#break-button').val('Start Break (' + breaksLeft + ')');
          $('#break-button').attr("data-pause-in-progress", 0);
          $('#break-button').removeClass("btn-warning");
          $('#break-button').addClass("btn-success");

          let activity = new Activity();
          let activityRecord = activity.returnActivity('Break Ended (' + breaksLeft + ')', activityTime.format('HH:mm:ss'));
          $('#daily_activity').append(activityRecord);   

          let hour = moment.duration(1, 'hours');

          activityTime.add(hour);

          window.Freelancer.break_time_stop_timestamp = activityTime; 
          window.Freelancer.break_time_duration += window.Freelancer.break_time_stop_timestamp - window.Freelancer.break_time_start_timestamp + hour;

        }
        window.Freelancer.end_work_day_timestamp = activityTime;

        window.Freelancer.hours_worked_this_day = Math.round((window.Freelancer.end_work_day_timestamp - window.Freelancer.start_work_day_timestamp -  window.Freelancer.break_time_duration)/hour, 0);

        $('#daily_activity').append(activityRecord);
        $('#summary').append(activity.returnSummary());

      }
    }

    updateBreakButtonStatus() {
      let isPauseInProgress = $('#break-button').attr("data-pause-in-progress");
      let activityTime = moment();
      let hour = moment.duration(1, 'hours');

      activityTime.add(hour);

      if(isPauseInProgress == 0) { 
        let breaksLeft = window.Freelancer.max_daily_breaks - window.Freelancer.taken_daily_breaks;          
        $('#break-button').val('Stop Break (' + breaksLeft + ')');
        $('#break-button').attr("data-pause-in-progress", 1);
        $('#break-button').addClass("btn-warning");

        let activity = new Activity();
        let activityRecord = activity.returnActivity('Break Started (' + breaksLeft + ')', activityTime.format('HH:mm:ss'));
        $('#daily_activity').append(activityRecord);
        window.Freelancer.taken_daily_breaks += 1;
        window.Freelancer.break_time_start_timestamp = activityTime;

      } else {

        let breaksLeft = window.Freelancer.max_daily_breaks - window.Freelancer.taken_daily_breaks;
        $('#break-button').val('Start Break (' + breaksLeft + ')');

        $('#break-button').attr("data-pause-in-progress", 0);
        $('#break-button').removeClass("btn-warning");
        $('#break-button').addClass("btn-success");  

        window.Freelancer.break_time_stop_timestamp = activityTime; 
        window.Freelancer.break_time_duration += window.Freelancer.break_time_stop_timestamp - window.Freelancer.break_time_start_timestamp + hour;

        let activity = new Activity();
        let activityRecord = activity.returnActivity('Break Ended (' + (breaksLeft + 1) + ')', activityTime.format('HH:mm:ss'));
        $('#daily_activity').append(activityRecord);
   


      }
    }
}
