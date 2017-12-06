import { Injectable } from '@angular/core';
import { Http, Request, Response, Headers, RequestOptionsArgs, RequestMethod } from "@angular/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestArgs } from "@angular/http/src/interfaces";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpServices {
    private servUrl = environment.apiURL;

    constructor(private _http: HttpClient) {}

    get(url: string): Observable<any> {
        return this._http.get(this.servUrl + url)
            .map((resp: Response) => resp)
            .catch(this.handleError);
    }

    post(url: string, data: any, args?: RequestOptionsArgs): Observable<any> {
        return this._http.post(this.servUrl + url, data)
            .map((resp: Response) => resp)
            .catch(this.handleError);
    }

    put(url: string, data: any, args?: RequestOptionsArgs): Observable<any> {
        return this._http.put(url, JSON.stringify(data))
            .map((resp: Response) => resp)
            .catch(this.handleError);
    }

    remove(url: string, data?: any, args?: RequestOptionsArgs): Observable<any> {
        return this._http.delete(this.servUrl + url)
            .map((resp: Response) => resp)
            .catch(this.handleError);
    }

    private static json(res: Response): any {
        return res.text() === "" ? res : res.json();
    }

    private handleError(error: any) {
        return Observable.throw(error);
    }
}