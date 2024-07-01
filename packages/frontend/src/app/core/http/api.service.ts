import { Injectable } from '@angular/core';
import { ApiHandlerService } from './apiHandler.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private apiService: ApiHandlerService) {
    }

    get<T>(endpoint: string, params?: any, responseType: 'json' | 'blob' = 'json'): Observable<T> {
        return this.apiService.Get<T>(`${environment.apiUrl}` + endpoint, params, responseType)
    }

    post(endpoint: string, body?: any) {
        return this.apiService.Post(`${environment.apiUrl}` + endpoint, body)
    }

    put(endpoint: string, body?: any, params?: any) {
        return this.apiService.Put(`${environment.apiUrl}` + endpoint, body, params)
    }

    delete(endpoint: string) {
        return this.apiService.Delete(`${environment.apiUrl}` + endpoint, null)
    }

}
