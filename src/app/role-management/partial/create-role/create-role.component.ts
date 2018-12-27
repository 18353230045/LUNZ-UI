import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalService } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';

import { LoggerFactory } from '@core/logger-factory.service';
import { Logger } from '@core/logger.service';
import { environment } from '@env/environment';

import { RoleService } from '../../shared/role.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit {
  log: Logger;
  form: FormGroup;
  saving = false;

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private loggerFactory: LoggerFactory,
    public modalService: BsModalService) {
    this.log = this.loggerFactory.getLogger(`创建角色`);
    this.buildForm();
  }

  ngOnInit() { }

  submit() {
    const role = { ApplicationId: environment.api.v1.applicationId, name: this.form.value.name };
    this.saving = true;

    this.roleService.createRole(role).pipe(finalize(() => {
      this.saving = false;
    })).subscribe((response) => {
      if (response.Success === false) {
        this.log.info(`${response.AllMessages}`);
      } else {
        this.log.success('角色创建成功!');
        this.modalService.onHidden.emit(true);
        this.modalService.hide(1);
      }
    }, error => {
      this.log.error(`角色创建失败，${error}`);
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(50)]]
    });
  }

}
