import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoggerFactory } from '../../../core/logger-factory.service';
import { Logger } from '../../../core/logger.service';

import { HearFromsService } from '../../shared/hear-froms.service';

@Component({
  selector: 'app-create-hear-from',
  templateUrl: '../edit-hear-from/edit-hear-from.component.html',
  styleUrls: ['../edit-hear-from/edit-hear-from.component.scss']
})
export class CreateHearFromComponent implements OnInit {

  log: Logger;
  title = '编辑';
  saving = false;
  form: FormGroup;
  hearFrom: any = {};

  constructor(
    public location: Location,
    private hearFromsService: HearFromsService,
    private loggerFactory: LoggerFactory,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.log = this.loggerFactory.getLogger();
    this.buildForm();
  }

  ngOnInit() { }

  submit() {

    if (!this.form.valid) {
      this.log.error('表单数据不完整，请检查。');
      return;
    }

    this.saving = true;

    this.hearFromsService.createHearFrom(this.hearFrom)
      .subscribe(response => {
        this.saving = false;
        this.router.navigate(['/hearFroms']);
        this.log.info('添加成功!', response);
      }, error => {
        this.saving = false;
        this.log.error('保存失败。', error);
      });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(50)]]
    });
  }
}
