import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { IgsResponse, LoginResponse } from '../backend-datatypes/response.model';
import { User } from '../backend-datatypes/user.model';
import { ApiEndpointAuth } from './endpoints.const';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private $loggedIn = new BehaviorSubject<boolean>(false);
    private $currentUser = new BehaviorSubject<User>(null);
    private _currentUser: User;

    private get currentUser(): User {
        return this._currentUser;
    }

    private set currentUser(value: User) {
        this._currentUser = value;
        this.$currentUser.next(value);
    }

    get loggedIn(): Observable<boolean> {
        return this.$loggedIn.asObservable();
    }

    get user(): Observable<User> {
        return this.$currentUser.asObservable();
    }

    constructor(private http: HttpClient) {
        this.$currentUser.subscribe(user => this.$loggedIn.next(!!user));

        /**
         * Make an initial info request to see if there is a jwtToken in local storage.
         * Don't mind if there is an erorr, this means the user has not logged in before.
         */
        this.http.get(ApiEndpointAuth.info).subscribe(
            (res: IgsResponse<User>) => {
                if (res.successful) {
                    this.currentUser = res.data;
                }
            },
            _ => _
        );
    }

    /** Make an api request to get a jwt token. The token will be stored in local storage and will be used in all request targeting the backend url. */
    login(username: string, password: string) {
        this.http.post(ApiEndpointAuth.login, { username, password }).subscribe((res: LoginResponse) => {
            this.currentUser = res.data;
            localStorage.setItem('jwtToken', JSON.stringify(res.token));
        });
    }

    /** Used to get user informationn. User needs to be authenticated. */
    updateUserInformation() {
        this.http.get(ApiEndpointAuth.info).subscribe(
            (res: IgsResponse<User>) => {
                if (res.successful) {
                    this.currentUser = res.data;
                }
            },
            _ => _
        );
    }

    /** Removes the jwtToken from local storage and deletes all user references. */
    logout() {
        localStorage.removeItem('jwtToken');
        this.currentUser = null;
    }
}
