import * as $ from 'jquery';

import { ModalModule } from "./modal.module";
import { InnerOptions } from "./inner-options-interface";

export class ResaModal extends ModalModule {
    public constructor(
        userChoice: any,
        innerOptions?: InnerOptions
    ) {
        super(userChoice, innerOptions);
    }

    public show(): void {
        this.loadView().then((view) => {
            this.view = $(view);
            
            this.view.find('.inner-modal').css(
                'height',
                this.innerOptions.height + this.innerOptions.unit
            )
            .css(
                'width',
                this.innerOptions.width + this.innerOptions.unit
            );
            this.view.find('.modal-header').children('div:first-child').html('Réservation pour la navette de ' + this.datas.hour);
            const price: string = (parseInt(this.datas.places) * 8).toFixed(2);
            this.view.find('.modal-body').html(
                `${this.datas.places} x 8€ =  ${price} €`
            );
            $('body').append(this.view); // Adds view to body in DOM
            console.info('Place close button handler');
            this.closeHandler();
        });
    }
}