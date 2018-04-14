import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';


@Component({
    selector: 'app-form-demo',
    templateUrl: './form-demo.component.html',
    styleUrls: ['./form-demo.component.scss']
})

export class FormDemoComponent implements OnInit {
    form: FormGroup;
    price: Number;
    num: Number;
    saving = false;

    constructor(
        public location: Location,
        private formBuilder: FormBuilder
    ) {
        this.form = this.formBuilder.group({
            category: [null, [Validators.required]],
            whereUnderstand: [null, [Validators.required]],
            price: [null, [Validators.required, CustomValidators.number]],
            email: [null, [CustomValidators.email]],
            abstract: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
            numberRange: [null, [Validators.required, CustomValidators.number, CustomValidators.min(1),
            CustomValidators.max(10)]],
            date: [null, [Validators.required, CustomValidators.date]],
            phone: [null, [Validators.pattern(/^((0\d{2,3}-\d{7,8})|(1[3|4|5|6|7|8|9][0-9]\d{8}))$/)]],
        });
    };

    ngOnInit() {

    };

    submit() {
        // some code

        this.saving = true;

        setTimeout(() => {
            this.location.back();
        }, 2000);
    }
};
