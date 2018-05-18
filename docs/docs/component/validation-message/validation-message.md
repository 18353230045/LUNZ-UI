###说明
> validation-message为表单验证信息反馈组件
###如何使用？
> 在模块.module.ts 中引入组件 `ValidationMessageComponent`：

    import { Component, NgModule } from '@angular/core';
    import { FormsModule, ReactiveFormsModule } from '@angular/forms';

    import { ValidationMessageComponent } from './components/validation-message/validation-message.component';

    @NgModule({
        imports: [
            FormsModule,
            ReactiveFormsModule,
        ],
        declarations: [
            ValidationMessageComponent
        ]
    })
    export class MyModule {}

> 在组件.component.ts 中：

    import { Component, OnInit } from '@angular/core';
    import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

    export class MyComponent implements OnInit {
        form: FormGroup;
        
        constructor(
            private formBuilder: FormBuilder) {
                this.form = this.formBuilder.group({
                    name: [null, [Validators.required, Validators.maxLength(50)]],
                    abbr: [null, [Validators.pattern(/^A/)]]
                });
        };

        ngOnInit() {
        };
    };

> 在模板.html 中：

    <form [formGroup]="form">
        <div class="form-group">
            <label>公司全称 <span class="text-danger">*</span></label>
            <input type="text" formControlName="name" placeholder="公司全称" class="form-control" [(ngModel)]="company.Name" />
            <app-validation-message [control]="form.controls['name']" label="公司全称"></app-validation-message>
        </div>
        <div class="form-group">
            <label>公司简称</label>
            <input type="text" formControlName="abbr" placeholder="公司简称" class="form-control" [(ngModel)]="company.Abbreviation" />
            <app-validation-message [formGroup]="form" for="abbr" label="公司简称" [validationMessages]="{pattern: '{label}首字母必须为A。'}">
            </app-validation-message>
        </div>
    </form>

### 功能列表

属性                           | 说明
------------------------------|---------------------------------------------------------------------------------------
formGroup                     | 规定 app-validation-message 所属的表单
control                       | 规定 app-validation-message 绑定到哪个表单元素的自定义验证规则
for                           | 规定 app-validation-message 绑定到哪个表单元素
label                         | 标注
validationMessages            | 要显示的信息