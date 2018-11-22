import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SignalR, SignalRConnection, BroadcastEventListener } from 'ng2-signalr';
import { Observable, Subscription } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { WebApiResultResponse, PagingResponse } from '@app/core';
import { LoggerFactory } from '../../core/logger-factory.service';
import { Logger } from '../../core/logger.service';

import { environment } from '@env/environment';
import { AuthenticationService, Credentials } from '../../core/authentication/authentication.service';
import { AuthenticationOAuth2Service } from '../../core/authentication/authentication-oauth2.service';

import { WebMessage } from './web-message';
@Injectable()
export class MessageService extends WebApiResultResponse {

    log: Logger;
    receivedMessage: EventEmitter<any> = new EventEmitter<any>();
    readMessage: EventEmitter<any> = new EventEmitter<any>();

    private _connection: SignalRConnection;
    private _subscription: Subscription;
    private _credentials: Credentials;

    constructor(
        private http: HttpClient,
        private _signalR: SignalR,
        private authenticationService: AuthenticationService,
        private authenticationOAuth2Service: AuthenticationOAuth2Service,
        private loggerFactory: LoggerFactory) {
        super();
        this._connection = this._signalR.createConnection();
        this.log = this.loggerFactory.getLogger();

        if (this.authenticationService.isUsing()) {
            this._credentials = this.authenticationService.credentials;
        }

        if (this.authenticationOAuth2Service.isUsing()) {
            const claims = this.authenticationOAuth2Service.claims;
            this._credentials = {
                username: claims.username,
                token: claims.authToken
            };
        }
    }

    getUnreadMessages(): Observable<any> {
        const url = environment.api.messageCenter.baseUrl + 'Message/GetUnReadWebMsg';

        return this.http.get(url, {
            headers: new HttpHeaders({
                'AppKey': environment.api.messageCenter.appKey,
                'X-XSS-Protection': '1',
                'X-Content-Type-Options': 'nosniff'
            }),
            params: { 'username': this._credentials.username }
        }).pipe(map((response: any) => {
            return super.handleSuccess(response);
        }, catchError(super.handleError)));
    }

    getMessages(paging: any): Observable<PagingResponse> {
        const url = environment.api.messageCenter.baseUrl + 'Message/GetWebMsg';
        return this.http.get(url, {
            headers: new HttpHeaders({
                'AppKey': environment.api.messageCenter.appKey,
                'X-XSS-Protection': '1',
                'X-Content-Type-Options': 'nosniff'
            }),
            params: { 'paging': paging, 'username': this._credentials.username }
        }).pipe(map((response: any) => {
            return super.handleSuccess(response);
        }, catchError(super.handleError)));
    }

    setReadMessage(msgId: any): Observable<any> {
        const url = environment.api.messageCenter.baseUrl + 'Message/SetRead';

        return this.http.get(url, {
            headers: new HttpHeaders({
                'AppKey': environment.api.messageCenter.appKey,
                'X-XSS-Protection': '1',
                'X-Content-Type-Options': 'nosniff'
            }),
            params: { 'msgId': msgId }
        }).pipe(map((response: any) => {
            const result = super.handleSuccess(response);
            this.readMessage.emit(result);
            return result;
        }, catchError(super.handleError)));
    }

    initSignalR() {
        const username = this._credentials.username;
        if (this.hasValue(username)) {
            this._connection.start().then((c) => {
                this._connection.invoke('JoinConversation', {
                    FromUsername: username,
                    FromDisplayName: username
                }).catch((err: any) => this.log.error('Failed to invoke \'joinConversation\'.Error:' + err));
            }).catch((err: any) => this.log.error('Failed SignalR startes.Error:' + err));
        }

        const onMessageSent$ = new BroadcastEventListener<WebMessage>('OnMessageSent');
        // register the listener
        this._connection.listen(onMessageSent$);
        // subscribe to event
        this._subscription = onMessageSent$.subscribe((parms: WebMessage) => {
            const msg = {
                UnreadMessageId: parms.UnreadMessageId,
                Message: parms.Message,
                SentAt: parms.SentAt,
                Read: false,
                DisplayName: username,
                Username: username,
                SendToId: (new Date()).valueOf()
            };
            this.log.info('您有一条新消息!' + msg.Message);
            this.receivedMessage.emit(msg);
        });
    }

    hasValue(str: string): boolean {
        return str && str !== null && str !== '' && str !== undefined;
    }
}
