import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { timer } from 'rxjs';

declare const lengthStorageArea: any;

@Component({
  selector: 'app-form-demo',
  templateUrl: './form-demo.component.html',
  styleUrls: ['./form-demo.component.scss']
})

export class FormDemoComponent implements OnInit {
  form: FormGroup;
  price: any;
  num: any;
  saving = false;
  date: any;

  constructor(
    public location: Location,
    private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit() { }

  submit() {
    // some code
    this.saving = true;
    timer(1500).subscribe(() => {
      this.location.back();
    });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      abstract: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      category: [null, [Validators.required]],
      date: [null, [Validators.required, Validators.pattern(lengthStorageArea.dateValPattern)]],
      whereUnderstand: [null, [Validators.required]],
      email: [null, [Validators.pattern(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)]],
      price: [null, [Validators.required, Validators.pattern(/^(0[1-9]+)|([1-9]+)$/)]],
      numberRange: [null, [Validators.required, Validators.pattern(/^(0[1-9]+)|([1-9]+)$/)]],
      phone: [null, [Validators.pattern(/^((0\d{2,3}-\d{7,8})|(1[3|4|5|6|7|8|9][0-9]\d{8}))$/)]],
    });
  }
}
