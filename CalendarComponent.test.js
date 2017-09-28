import React from 'react';
import {shallow, mount} from 'enzyme';
import CalendarComponent from './CalendarComponent';

describe('Calendar Component', () => {
    let props = {
        calendarId: 'calDiv',
        handleChange: jest.fn(),
        showCalendar: false,
        textInputValue: '06/24/2017',
        id: 'calComponent'
    };
    document.body.innerHTML = '<div id="calComponent"></div>';
    const wrapper = mount(<CalendarComponent {...props} />);

    describe('Initializing component', () => {
        it('should have a calendar', () => {
            expect(wrapper.find('#calComponent')).toBeDefined();
        });

        it('should not initialize a currentDate', () => {
            expect(wrapper.state().currentDate).toEqual('');
        });
    });

    describe('Getting a new date from props', () => {
        it('should change calendar current date if it gets new date', () => {
            const setDateSpy = jest.spyOn(wrapper.instance().calendar, 'setDate');
            wrapper.setProps({textInputValue: '12/07/1941'});
            expect(wrapper.instance().calendar.setDate).toHaveBeenCalledTimes(1);
            expect(wrapper.instance().calendar.currentDate()).toEqual('12/07/1941');

            setDateSpy.mockReset();
            setDateSpy.mockRestore();
        });

        it('should do nothing if props do not change value', () => {
            const setDateSpy = jest.spyOn(wrapper.instance().calendar, 'setDate');
            wrapper.setState({currentDate: '08/22/1995'});
            wrapper.setProps({textInputValue: '08/22/1995'});
            expect(wrapper.instance().calendar.setDate).toHaveBeenCalledTimes(0);

            setDateSpy.mockReset();
            setDateSpy.mockRestore();
        });

        it('should do nothing if textInputValue contains _', () => {
            const setDateSpy = jest.spyOn(wrapper.instance().calendar, 'setDate');
            wrapper.setState({currentDate: '08/22/1995'});
            wrapper.setProps({textInputValue: '11/2_/2008'});
            expect(wrapper.instance().calendar.setDate).toHaveBeenCalledTimes(0);

            setDateSpy.mockReset();
            setDateSpy.mockRestore();
        });
    });

    describe('Setting current date from calendar', () => {
        it('should change calendar current date if it gets new date', () => {
            jest.spyOn(wrapper.props(), 'handleChange');
            wrapper.instance().calendar.setDate('01/01/2000');
            wrapper.setState({currentDate: '06/24/2017'});
            expect(wrapper.instance().calendar.currentDate()).toEqual('01/01/2000');
            expect(wrapper.state().currentDate).toEqual('06/24/2017');
            wrapper.instance().setCurrentDate({ target: { className: 'calendar-day filled'}});
            expect(wrapper.state().currentDate).toEqual('01/01/2000');
            expect(wrapper.props().handleChange).toHaveBeenCalledWith('01/01/2000');
        });

        it('should not change calendar current date if target is not calendar-day filled', () => {
            jest.spyOn(wrapper.props(), 'handleChange');
            wrapper.instance().calendar.setDate('01/01/2020');
            wrapper.setState({currentDate: '06/24/2017'});
            expect(wrapper.instance().calendar.currentDate()).toEqual('01/01/2020');
            expect(wrapper.state().currentDate).toEqual('06/24/2017');
            wrapper.instance().setCurrentDate({ target: { className: 'calendar-day'}});
            expect(wrapper.state().currentDate).toEqual('06/24/2017');
            expect(wrapper.props().handleChange).not.toHaveBeenCalledWith("01/01/2020");
        });
    });

    describe('Showing the calendar', () => {
       it('should show the calendar if showCalendar is true', () => {
           expect(wrapper.find('#calComponent').hasClass('hidden')).toBe(true);
           wrapper.setProps({showCalendar: true});
           expect(wrapper.find('#calComponent').hasClass('calendar')).toBe(true);
       });
    });
});