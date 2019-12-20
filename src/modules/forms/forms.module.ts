import * as $ from 'jquery';

export abstract class FormsModule {

    protected form: JQuery;
    protected controls: Array<JQuery>;
    protected submit: JQuery;
    protected formContent: any = {};

    protected types: any = 
        {
            text: 'input[type="text"]',
            email: 'input[type="email"]',
            switch: 'input[type="checkbox"]'
        };

    protected _isValid: boolean = false;

    public constructor(form: JQuery) {
        this.form = form;

        this.submit = this.form.find('button[type="submit"]');

        this.controls = new Array<JQuery>();

        this.hydrate();

        this.setHandlers();
    }

    public isValid(): boolean {
        return this._isValid;
    }

    protected abstract check(): void;
    protected abstract process(event: any): void;

    public setHandlers(): void {
        this.form.on(
            'change keyup',
            (event: any): void => this.check()
        );
        this.form.on(
            'submit',
            (event: any): void => this.process(event)

        )
    }

    protected values(): any {
        return this.formContent;
    }
    
    protected setValues(): void {
        for(const control of this.controls) {
            if (control.attr('type') !== 'checkbox') {
                this.formContent[control.attr('name')] = control.val().toString();
            }
        }
    }

    protected textValidator(control: JQuery): boolean {
        return control.val().toString().trim().length > 0;
    }

    protected checkboxValidator(control: JQuery) {
        return control.is(':checked');
    }

    protected emailValidator(control: JQuery) {
        if (control.val().toString().trim().length > 0) {
           let regex: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
           return regex.test(control.val().toString().toLowerCase());
        }
        return false;
    }

    private hydrate(): void {
        for (const key in this.types) {
            this.form.find(this.types[key]).each((index: number, element: HTMLElement) => {
                this.controls.push($(element));
            });
        }
    }
}