import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor (private httpClient: HttpClient) {

    }

    post(
        url: string, 
        body: any, 
        onSuccess: (response) => void, 
        onError?: (error) => void,         
        onComplete?: () => void
    ) {
        this.httpClient.post(url, body).subscribe(
            (response) => { onSuccess(response) },
            (error) => { if (onError != undefined) onError(error) },
            () => { if (onComplete != undefined) onComplete(); } 
        );
    }
}