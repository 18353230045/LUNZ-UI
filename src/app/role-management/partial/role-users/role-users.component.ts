import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap';
import { Node } from '../../interface/interface';

import { AddRoleUsersComponent } from '../add-role-users/add-role-users.component';

@Component({
  selector: 'app-role-users',
  templateUrl: './role-users.component.html',
  styleUrls: ['./role-users.component.scss']
})
export class RoleUsersComponent implements OnInit {
  company: Node;
  roleId: string;
  updateUserList: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService) {
  }

  ngOnInit() {
    // Get roleId
    this.activatedRoute.params.pipe(map(params => params.id)).subscribe(id => this.roleId = id);
  }

  // Add role users
  addRoleUsers() {
    const config = {
      initialState: { departId: this.company.id, roleId: this.roleId },
      class: 'modal-lg',
      ignoreBackdropClick: true
    };
    this.modalService.show(AddRoleUsersComponent, config);

    const onHidden = this.modalService.onHidden.subscribe((val: boolean) => {
      if (val) this.updateUserList = Math.random();
      onHidden.unsubscribe();
    });
  }

}
