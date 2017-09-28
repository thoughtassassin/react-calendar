import React, {Component} from "react";
import PropTypes from "prop-types";
import Calendar from "./calendar";
import moment from "moment";

class CalendarComponent extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            currentDate: ''
        };

        this.setCurrentDate = this.setCurrentDate.bind(this);
    }

    componentDidMount() {
        this.calendar = new Calendar(this.props.id);
        this.calendar.renderCalendar();
        this.calendar.htmlElement.addEventListener('click', this.setCurrentDate);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.textInputValue != this.state.currentDate) {
            if (!nextProps.textInputValue.includes('_') && moment(nextProps.textInputValue, ["MM/DD/YYYY"], true).isValid()) {
                this.calendar.setDate(nextProps.textInputValue);
				this.setState({currentDate: this.calendar.currentDate()});
			}
        }
    }

    setCurrentDate(event) {
        if(event.target.className.indexOf('calendar-day filled') > -1){
            this.setState({currentDate: this.calendar.currentDate()});
            this.props.handleChange(this.calendar.currentDate());
        }
    }

    render() {
        return (
            <div>
                <div
                    className={this.props.showCalendar ? 'calendar' : 'hidden'}
                    id={this.props.id} />
            </div>
        );
    }
}

CalendarComponent.propTypes = {
    children: PropTypes.object,
    calendarId: PropTypes.string,
    handleChange: PropTypes.func,
    showCalendar: PropTypes.bool,
    textInputValue: PropTypes.string,
    id: PropTypes.string
};

export default CalendarComponent;