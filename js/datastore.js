window.Freelancer = {};

Object.defineProperties(window.Freelancer, {
     selected_day: {
        value: '',
        writable: true,
        configurable: true,
        enumerable: false,
    },
     max_daily_breaks: {
        value: 4,
        writable: true,
        configurable: true,
        enumerable: false,
    },
     taken_daily_breaks: {
        value: 0,
        writable: true,
        configurable: true,
        enumerable: false,
    },         
     start_work_day_timestamp: {
        value: '',
        writable: true,
        configurable: true,
        enumerable: false,
    },
    end_work_day_timestamp: {
        value: '',
        writable: true,
        configurable: true,
        enumerable: false,
    },
    hours_worked_this_day: {
        value: 0,
        writable: true,
        configurable: true,
        enumerable: false,
    },             
    hours_worked_this_week: {
        value: 32,
        writable: true,
        configurable: true,
        enumerable: false,
    },
    hours_worked_this_month: {
        value: 120,
        writable: true,
        configurable: true,
        enumerable: false,
    },    
});