import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { LoginResponse } from '../backend-datatypes/response.model';
import { User } from '../backend-datatypes/user.model';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public loggedIn = false;
    public currentUser: User;
    private token;

    constructor(private http: HttpClient) {}

    login() {
        this.http.post(environment.backendUrl + '/auth/login', { username: 'noel', password: 'noel' }).subscribe((res: LoginResponse) => {
            this.currentUser = res.user;
            this.token = res.token;
            localStorage.setItem('jwtToken', JSON.stringify(res.token));
        });
    }

    info() {
        this.http.post(environment.backendUrl + '/info/user', {}).subscribe(res => {
            console.log(res);
        });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('jwtToken');
    }
}
