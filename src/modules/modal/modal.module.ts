import * as $ from 'jquery';

import './view/modal.scss';

export class ModalModule {

    private view: JQuery = null;

    public constructor() {
        this.loadView().then((view) => {
            this.view = $(view);
            console.log('okay guys, modal html is loaded');
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