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
                name: 'progress',
                explain: '百分比（必填）',
                type: 'number',
                optionaValue: '0-100',
                defaultValue: '-'
            },
            {
                name: 'type',
                explain: '进度条类型',
                type: 'string',
                optionaValue: 'line/circle',
                defaultValue: 'line'
            },
            {
                name: 'lineHeight',
                explain: '进度条的高度',
                type: 'number',
                optionaValue: '—',
                defaultValue: '6'
            },
            {
                name: 'textInside',
                explain: `进度条显示文字内置在进度条内（只在 type=line 时可用）`,
                type: 'string',
                optionaValue: 'outside,inside',
                defaultValue: 'outside'
            },
            {
                name: 'backGround',
                explain: '进度条颜色',
                type: 'string',
                optionaValue: '-',
                defaultValue: '#409EFF（蓝色）'
            },
            {
                name: 'textShow',
                explain: '是否显示文字',
                type: 'boolean',
                optionaValue: 'true/false',
                defaultValue: 'true'
            },
            {
                name: 'width',
                explain: '进度条的宽度（圆形进度条时可用）',
                type: 'number',
                optionaValue: '-',
                defaultValue: '126'
            },
            {
                name: 'status',
                explain: '进度条的状态（圆形进度条时可用）',
                type: 'string',
                optionaValue: 'success/exception',
                defaultValue: '-'
            }
        ];
    };
};
