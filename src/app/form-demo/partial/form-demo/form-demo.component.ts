import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';


@Component({
    selector: 'app-form-demo',
    templateUrl: './form-demo.component.html',
    styleUrls: ['./form-demo.component.scss']
})

export class FormDemoComponent implements OnInit {
    form: FormGroup;
    date: any;

    constructor(
        private formBuilder: FormBuilder
    ) {
        this.form = this.formBuilder.group({
            required: [null, [Validators.required]],
            // email: [null, [CustomValidators.email]],
            // number: [null, [CustomValidators.number]],
            // min: [null, [CustomValidators.number, CustomValidators.min(5)]],
            // max: [null, [CustomValidators.number, CustomValidators.max(5)]],
            // numberRange: [null, [CustomValidators.number, CustomValidators.min(5), CustomValidators.max(10)]],
            // maxLength: [null, [Validators.maxLength(5)]],
            // minLength: [null, [Validators.minLength(5)]],
            // lengthRange: [null, [Validators.minLength(5), Validators.maxLength(10)]],
            // date: [null, [CustomValidators.date]],
            // minDate: [null, [CustomValidators.minDate('2018-03-07')]],
            // maxDate: [null, [CustomValidators.maxDate('2018-03-07')]],
            // dateRange: [null, [CustomValidators.minDate('2018-03-01'), CustomValidators.maxDate('2018-03-07')]],
            // phone: [null, [Validators.pattern(/^((0\d{2,3}-\d{7,8})|(1[3|4|5|6|7|8|9][0-9]\d{8}))$/)]],
            // url: [null, [CustomValidators.url]]
        });
    }

    ngOnInit() {
    }

}
