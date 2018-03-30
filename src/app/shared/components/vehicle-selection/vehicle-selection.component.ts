import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { LoggerFactory } from '../../../core/logger-factory.service';
import { Logger } from '../../../core/logger.service';
import { VehicleService } from '../../services/vehicle.service';

declare const $: any;

@Component({
    selector: 'app-vehicle-selection',
    templateUrl: './vehicle-selection.component.html',
    styleUrls: ['./vehicle-selection.component.scss']
})

export class VehicleSelectionComponent implements OnInit {
    @Input() outputType?: string = 'model';
    @Input() separateCharacter?: string = '/';

    @Output() selected = new EventEmitter<Array<any>>();

    log: Logger;

    carSeriesNav: boolean = true;
    carModelNav: boolean = true;
    carBrand: boolean = false;
    carSeries: boolean = true;
    carModels: boolean = true;
    isclose: boolean = false;

    letterList: Array<any>;
    carBrandList: Array<any>;
    carSeriesList: Array<any>;
    carSeriesFilterList: Array<any>;
    carModelList: Array<any>;
    carModelFilterList: Array<any>;
    filterTemporaryList: Array<any>;
    outGoingList: any;

    letterActive: string = 'A';
    filterString: any = '';
    outPutBrand: string;
    outPutSeries: string;
    outPutModel: string;
    outPutResult: string;

    constructor(
        private vehicleService: VehicleService,
        private loggerFactory: LoggerFactory
    ) {
        this.log = this.loggerFactory.getLogger();
    };

    ngOnInit() {
        this.getLetterList();
        this.getCarbrand(`A`);
        this.outPutResult = `选择车品牌${this.separateCharacter}车系${this.separateCharacter}车型`;
    };

    // get the alphabet
    getLetterList() {
        this.letterList = this.vehicleService.letterList();
    };

    // handling vehicle data
    handleCarSeriesData(obj: any) {
        const arr: Array<any> = [];
        let assembleObj = {
            title: true
        };

        obj.forEach((item: any) => {
            let itemAssemble: Array<any> = [];
            for (const i in item) {
                if (i === `vehicle_Series`) {
                    for (let m = 0; m < item[i].length; m++) {
                        itemAssemble.push(item[i][m]);
                    }
                } else {
                    assembleObj[i] = item[i];
                }
            }
            itemAssemble.unshift(assembleObj);
            for (let n = 0; n < itemAssemble.length; n++) {
                arr.push(itemAssemble[n]);
            }
            assembleObj = { title: true };
            itemAssemble = [];
        });

        return arr;
    };

    // processing model data
    handleCarModelsData(obj: any) {
        const arr: Array<any> = [];
        let assembleObj = {
            title: true
        };

        obj.forEach((item: any) => {
            let itemAssemble: Array<any> = [];
            for (const i in item) {
                if (i === `infolist`) {
                    for (let m = 0; m < item[i].length; m++) {
                        item[i][m]['mosaicName'] = `${item[i][m].vehicleName}
                         ${item[i][m].driveName} 排量：
                         ${item[i][m].displacement}`;
                        itemAssemble.push(item[i][m]);
                    }
                } else {
                    assembleObj[i] = item[i];
                    if (i === 'year') {
                        assembleObj['mosaicName'] = item[i].toString();
                    }
                }
            }

            itemAssemble.unshift(assembleObj);

            for (let n = 0; n < itemAssemble.length; n++) {
                arr.push(itemAssemble[n]);
            }

            assembleObj = { title: true };
            itemAssemble = [];
        });

        return arr;
    };

    // get the car brand
    getCarbrand(code: string) {
        this.vehicleService.getCarbrand(code).subscribe(Response => {
            this.carBrandList = Response;
        }, error => {
            this.log.error(`字母${code}类车获取失败`, error);
        });
    };

    removeClass(element: any, className: any) {
        element.className = element.className.replace(new RegExp(className), '');
    }



    // get the car series
    getCarSeries(item: any) {
        if (this.outputType === `brand`) {
            this.outPutResult = item.tree.name;
            this.outGoingList = {
                carBrandName: item.tree.name,
                carBrandId: item.tree.id
            };

            this.selected.emit(this.outGoingList);

            $('.m-dropdown.m-dropdown--open').each(function () {
                $(this).mDropdown().hide();
            });

            return;

        } else if (this.outputType === `series`) {
            this.outPutBrand = `${item.tree.name}`;
            // this.outPutResult = `${item.tree.name}${this.separateCharacter}车系${this.separateCharacter}车型`;
            this.outGoingList = {
                carBrandName: item.tree.name,
                carBrandId: item.tree.id
            };
        } else if (this.outputType === `model`) {
            this.outPutBrand = item.tree.name;
            // this.outPutResult = item.tree.name;
            this.outGoingList = {
                carBrandName: item.tree.name,
                carBrandId: item.tree.id
            };
        }

        this.vehicleService.getCarSeries(item.tree.id).subscribe(Response => {
            this.carSeriesList = this.handleCarSeriesData(Response);
            this.carSeriesFilterList = this.handleCarSeriesData(Response);
            this.carSeriesNav = false;
            this.carBrand = true;
            this.carSeries = false;
            this.carModels = true;
        }, error => {
            this.log.error(`车系获取失败`, error);
        });
    };

    // get the car model
    getCarModels(item: any) {
        if (item.title) {
            return;
        };

        if (this.outputType === `series`) {
            this.outPutResult = `${this.outPutBrand}${this.separateCharacter}${item.name}`;
            this.outGoingList['carSeriesName'] = item.name;
            this.outGoingList['carSeriesId'] = item.id;

            this.selected.emit(this.outGoingList);

            $('.m-dropdown.m-dropdown--open').each(function () {
                $(this).mDropdown().hide();
            });

            return;

        } else if (this.outputType === `model`) {
            this.outPutSeries = `${item.name}`;
            // this.outPutResult = `${this.outPutBrand}${this.separateCharacter}${item.name}/车型`;
            this.outGoingList[`carSeriesName`] = item.name;
            this.outGoingList[`carSeriesId`] = item.id;
        } else if (this.outputType === `model`) {
            this.outPutSeries = item.name;
            this.outPutResult = `${this.outPutBrand}${this.separateCharacter}${item.name}`;
        }

        this.vehicleService.getCarModels(item.id).subscribe(Response => {
            this.carModelList = this.handleCarModelsData(Response);
            this.carModelFilterList = this.handleCarModelsData(Response);

            this.carModelNav = false;
            this.carBrand = true;
            this.carSeries = true;
            this.carModels = false;
        }, error => {
            this.log.error(`车型获取失败`, error);
        });
    };

    // selection model
    selectCarModels(item: any) {
        if (item.title) {
            return;
        };

        this.outPutResult = `${this.outPutBrand}${this.separateCharacter}
                             ${this.outPutSeries}${this.separateCharacter}${item.mosaicName}`;
        this.outGoingList[`carModelInfo`] = item;

        this.selected.emit(this.outGoingList);

        $('.m-dropdown.m-dropdown--open').each(function () {
            $(this).mDropdown().hide();
        });

    };

    // filter car series data
    filterCarSeriesData(array: Array<any>) {
        this.filterTemporaryList = array.filter((item: any) => {
            const patt = new RegExp(`${this.filterString}`, `i`);
            return patt.test(item.name);
        });

        this.carSeriesList = this.filterTemporaryList;
    };

    // filter car models data
    filterCarModelsData(array: Array<any>) {
        this.filterTemporaryList = array.filter((item: any) => {
            const patt = new RegExp(`${this.filterString}`, `i`);
            return patt.test(item.mosaicName);
        });

        this.carModelList = this.filterTemporaryList;
    };
};
