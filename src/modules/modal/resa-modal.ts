import * as $ from 'jquery';

import { ModalModule } from "./modal.module";
import { InnerOptions } from "./inner-options-interface";
import { ResaForm } from './resa-form';

export class ResaModal extends ModalModule {
    private readonly price: number = 8;

    public constructor(
        event: any,
        innerOptions?: InnerOptions
    ) {
        super(event, innerOptions);

        const form: JQuery = $(this.event.target).parent('form');
        // Get datas of the reservation
        this.datas.form = form;
        this.datas.hour = form.prev('div').children('span').html();
        this.datas.places = form.find('select').children('option:selected').val();
    }

    public show(): void {
        this.loadView().then(() => {

            this.view.find('.modal-header').children('div:first-child').html('Réservation pour la navette de ' + this.datas.hour);
            const price: string = (parseInt(this.datas.places) * this.price).toFixed(2);
            this.view.find('#purchase-detail').html(
                `${this.datas.places} x ${this.price}€ =  ${price} €`
            );

            $('body').append(this.view); // Adds view to body in DOM

            // Attach form Handler
            const formHandler: ResaForm = new ResaForm($('#purchase-form'));

            this.closeHandler();

            // Attach done handler
            this.dismiss();
        });
    }

    private dismiss(): void {
        this.view.on(
            'resaDone',
            (event: any, data: any): void => {
                console.log(`Receive done process : ${JSON.stringify(data)}`);
                // Append original form to data
                data.form = this.datas.form;
                $('button.close').trigger('modalDismiss', data).trigger('click');
            }
        )
    }
}