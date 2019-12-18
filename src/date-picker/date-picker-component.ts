import * as $ from 'jquery';
import * as moment from 'moment';
/**
 * DatePickerComponent
 * @version 1.0.0
 * @author Aélion - 2019
 *  Manage previous and next date buttons
 */
export class DatePickerComponent {
    private readonly previousButton: JQuery = $('[previousDate]');
    private readonly nextButton: JQuery = $('[nextDate]');
    private readonly currentDate: JQuery = $('span#current-date');

    public constructor() {
        this.nextHandler();
        this.previousHandler();
    }

    private nextHandler(): void {
        this.nextButton.on(
            'click',
            (event: any): void => {
                let currentDate = moment(this.currentDate.data('current')).locale('fr');
                currentDate.add(1, 'd');
                
                this.currentDate.html(currentDate.format('D MMM YYYY'));
                this.currentDate.data('current', currentDate.toString());

                // For all cases, activate previous button
                this.previousButton.removeClass('disabled');

                event.preventDefault(); // Prevent fake navigation
            }
        );
    }

    private previousHandler(): void {
        this.previousButton.on(
            'click',
            (event: any): void => {
                let currentDate = moment(this.currentDate.data('current')).locale('fr');
                const firstDate: moment.Moment = moment(this.currentDate.data('first')).locale('fr');

                currentDate.subtract(1, 'd');

                this.currentDate.html(currentDate.format('D MMM YYYY'));

                this.currentDate.data('current', currentDate.toString());
                
                // Check if the first date is reached
                if (currentDate.isSame(firstDate, 'day')) {
                    this.previousButton.addClass('disabled');
                }
                event.preventDefault();
            }
        )
    }

}