import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-using-documents',
    templateUrl: './using-documents.component.html',
    styleUrls: ['./using-documents.component.scss']
})
export class UsingDocumentsComponent implements OnInit {
    paramsList: Array<any> = [];

    constructor() { }

    ngOnInit() {
        this.paramsList = [
            {
                name: 'outputType',
                explain: '可选，选择输出类型',
                type: 'String',
                optionaValue: 'brand（车品牌），series（车系），model（车型）',
                defaultValue: 'model'
            },
            {
                name: 'separateCharacter',
                explain: '可选，当配置为车辆系列和车辆品牌是可用，类别之间的隔字符',
                type: 'String',
                optionaValue: '任意',
                defaultValue: '/'
            }
        ];
    };
};
