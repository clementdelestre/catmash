import { Injectable } from '@angular/core';
import { IApiBaseActions, ParamsType } from './api-base-action.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiHandlerService implements IApiBaseActions {

    constructor(public httpClient: HttpClient) { }

    Get<T>(url: string, params?: ParamsType, responseType: any = "json"): Observable<T> {
        return this.httpClient
            .get<T>(url, { params: this.createParams(params), responseType: responseType },)
            .pipe(tap((x) => this.HandleResponse(x)));
    }

    GetAll(url: string, params?: ParamsType) {
        return this.httpClient
            .get(url, { params: this.createParams(params) })
            .pipe(tap((x) => this.HandleResponse(x)));
    }

    Post(url: string, data: any, params?: ParamsType) {
        return this.httpClient
            .post(url, data, { params: this.createParams(params) })
            .pipe(tap((x) => this.HandleResponse(x)));
    }

    Delete(url: string, data: any, params?: ParamsType) {
        return this.httpClient
            .delete(url, { params: this.createParams(params) })
            .pipe(tap((x) => this.HandleResponse(x)));
    }

    Put(url: string, data: any, params?: ParamsType) {
        return this.httpClient
            .put(url, data, { params: this.createParams(params)})
            .pipe(tap((x) => this.HandleResponse(x)));
    }

    HandleResponse(response: any) {
        if (response.Status === 500) {
            console.log("Server Error");
        }
    }

    createParams(params?: ParamsType) {
        let httpParams = new HttpParams();
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                httpParams = httpParams.append(key, value);
            });
        }
        return httpParams;
    }

}
