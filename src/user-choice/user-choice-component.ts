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
        this.dismissHandler();
    }

    private buttonHandler() {
        $('form button').on(
            'click',
            (event: any): void => {
                const modalSettings: InnerOptions = {
                    width: 600,
                    height: 500
                };

                
                const modal: ResaModal = new ResaModal(event, modalSettings);
                modal.show();
            }
        );
    }

    private changeHandler(): void {
        $('select').on(
            'change',
            (event: any): void => this.manageButton(event)
        );
    }

    private dismissHandler(): void {
        $('body').on(
            'modalDismiss',
            (event: any, data: any) => {

                console.log(`Receive modalDismiss event with : ${JSON.stringify(data)}`);
                
                const form: JQuery = $(data.form);
                
                // Retrieve user choice
                const places: number = parseInt(form.find('select').children('option:selected').val().toString());
                
                if (!isNaN(places)) {
                    // Reset this form...
                    form.find('select').children('option').removeAttr('selected');
                    form.find('select').children('option').prop('selected', false);
                    form.find('select').children('option:first').attr('selected', 'selected');
                    form.find('select').children('option:first').prop('selected', true);
                    form.children('button').attr('disabled', 'disabled');

                    // Update remaining places
                    const remainingPlacesObject: JQuery = form.parents('li').find('div:last-child').children('span');
                    const remainingPlaces: number = parseInt(remainingPlacesObject.html().toString());
                    const updatedPlaces: number = remainingPlaces - places;

                    console.log(`Updated object : ${remainingPlaces} - ${places}`);

                    remainingPlacesObject.html(updatedPlaces.toString());

                    // Remove all unusable options...
                    const theSelect: JQuery = form.find('select');
                    let rowCounter: number = 0;
                    theSelect.children('option').each((index: number, element: HTMLElement) => {
                        if (rowCounter > updatedPlaces) {
                            $(element).remove();
                        }
                        rowCounter++;
                    });
                }


                event.stopPropagation();
                event.preventDefault();
            }
        );
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