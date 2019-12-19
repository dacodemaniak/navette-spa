import * as $ from 'jquery';

import './view/modal.scss';
import { InnerOptions } from './inner-options-interface';

export class ModalModule {

    private view: JQuery = null;
    private height: number;
    private width: number;

    public constructor(innerOptions?: InnerOptions) {
        this.loadView().then((view) => {
            let unit: string = 'px';
            if (innerOptions) {
                if (innerOptions.unit) {
                    unit = innerOptions.unit;
                }
            }

            this.view = $(view);
            console.log('okay guys, modal html is loaded');
            this.view.find('.inner-modal').css(
                'height',
                innerOptions ? innerOptions.height + unit : '300px'
            )
            .css(
                'width',
                innerOptions ? innerOptions.width + unit : '300px'
            );
            $('body').append(this.view);
        });
    }

    private loadView(): Promise<HTMLElement> {
        return new Promise<HTMLElement>((resolve) => {
            $.get(
                'src/modules/modal/view/modal.html',
                (htmlContent: any) => {
                    resolve(htmlContent);
                }
            );
        });
    }
}