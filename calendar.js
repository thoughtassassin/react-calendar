
const cal_days_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const cal_months_labels = ['January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'];

const cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const cal_current_date = new Date();

function Calendar(htmlElement, month, year, day) {
    this.day = (isNaN(day) || day == null) ? cal_current_date.getDate() : day;
    this.month = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
    this.year  = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;
    this.html = '';
    this.currentMonth = this.month;
    this.currentYear = this.year;
    if (!htmlElement) {
        const newDiv = document.createElement('div');
        newDiv.classList.add('calendar');
        newDiv.id = 'calendar' + Math.floor(Math.random() * 1000000);
        document.body.appendChild(newDiv);
        this.htmlElement = newDiv;

    } else {
        this.htmlElement = document.getElementById(htmlElement);
    }
}

Calendar.prototype.generateHTML = function(){
    // get first day of month
    const firstDay = new Date(this.year, this.month, 1);
    const startingDay = firstDay.getDay();

    // find number of days in month
    let monthLength = cal_days_in_month[this.month];

    // compensate for leap year
    if (this.month == 1) { // February only!
        if((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0){
            monthLength = 29;
        }
    }

    // do the header
    const monthName = cal_months_labels[this.month];
    let html = '<table class="calendar-table">';
    html += '<tr><th colspan="7">';
    html += '<span class="previous">< </span>';
    html +=  monthName + "&nbsp;" + this.year;
    html += '<span class="next"> ></span>';
    html += '</th></tr>';
    html += '<tr class="calendar-header">';
    for(let i = 0; i <= 6; i++ ){
        html += '<td class="calendar-header-day">';
        html += cal_days_labels[i];
        html += '</td>';
    }
    html += '</tr><tr>';

    // fill in the days
    let day = 1;
    // this loop is for is weeks (rows)
    for (let i = 0; i < 9; i++) {
        // this loop is for weekdays (cells)
        for (let j = 0; j <= 6; j++) {
            if (day <= monthLength && (i > 0 || j >= startingDay)) {
                if (day == this.day && this.currentMonth === this.month && this.currentYear === this.year) {
                    html += '<td class="calendar-day filled selected-day">';
                } else {
                    html += '<td class="calendar-day filled">';
                }
                html += day;
                day++;
            } else {
                html += '<td class="calendar-day">';
            }
            html += '</td>';
        }
        // stop making rows if we've run out of days
        if (day > monthLength) {
            break;
        } else {
            html += '</tr><tr>';
        }
    }
    html += '</tr></table>';

    this.html = html;
};

Calendar.prototype.getHTML = function() {
    return this.html;
};

Calendar.prototype.previous = function() {
    if (this.month > 0) {
        this.month--;
    } else {
        this.month = 11;
        this.year--;
    }
};

Calendar.prototype.next = function() {
    if (this.month < 11) {
        this.month++;
    } else {
        this.month = 0;
        this.year++;
    }
};

Calendar.prototype.selectDay = function(day) {
    this.day = day;
    this.currentMonth = this.month;
    this.currentYear = this.year;
    this.renderCalendar();
};

Calendar.prototype.setDate = function(dateString) {
    const newDate = new Date(dateString);

    if (newDate != 'Invalid Date') {
        let month = newDate.getMonth();
        let day = newDate.getDate();
        let year = newDate.getFullYear();

        this.day = day;
        this.currentMonth = month;
        this.month = this.currentMonth;
        this.currentYear = year;
        this.year = this.currentYear;
        this.renderCalendar();
    } else {
        //console.error('Date is not valid');
    }

};

Calendar.prototype.getPrevious = function() {
    this.previous();
    this.renderCalendar();
};

Calendar.prototype.getNext = function() {
    this.next();
    this.renderCalendar();
};

Calendar.prototype.currentDate = function() {
    let paddedMonth = '';
    let paddedDay   = '';

    if (this.currentMonth < 9) {
        paddedMonth = '0' + (this.currentMonth + 1);
    } else {
        paddedMonth = (this.currentMonth + 1);
    }
    if (this.day < 10) {
        paddedDay = '0' + this.day;
    } else {
        paddedDay = this.day;
    }

    return paddedMonth + '/' + paddedDay + '/' + this.currentYear;
};

Calendar.prototype.renderCalendar = function() {
    const self = this;
    this.generateHTML();
    this.htmlElement.innerHTML = this.getHTML();
    let previousArrow = this.htmlElement.querySelector('.previous');
    previousArrow.addEventListener('click', () => this.getPrevious());
    let nextArrow = this.htmlElement.querySelector('.next');
    nextArrow.addEventListener('click', () => this.getNext());
    let calendarDays = this.htmlElement.querySelectorAll('.calendar-day.filled');
    let daysArray = Array.prototype.slice.call(calendarDays);
    daysArray.forEach( (element) => {
        element.addEventListener('click', element => {
            self.selectDay(element.target.textContent);
        }, true);
    });
};

export default Calendar;
