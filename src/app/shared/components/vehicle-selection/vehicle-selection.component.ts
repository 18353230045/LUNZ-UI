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
    @Input() outputType?: String = 'model';
    @Input() separateCharacter?: String = '/';
    @Input() outPutResult?: any;

    @Output() selected = new EventEmitter<Array<any>>();
    @Output() outPutResultChange = new EventEmitter();

    log: Logger;

    carSeriesNav: Boolean = true;
    carModelNav: Boolean = true;
    carBrand: Boolean = false;
    carSeries: Boolean = true;
    carModels: Boolean = true;
    isclose: Boolean = false;
    loading: Boolean = false;

    letterList: Array<any>;
    carBrandList: Array<any>;
    carSeriesList: Array<any>;
    carSeriesFilterList: Array<any>;
    carModelList: Array<any>;
    carModelFilterList: Array<any>;
    filterTemporaryList: Array<any>;
    outGoingList: any;

    letterActive: String = 'A';
    filterString: any = '';
    outPutBrand: String = '品牌';
    outPutSeries: String = '车系';
    outPutModel: String = '车型';
    showResult: String;

    constructor(
        private vehicleService: VehicleService,
        private loggerFactory: LoggerFactory
    ) {
        this.log = this.loggerFactory.getLogger();
    };

    ngOnInit() {
        this.getLetterList();
        this.getCarbrand(`A`);
        this.showResult = this.outPutResult || `选择车品牌${this.separateCharacter}车系${this.separateCharacter}车型`;
    };

    // get alphabet
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

    // get car brand
    getCarbrand(code: string) {
        this.loading = true;
        this.vehicleService.getCarbrand(code).subscribe(Response => {
            this.carBrandList = Response;
            this.loading = false;
        }, error => {
            this.log.error(`字母${code}类车获取失败`, error);
        });
    };

    // get car series
    getCarSeries(item: any) {
        if (this.outputType === `brand`) {
            this.showResult = item.tree.name;
            this.outPutBrand = item.tree.name;
            this.outPutResult = item;

            this.outGoingList = {
                carBrandName: item.tree.name,
                carBrandId: item.tree.id
            };

            this.outPutResultChange.emit(this.outGoingList);

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

        this.loading = true;

        this.vehicleService.getCarSeries(item.tree.id).subscribe(Response => {
            this.carSeriesList = this.handleCarSeriesData(Response);
            this.carSeriesFilterList = this.handleCarSeriesData(Response);

            this.carSeriesNav = true;
            this.carModelNav = true;
            this.carBrand = true;
            this.carSeries = false;
            this.carModels = true;
            this.loading = false;
        }, error => {
            this.log.error(`车系获取失败`, error);
        });
    };

    // get car model
    getCarModels(item: any) {

        if (this.outputType === `series`) {
            this.showResult = `${this.outPutBrand}${this.separateCharacter}${item.name}`;
            this.outPutSeries = item.name;
            this.outPutResult = item;

            this.carSeriesNav = false;

            this.outGoingList['carSeriesName'] = item.name;
            this.outGoingList['carSeriesId'] = item.id;

            this.outPutResultChange.emit(this.outGoingList);

            $('.m-dropdown.m-dropdown--open').each(function () {
                $(this).mDropdown().hide();
            });

            return;

        } else if (this.outputType === `model`) {
            this.outPutSeries = `${item.name}`;

            // this.outPutResult = `${this.outPutBrand}${this.separateCharacter}${item.name}/车型`;
            this.outGoingList[`carSeriesName`] = item.name;
            this.outGoingList[`carSeriesId`] = item.id;
        }


        this.loading = true;

        this.vehicleService.getCarModels(item.id).subscribe(Response => {
            this.carModelList = this.handleCarModelsData(Response);
            this.carModelFilterList = this.handleCarModelsData(Response);

            this.carSeriesNav = false;
            this.carBrand = true;
            this.carSeries = true;
            this.carModels = false;
            this.loading = false;
        }, error => {
            this.log.error(`车型获取失败`, error);
        });
    };

    // selection model
    selectCarModels(item: any) {

        this.showResult = `${this.outPutBrand}${this.separateCharacter}
                           ${this.outPutSeries}${this.separateCharacter}${item.mosaicName}`;

        this.outPutResult = item;
        this.outPutModel = item.mosaicName;
        this.outGoingList[`carModelInfo`] = item;

        this.carModelNav = false;

        this.outPutResultChange.emit(this.outGoingList);

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
