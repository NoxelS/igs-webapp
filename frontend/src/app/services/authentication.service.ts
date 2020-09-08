import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    public loggedIn = false;

    constructor(private http: HttpClient) {}

    login() {
        this.http.post(environment.backendUrl + '/auth/login', { username: 'noel', password: 'noel' }).subscribe(res => {
            console.log(res);
        });
    }

    info() {
        this.http.post(environment.backendUrl + '/info/user', {}).subscribe(res => {
            console.log(res);
        });
    }
}
