import * as $ from 'jquery';
import { InnerOptions } from './../modules/modal/inner-options-interface';
import { ResaModal } from './../modules/modal/resa-modal';

/**
 * UserChoiceComponent
 * @author Aélion
 * @version 1.0.0
 *  Handle user choice
 */
export class UserChoiceComponent {


    public constructor() {
        this.changeHandler();
        this.buttonHandler();
    }

    private buttonHandler() {
        $('form button').on(
            'click',
            (event: any): void => {
                const modalSettings: InnerOptions = {
                    width: 600,
                    height: 500
                };
                // Get datas of the reservation
                const userChoice: any = {};
                const form: JQuery = $(event.target).parent('form');
                userChoice.hour = form.prev('div').children('span').html();
                userChoice.places = form.find('select').children('option:selected').val();
                
                const modal: ResaModal = new ResaModal(userChoice, modalSettings);
                modal.show();
            }
        );
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
                form.find('select').children('option').prop('selected', false);
                form.find('select').children('option:first').attr('selected', 'selected');
                form.find('select').children('option:first').prop('selected', true);
                form.children('button').attr('disabled', 'disabled');
            }
        });
    }
}