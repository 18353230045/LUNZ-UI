import { Injectable, OnInit } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { WebApiResultResponse, PagingResponse } from '../../core/http/web-api-result-response';

@Injectable()
export class ChartsService extends WebApiResultResponse implements OnInit {

    constructor(private http: Http) {
        super();
    }

    ngOnInit() {

    };
};
