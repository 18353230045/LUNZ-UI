###说明
验证器视觉反馈组件“app-validation-message”,集成了第三方验证器 “ng2-validation”,此验证器， 包括常见的必填验证、数字验证、最小/大值验证、字符长度验证、日期验证、最小/大日期验证、 邮箱验证、 网址验证、字段相同验证等。需要特别说明的是最大/小字符长度验证，不能反馈限制值，用传值label来代替反馈值。 各种验证方法详见demo，更多不常见信息验证请查看 [第三方文档](https://www.npmjs.com/package/ng2-validation)。

###使用方法
#####引入模块
    import { FormsModule,ReactiveFormsModule } from '@angular/forms';
    import { SharedModule } from '../shared/shared.module';

    @NgModule({ 
        imports: [ 
            FormsModule, 
            ReactiveFormsModule, 
            SharedModule 
        ] 
    });

#####.html中
    <form [formGroup]="form"
        <input type="text" class="form-control" name="email" formControlName="email" /
        <app-validation-message [control]="form.controls['email']"></app-validation-message
    </form>

#####.component.ts中
    import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; 
    import { CustomValidators } from 'ng2-validation';

    declare const lengthStorageArea: any;

    const password = new FormControl('', CustomValidators.required);
    const certainPassword = new FormControl('', CustomValidators.equalTo(password));

    export class FormValidatorComponent implements OnInit { 
        form: FormGroup; 

        constructor( 
            private formBuilder: FormBuilder 
        ) { 
            this.form = this.formBuilder.group({ 
                required: [null, [Validators.required]], //必填验证。 
                email: [null, [CustomValidators.email]], //邮箱验证。 
                number: [null, [CustomValidators.number]], //数字验证。 
                min: [null, [CustomValidators.number, CustomValidators.min(5)]], //最小数字验证。 
                max: [null, [CustomValidators.number, CustomValidators.max(5)]], //最大数字验证。 
                numberRange: [null, [CustomValidators.number, CustomValidators.min(5), CustomValidators.max(10)]], //数字区间验证。 
                maxLength: [null, [Validators.maxLength(5)]], //最大字符长度验证。 
                minLength: [null, [Validators.minLength(5)]], //最小字符长度验证。 
                lengthRange: [null, [Validators.minLength(5), Validators.maxLength(10)]], //字符长度区间验证。 
                date: [null, [Validators.pattern(lengthStorageArea.dateValPattern)]], //日期验证(注意，对特殊字符不能正确验证)。 
                minDate: [null, [Validators.pattern(lengthStorageArea.dateValPattern), CustomValidators.minDate('2018-03-07')]], //最小日期验证(注意，对特殊字符不能正确验证)。 
                maxDate: [null, [Validators.pattern(lengthStorageArea.dateValPattern), CustomValidators.maxDate('2018-03-07')]], //最大日期验证(注意，对特殊字符不能正确验证)。 
                phone: [null, [Validators.pattern(/^((0\d{2,3}-\d{7,8})|(1[3|4|5|6|7|8|9][0-9]\d{8}))$/)]], //自定义正则表达式验证电话号码。 
                bankCard: [null, [CustomValidators.number, Validators.pattern(/^\d{16,19}$/)]], //银行卡号验证。 
                url: [null, [CustomValidators.url]], //网址验证。 
                password: password, //值不相同验证。 
                equalTo: certainPassword //值不相同验证。 
            }); 
        }; 

        ngOnInit() {  }; 
    }; 

####提示
注：ng2-validation验证器中的phone验证电话号码不能针对国内电话号码规则正确验证， 使用angular内置正则表达式来进行验证。日期验证时不能对特殊字符正确验证，自定义正则表达式请参照定义验证电话号码验证器的方式， 更改验证规则即可。 验证器详细code见demo文件。