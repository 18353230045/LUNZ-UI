import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';

@Component({
    selector: 'app-input-text-demo',
    templateUrl: './input-text-demo.component.html',
    styleUrls: ['./input-text-demo.component.scss']
})

export class InputTextDemoComponent implements OnInit {
    form: FormGroup;

    value1: any;
    value2: any;
    value3: any;
    value4: any;
    value5: any;
    value6: any;
    value7: any;
    value8: any;
    value9: any;
    value10: any;
    value11: any;
    value12: any;
    value13: any;
    value14: any;
    value15: any;

    constructor(
        private formBuilder: FormBuilder
    ) {
        this.form = this.formBuilder.group({
            email: [null, [CustomValidators.email]]
        });
    };

    ngOnInit() {
    };

    getClickIconEventer(event: any) {
        this.value10 = event;
    };

};
