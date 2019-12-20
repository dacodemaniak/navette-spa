import * as $ from 'jquery';
import { FormsModule } from './../forms/forms.module';

export class ResaForm extends FormsModule {

    public constructor(form: JQuery) {
        super(form);
    }

    protected process(event: any): void {
        event.preventDefault();
        this.setValues();
        this.form.trigger('resaDone', this.values());
    }

    protected check(): void {
        let invalidControls: number = 0;
        for (let control of this.controls) {
            if (control.attr('type') == 'text') {
                if (!this.textValidator(control)) {
                    invalidControls = invalidControls + 1;
                }
            } else if (control.attr('type') == 'email') {
                if (!this.emailValidator(control)) {
                    invalidControls = invalidControls + 1;
                }
            } else if (control.attr('type') == 'checkbox') {
                if (!this.checkboxValidator(control)) {
                    invalidControls = invalidControls + 1;
                }
            }
        }
        this._isValid = invalidControls == 0 ? true : false;

        if (this._isValid) {
            this.submit.removeAttr('disabled');
        } else {
            this.submit.attr('disabled', 'disabled');
        }
    }
}