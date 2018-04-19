import { Component, OnInit } from '@angular/core';

import { LoggerFactory } from '../../../core/logger-factory.service';
import { Logger } from '../../../core/logger.service';

import { ChartsService } from '../../shared/charts.service';

declare const Highcharts: any;

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
    log: Logger;
    theme: any;
    selectValue1: any;
    selectValue2: any;
    selectValue3: any;
    selectValue4: any;

    constructor(
        private loggerFactory: LoggerFactory,
        private hartsService: ChartsService
    ) {
        this.log = this.loggerFactory.getLogger();
    };

    ngOnInit() {
        setTimeout(() => {
            // column
            this.setColumnCharts();
            // 3Dcolumn
            this.set3DColumnCharts();
            // 3Dpie
            this.set3DPieCharts();
            // spline
            this.setSplineCharts();
        }, 500);
    };

    // column
    setColumnCharts() {
        const _this = this;
        Highcharts.chart('demo01', {
            chart: {
                type: 'column'
            },
            title: {
                text: '月平均降雨量'
            },
            subtitle: {
                text: '数据来源: 天气中国'
            },
            xAxis: {
                categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: '降雨量 (mm)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    borderWidth: 0
                },
                series: {
                    animation: true,
                    dataLabels: {
                        enabled: true
                    },
                    events: {
                        click(e: any) {
                            _this.log.info(`${e.point.series.name} ${e.point.category}的月平均降雨量为： ${e.point.y}`);
                        }
                    }
                }
            },
            series: [{
                name: '东京',
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
            }, {
                name: '纽约',
                data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
            }, {
                name: '伦敦',
                data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
            }, {
                name: '柏林',
                data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
            }],
        });
    };

    // 3DColumn
    set3DColumnCharts() {
        const _this = this;
        Highcharts.chart('demo02', {
            chart: {
                type: 'column',
                options3d: {
                    enabled: true,
                    alpha: 15,
                    beta: 15,
                    depth: 50,
                    viewDistance: 25
                }
            },
            title: {
                text: '月平均降雨量3D'
            },
            subtitle: {
                text: '数据来源: 天气中国'
            },
            xAxis: {
                categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: '降雨量 (mm)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    borderWidth: 0
                },
                series: {
                    animation: true,
                    dataLabels: {
                        enabled: true
                    },
                    events: {
                        click(e: any) {
                            _this.log.info(`${e.point.series.name} ${e.point.category}的月平均降雨量为： ${e.point.y}`);
                        }
                    }
                }
            },
            series: [{
                name: '东京',
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
            }, {
                name: '纽约',
                data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
            }, {
                name: '伦敦',
                data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
            }, {
                name: '柏林',
                data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
            }]

        });
    };

    // 3DPie
    set3DPieCharts() {
        const _this = this;
        Highcharts.chart('demo03', {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: '2014年某网站不同浏览器访问量占比'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    },
                    events: {
                        click(e: any) {
                            _this.log.info(`${e.point.name} 浏览器访问量占比：${e.point.y}%`);
                        }
                    }
                },
            },
            series: [{
                type: 'pie',
                name: '浏览器占比',
                data: [
                    ['Firefox', 45.0],
                    ['IE', 26.8],
                    {
                        name: 'Chrome',
                        y: 12.8,
                        sliced: true,
                        selected: true
                    },
                    ['Safari', 8.5],
                    ['Opera', 6.2],
                    ['Others', 0.7]
                ]
            }]

        });
    };

    // spline
    setSplineCharts() {
        const _this = this;
        Highcharts.chart('demo04', {
            chart: {
                type: 'spline'
            },
            title: {
                text: '两地月平均温度'
            },
            subtitle: {
                text: '数据来源: 天气中国'
            },
            xAxis: {
                categories: ['一月', '二月', '三月', '四月', '五月', '六月',
                    '七月', '八月', '九月', '十月', '十一月', '十二月']
            },
            yAxis: {
                title: {
                    text: '温度'
                },
                labels: {
                    formatter: function () {
                        return this.value + '°';
                    }
                }
            },
            tooltip: {
                crosshairs: true,
                shared: true
            },
            plotOptions: {
                spline: {
                    marker: {
                        radius: 4,
                        lineColor: '#666666',
                        lineWidth: 1
                    }
                },
                series: {
                    animation: true,
                    dataLabels: {
                        enabled: true
                    },
                    events: {
                        click(e: any) {
                            _this.log.info(`${e.point.series.name} ${e.point.category}的平均温度：${e.point.y}`);
                        }
                    }
                }
            },
            series: [{
                name: '东京',
                marker: {
                    symbol: 'square'
                },
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, {
                    y: 26.5,
                    marker: {
                        symbol: 'url(https://www.highcharts.com/demo/gfx/sun.png)'
                    }
                }, 23.3, 18.3, 13.9, 9.6]
            }, {
                name: '伦敦',
                marker: {
                    symbol: 'diamond'
                },
                data: [{
                    y: 3.9,
                    marker: {
                        symbol: 'url(https://www.highcharts.com/demo/gfx/snow.png)'
                    }
                }, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }]

        });
    };

    // switchTheme
    switchTheme(theme: any) {
        if (theme === '1') {
            Highcharts.theme = Highcharts['theme_avocado'];
        } else if (theme === '2') {
            Highcharts.theme = Highcharts['theme_sunset'];
        } if (theme === '3') {
            Highcharts.theme = Highcharts['theme_gray'];
        }
        Highcharts.setOptions(Highcharts.theme);
        setTimeout(() => {
            // column
            this.setColumnCharts();
            // 3Dcolumn
            this.set3DColumnCharts();
            // 3Dpie
            this.set3DPieCharts();
            // spline
            this.setSplineCharts();
        }, 500);
    };
};
