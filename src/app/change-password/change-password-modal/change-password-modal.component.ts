import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap';
import { timer } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Logger } from '../../core/logger.service';
import { LoggerFactory } from '../../core/logger-factory.service';
import { ProfileService } from '../../core/profile/profile.service';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss']
})
export class ChangePasswordModalComponent implements OnInit {

  log: Logger;

  changePassForm: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loggerFactory: LoggerFactory,
    private profileService: ProfileService,
    public activeModal: BsModalRef) {
    this.log = this.loggerFactory.getLogger('修改密码');
    this.createForm();
  }

  ngOnInit() { }

  changePassword() {
    this.isLoading = true;

    const parmValues = this.changePassForm.value;

    this.profileService.changePassword(parmValues.oldPassword, parmValues.newPassword, parmValues.confirmPassword)
      .pipe(finalize(() => {
        this.isLoading = false;
        this.changePassForm.markAsPristine();
      })).subscribe(credentials => {
        this.log.info('密码修改成功,请重新登录！');

        timer(1500).subscribe(() => {
          this.activeModal.hide();
          this.router.navigate(['/login']);
          window.location.reload();
        });
      }, error => {
        this.log.error(error.message);
      });
  }

  validateEqual() {
    if (this.changePassForm.value.newPassword.length >= 6 && this.changePassForm.value.confirmPassword.length >= 6 &&
      this.changePassForm.value.newPassword !== this.changePassForm.value.confirmPassword) {
      return false;
    } else {
      return true;
    }
  }

  private createForm() {
    this.changePassForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
}
