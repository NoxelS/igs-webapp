import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { IgsResponse, LoginResponse } from '../backend-datatypes/response.model';
import { User } from '../backend-datatypes/user.model';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public $loggedIn = new BehaviorSubject<boolean>(false);

    public $currentUser = new BehaviorSubject<User>(null);
    private _currentUser: User;

    private token;

    public get currentUser(): User {
        return this._currentUser;
    }

    public set currentUser(value: User) {
        this._currentUser = value;
        this.$currentUser.next(value);
    }

    constructor(private http: HttpClient) {
        this.$currentUser.subscribe(user => this.$loggedIn.next(!!user));

        /**
         * Make an initial request to see if there is a jwtToken in local storage.
         * Don't mind if there is an erorr, this means the user has not logged in before.
         */
        this.http.post(environment.backendUrl + '/info/user', {}).subscribe(
            (res: IgsResponse<User>) => {
                if (res.successful) {
                    this.currentUser = res.data;
                }
            },
            _ => _
        );
    }

    /**
     * @description Makes an api request to get a token
     */
    login() {
        // TODO: use real credentials
        this.http.post(environment.backendUrl + '/auth/login', { username: 'noel', password: 'noel' }).subscribe((res: LoginResponse) => {
            this.currentUser = res.data;
            this.token = res.token;
            localStorage.setItem('jwtToken', JSON.stringify(res.token));
        });
    }

    /**
     * Used to get user information
     */
    updateUserInformation() {
        this.http.post(environment.backendUrl + '/info/user', {}).subscribe(
            (res: IgsResponse<User>) => {
                if (res.successful) {
                    this.currentUser = res.data;
                }
            },
            _ => _
        );
    }

    /**
     * Removes the jwtToken from local storage and deleted all user references.
     */
    logout() {
        localStorage.removeItem('jwtToken');
        this.token = null;
        this.currentUser = null;
    }
}
