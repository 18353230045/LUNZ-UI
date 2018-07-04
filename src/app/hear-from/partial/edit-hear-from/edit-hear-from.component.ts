import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoggerFactory } from '../../../core/logger-factory.service';
import { Logger } from '../../../core/logger.service';

import { HearFromsService } from '../../shared/hear-froms.service';

@Component({
  selector: 'app-edit-hear-from',
  templateUrl: './edit-hear-from.component.html',
  styleUrls: ['./edit-hear-from.component.scss']
})
export class EditHearFromComponent implements OnInit {

  log: Logger;
  title = '编辑';
  saving = false;
  form: FormGroup;
  hearFrom: any = {};

  constructor(private hearFromsService: HearFromsService,
    private loggerFactory: LoggerFactory, private router: Router,
    private route: ActivatedRoute, public location: Location,
    private formBuilder: FormBuilder) {
    this.log = this.loggerFactory.getLogger();
    this.buildForm();
  }

  ngOnInit() {
    this.load();
  }

  submit() {

    if (!this.form.valid) {
      this.log.error('表单数据不完整，请检查。');
      return;
    }

    this.saving = true;

    this.hearFromsService.updateHearFrom(this.hearFrom)
      .subscribe(response => {
        this.saving = false;
        this.router.navigate(['/hearFroms']);
        this.log.info('更新成功!', response);
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

  private load() {
    this.route.params.map(params => params.id).subscribe(id => {
      if (id) {
        this.hearFromsService.getHearFrom(id)
          .subscribe(hearFrom => {
            this.hearFrom = hearFrom;
            this.log.debug('成功获取从哪里听说！', hearFrom);
          }, error => this.log.error('从哪里听说获取失败。', error));
      }
    });
  }
}
