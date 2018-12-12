import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';
declare const lengthStorageArea: any;

const password = new FormControl('', CustomValidators.required);
const certainPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-form-validator',
  templateUrl: './form-validator.component.html',
  styleUrls: ['./form-validator.component.scss']
})

export class FormValidatorComponent implements OnInit {
  form: FormGroup;
  dateVal: any = new RegExp(``);

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      required: [null, [Validators.required]],
      email: [null, [CustomValidators.email]],
      number: [null, [CustomValidators.number]],
      min: [null, [CustomValidators.number, CustomValidators.min(5)]],
      max: [null, [CustomValidators.number, CustomValidators.max(5)]],
      numberRange: [null, [CustomValidators.number, CustomValidators.min(5), CustomValidators.max(10)]],
      maxLength: [null, [Validators.maxLength(5)]],
      minLength: [null, [Validators.minLength(5)]],
      lengthRange: [null, [Validators.minLength(5), Validators.maxLength(10)]],
      date: [null, [Validators.pattern(lengthStorageArea.dateValPattern)]],
      minDate: [null, [Validators.pattern(lengthStorageArea.dateValPattern), CustomValidators.minDate('2018-03-07')]],
      maxDate: [null, [Validators.pattern(lengthStorageArea.dateValPattern), CustomValidators.maxDate('2018-03-07')]],
      phone: [null, [Validators.pattern(/^((0\d{2,3}-\d{7,8})|(1[3|4|5|6|7|8|9][0-9]\d{8}))$/)]],
      bankCard: [null, [CustomValidators.number, Validators.pattern(/^\d{16,19}$/)]],
      url: [null, [CustomValidators.url]],
      password: password,
      equalTo: certainPassword
    });
  }

  ngOnInit() { }
}
