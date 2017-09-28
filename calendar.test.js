import Calendar from './calendar';

describe('calendar.js', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="calDiv"></div>';
    });
    describe('Calendar function', () => {
        it('should build a calendar instance without parameters', () => {
            let testCalendar = new Calendar();
            expect(testCalendar.day).toBeDefined();
            expect(testCalendar.month).toBeDefined();
            expect(testCalendar.year).toBeDefined();
            expect(testCalendar.currentMonth).toBeDefined();
            expect(testCalendar.htmlElement).toBeDefined();
        });

        it('should build a calendar instance with parameters', () => {
            let testCalendar = new Calendar('calDiv', 6, 2017, 24);
            expect(testCalendar.day).toEqual(24);
            expect(testCalendar.month).toEqual(6);
            expect(testCalendar.year).toEqual(2017);
            expect(testCalendar.currentMonth).toEqual(6);
            expect(testCalendar.currentYear).toEqual(2017);
            expect(testCalendar.htmlElement.id).toEqual('calDiv');
        });
    });

    describe('Generating HTML', () => {
        beforeEach(() => {
            document.body.innerHTML = '<div id="calDiv"></div>';
        });
       it('should generate calendar HTML', () => {
           let testCalendar = new Calendar('calDiv', 6, 2017, 24);
           testCalendar.generateHTML();
           expect(testCalendar.html).toContain('table');
       });

       it('should generate 29 days in February for leap years', () => {
           let testCalendar = new Calendar('calDiv', 1, 2016, 1);
           testCalendar.generateHTML();
           expect(testCalendar.html).toContain('29');
       });
    });

    describe('Get HTML', () => {
        it('should return calendar HTML', () => {
            document.body.innerHTML = '<div id="calDiv"></div>';
            let testCalendar = new Calendar('calDiv', 6, 2017, 24);
            testCalendar.generateHTML();
            expect(testCalendar.getHTML()).toContain('table');
        });
    });

    describe('Previous function', () => {
        beforeEach(() => {
            document.body.innerHTML = '<div id="calDiv"></div>';
        });
        it('should decrement the month', () => {
            let testCalendar = new Calendar('calDiv', 6, 2017, 24);
            expect(testCalendar.month).toEqual(6);
            testCalendar.previous();
            expect(testCalendar.month).toEqual(5);
        });
        it('should decrement the month and year if January', () => {
            let testCalendar = new Calendar('calDiv', 0, 2017, 24);
            expect(testCalendar.month).toEqual(0);
            expect(testCalendar.year).toEqual(2017);
            testCalendar.previous();
            expect(testCalendar.month).toEqual(11);
            expect(testCalendar.year).toEqual(2016);

        });
    });

    describe('Next function', () => {
        beforeEach(() => {
            document.body.innerHTML = '<div id="calDiv"></div>';
        });
        it('should increment the month', () => {
            let testCalendar = new Calendar('calDiv', 6, 2017, 24);
            expect(testCalendar.month).toEqual(6);
            testCalendar.next();
            expect(testCalendar.month).toEqual(7);
        });
        it('should increment the month and year if December', () => {
            let testCalendar = new Calendar('calDiv', 11, 2017, 24);
            expect(testCalendar.month).toEqual(11);
            expect(testCalendar.year).toEqual(2017);
            testCalendar.next();
            expect(testCalendar.month).toEqual(0);
            expect(testCalendar.year).toEqual(2018);

        });
    });

    describe('Selecting a day', () => {
        it('should increment the month', () => {
            document.body.innerHTML = '<div id="calDiv"></div>';
            let testCalendar = new Calendar('calDiv', 0, 2017, 24);
            expect(testCalendar.day).toEqual(24);
            expect(testCalendar.currentMonth).toEqual(0);
            expect(testCalendar.currentYear).toEqual(2017);
            testCalendar.previous();
            testCalendar.selectDay('12');
            testCalendar.selectDay('25');
            expect(testCalendar.day).toEqual('25');
            expect(testCalendar.currentMonth).toEqual(11);
            expect(testCalendar.currentYear).toEqual(2016);
        });
    });

    describe('Set a date with a date string', () => {
        it('should set a date with a valid date string', () => {
            beforeEach(() => {
                document.body.innerHTML = '<div id="calDiv"></div>';
            });
            let testCalendar = new Calendar('calDiv', 0, 2017, 24);
            expect(testCalendar.day).toEqual(24);
            expect(testCalendar.currentMonth).toEqual(0);
            expect(testCalendar.currentYear).toEqual(2017);
            testCalendar.setDate('10/31/2018');
            expect(testCalendar.day).toEqual(31);
            expect(testCalendar.currentMonth).toEqual(9);
            expect(testCalendar.currentYear).toEqual(2018);
        });

        it('should not set a date with an invalid date string', () => {
            let testCalendar = new Calendar('calDiv', 0, 2017, 24);
            expect(testCalendar.day).toEqual(24);
            expect(testCalendar.currentMonth).toEqual(0);
            expect(testCalendar.currentYear).toEqual(2017);
            testCalendar.setDate('99/99/9999');
            expect(testCalendar.day).toEqual(24);
            expect(testCalendar.currentMonth).toEqual(0);
            expect(testCalendar.currentYear).toEqual(2017);
        });
    });

    describe('Get previous', () => {
        it('should get the previous and render', () => {
            document.body.innerHTML = '<div id="calDiv"></div>';
            let testCalendar = new Calendar('calDiv', 0, 2017, 24);
            jest.spyOn(testCalendar, 'previous');
            jest.spyOn(testCalendar, 'renderCalendar');
            testCalendar.getPrevious();
            expect(testCalendar.previous).toHaveBeenCalled();
            expect(testCalendar.renderCalendar).toHaveBeenCalled();
        });
    });

    describe('Get next', () => {
        it('should get the previous and render', () => {
            document.body.innerHTML = '<div id="calDiv"></div>';
            let testCalendar = new Calendar('calDiv', 0, 2017, 24);
            jest.spyOn(testCalendar, 'next');
            jest.spyOn(testCalendar, 'renderCalendar');
            testCalendar.getNext();
            expect(testCalendar.next).toHaveBeenCalled();
            expect(testCalendar.renderCalendar).toHaveBeenCalled();
        });
    });

    describe('Current Date function', () => {
        it('should return date in MM/DD/YYYY format', () => {
            document.body.innerHTML = '<div id="calDiv"></div>';
            let testCalendar1 = new Calendar('calDiv', 0, 2017, 2);
            expect(testCalendar1.currentDate()).toEqual('01/02/2017');
            let testCalendar2 = new Calendar('calDiv', 11, 2017, 24);
            expect(testCalendar2.currentDate()).toEqual('12/24/2017');
        });
    });

    describe('Calendar event listeners', () => {
        document.body.innerHTML = '<div id="calDiv"></div>';
        let testCalendar = new Calendar('calDiv', 0, 2017, 2);
        jest.spyOn(testCalendar, 'getNext');
        jest.spyOn(testCalendar, 'getPrevious');
        jest.spyOn(testCalendar, 'selectDay');
        testCalendar.renderCalendar();
        let previousButton = document.querySelector('.previous');
        let nextButton = document.querySelector('.next');
        let calendarDay = document.querySelector('.calendar-day.filled');
        previousButton.click();
        expect(testCalendar.getPrevious).toHaveBeenCalled();
        nextButton.click();
        expect(testCalendar.getNext).toHaveBeenCalled();
        calendarDay.click();
        expect(testCalendar.selectDay).toHaveBeenCalled();
    });
});