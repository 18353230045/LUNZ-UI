import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

// import { CustomValidators } from 'ng2-validation';

@Component({
    selector: 'app-input-text,[app-input-text]',
    templateUrl: './input-text.component.html',
    styleUrls: ['./input-text.component.scss']
})

export class InputTextComponent implements OnInit {
    // form: FormGroup;

    @Input() type?: String = 'text';
    @Input() layoutType?: String = 'inline';
    @Input() label?: any = null;
    @Input() placeholder?: String = ``;
    @Input() value?: any;
    @Input() size?: String = 'middle';

    @Input() leftIcon?: String;
    @Input() rightIcon?: String;
    @Input() iconLeftText?: String;
    @Input() iconRightText?: String;

    @Input() formControlName?: any;
    @Input() validationRules?: any;
    @Input() form?: any;

    @Output() valueChange = new EventEmitter();
    @Output() clickIconEventer = new EventEmitter();

    constructor(
        // private formBuilder: FormBuilder
    ) {
        // this.form = this.formBuilder.group({
        //     email: [null, [CustomValidators.email]]
        // });
    };

    ngOnInit() {
    };

    // get value
    selected(event: any) {
        this.valueChange.emit(event);
    };

    // click icon
    clickIcon() {
        this.clickIconEventer.emit(this.value);
    };
};
