import * as $ from 'jquery';

import './view/modal.scss';
import { InnerOptions } from './inner-options-interface';

export abstract class ModalModule {

    protected view: JQuery = null;
    protected event: any;
    protected datas: any = {};
    protected innerOptions: InnerOptions = {
        height: 500,
        width: 600,
        unit: 'px'
    };

    public constructor(event: any, innerOptions?: InnerOptions) {
        this.event = event;
        this.setOptions(innerOptions);
    }

    public abstract show(): void;

    protected closeHandler(): void {
        $('button.close').on(
            'click',
            (event: any): void => {
                console.log('Remove view from DOM');
                this.view.remove(); // Removes view from DOM
            }
        );
    }

    protected loadView(): Promise<void> {
        console.log('Retrieve template');

        return new Promise<void>((resolve) => {
            $.get(
                'src/modules/modal/view/modal.html',
                (htmlContent: any) => {
                    this.view = $(htmlContent);
                    this.view.find('.inner-modal').css(
                        'height',
                        this.innerOptions.height + this.innerOptions.unit
                    )
                    .css(
                        'width',
                        this.innerOptions.width + this.innerOptions.unit
                    );
                    resolve();
                }
            );
        });
    }

    private setOptions(innerOptions: InnerOptions): void {
        if (innerOptions) {
            this.innerOptions.height = innerOptions.height;
            this.innerOptions.width = innerOptions.width;
            if (!this.innerOptions.unit) {
                this.innerOptions.unit = 'px';
            } else {
                this.innerOptions.unit = innerOptions.unit;
            }
        }
    }
}