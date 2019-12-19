import * as $ from 'jquery';

import './view/modal.scss';
import { InnerOptions } from './inner-options-interface';

export abstract class ModalModule {

    protected view: JQuery = null;
    
    protected datas: any;
    protected innerOptions: InnerOptions = {
        height: 500,
        width: 600,
        unit: 'px'
    };

    public constructor(datas: any, innerOptions?: InnerOptions) {
        this.datas = datas;
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

    protected loadView(): Promise<HTMLElement> {
        return new Promise<HTMLElement>((resolve) => {
            $.get(
                'src/modules/modal/view/modal.html',
                (htmlContent: any) => {
                    resolve(htmlContent);
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