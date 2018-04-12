import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-using-documents',
    templateUrl: './using-documents.component.html',
    styleUrls: ['./using-documents.component.scss']
})
export class UsingDocumentsComponent implements OnInit {
    paramsList: Array<any> = [];

    constructor(
        public location: Location
    ) { }

    ngOnInit() {
        this.paramsList = [
            {
                name: 'tabsData',
                explain: '必选，tabs数据源',
                type: `Array<{text:String}>，注：text字段为必传，若项有下拉项，则需添加字段dropdown:true，
                    和下拉选项字段dropdownArray:Array<{text:String}>,若项需禁选，则添加字段disabled：true`,
                optionaValue: '—',
                defaultValue: '-'
            },
            {
                name: 'tabsType',
                explain: '可选，tabs组件类型',
                type: 'String',
                optionaValue: 'line-tabs，bootstrap-line-tabs，bootstrap-btn-tabs',
                defaultValue: 'line-tabs'
            },
            {
                name: 'bootomBorder2X',
                explain: '可选，line-tabs时可用，设置激活时下边框为粗边框',
                type: 'Boolean',
                optionaValue: 'true，false',
                defaultValue: 'false'
            },
            {
                name: 'colorThemeStyle',
                explain: '可选，line-tabs时可用，设置item的字体颜色',
                type: 'String',
                optionaValue: '任意样式类，建议使用框架自带样式类',
                defaultValue: 'm-tabs-line--primary'
            },
            {
                name: 'btnColor',
                explain: '可选，为bootstrap-btn-tabs时可用，设置btn的颜色',
                type: 'String',
                optionaValue: '任意样式类，建议使用框架自带样式类',
                defaultValue: 'nav-pills--success'
            },
            {
                name: 'iconColor',
                explain: '可选，为bootstrap-tabs时可用，设置icon的颜色',
                type: 'String',
                optionaValue: '任意样式类，建议使用框架自带样式类',
                defaultValue: 'm--font-brand'
            },
            {
                name: 'choice',
                explain: '可选，设置默认加载激活第几个tab',
                type: 'Number',
                optionaValue: '任意小于tab总数的数字',
                defaultValue: '0，默认激活第一个tab'
            },
            {
                name: 'selected',
                explain: '选择项时向外传递事件方法，同时向外传递选择的项数据',
                type: '—',
                optionaValue: '—',
                defaultValue: '-'
            }
        ];
    };
};
