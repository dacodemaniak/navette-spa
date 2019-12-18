import * as $ from 'jquery';

/**
 * UserChoiceComponent
 * @author Aélion
 * @version 1.0.0
 *  Handle user choice
 */
export class UserChoiceComponent {

    public constructor() {
        this.changeHandler();
    }
    
    private changeHandler(): void {
        $('select').on(
            'change',
            (event: any): void => this.manageButton(event)
        )
    }


    private manageButton(event: any): void {
        const select: JQuery = $(event.target);

        this.resetForms(select);
        
        const form = select.parents('form');
        const button = form.children('button');

        button.removeAttr('disabled');

    }
    
    private resetForms(select: JQuery<HTMLElement>) {
        $('form').each((index, element) => {
            let form: JQuery = $(element);
            let currentForm: JQuery = select.parents('form');
            if (currentForm.attr('id') !== form.attr('id')) {
                form.find('select').children('option').removeAttr('selected');
                form.find('select').children('option:first').attr('selected', 'selected');
                form.children('button').attr('disabled', 'disabled');
            }
        });
    }
}