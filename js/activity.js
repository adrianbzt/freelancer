class Activity {

	returnActivity(activityName, activityTime) {

		return `<div class="row entry-row">
          <div class="col-md-6">
            ` + activityName + `
          </div>
          <div class="col-md-6">
            ` + activityTime + `
          </div>
        </div>`;
	}

	returnSummary() {
		return `<div class="row entry-row">
					<div class="col-md-6">
						Total Hours Today:
					</div>
					<div class="col-md-6">
						` + window.Freelancer.hours_worked_this_day +`
					</div>
				</div>
				<div class="row entry-row">
					<div class="col-md-6">
						Total Hours This Week
					</div>
					<div class="col-md-6">
						` + window.Freelancer.hours_worked_this_week +`
					</div>
				</div>
				<div class="row entry-row">
					<div class="col-md-6">
						Total Hours This Month
					</div>
					<div class="col-md-6">
						` + window.Freelancer.hours_worked_this_month +`
					</div>
				</div>`
	}
}