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
                name: 'percentage',
                explain: '百分比（必填）',
                type: 'number',
                optionaValue: '0-100',
                defaultValue: '0'
            },
            {
                name: 'type',
                explain: '进度条类型',
                type: 'string',
                optionaValue: 'line/circle',
                defaultValue: 'line'
            },
            {
                name: 'stroke-width',
                explain: '进度条的宽度，单位 px',
                type: 'number',
                optionaValue: '—',
                defaultValue: '6'
            },
            {
                name: 'text-inside',
                explain: `进度条显示文字内置在进度条内（只在 type=line 时可用）`,
                type: 'boolean',
                optionaValue: '—',
                defaultValue: 'false'
            },
            {
                name: 'status',
                explain: '进度条当前状态',
                type: 'string',
                optionaValue: 'success/exception',
                defaultValue: '-'
            },
            {
                name: 'width',
                explain: '环形进度条画布宽度（只在 type=circle 时可用）',
                type: 'number',
                optionaValue: '—',
                defaultValue: '126'
            },
            {
                name: 'show-text',
                explain: '是否显示进度条文字内容',
                type: 'boolean',
                optionaValue: 'true,false',
                defaultValue: 'true'
            },
            {
                name: 'active-color',
                explain: '自定义进度条激活时的背景颜色 (只在 type=line 时可用)',
                type: 'string',
                optionaValue: '—',
                defaultValue: '-'
            }
        ];
    };
};
