import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { SuccessResponse } from '../backend-datatypes/response.model';
import { User } from '../backend-datatypes/user.model';
import { ApiEndpointSuperuser } from './endpoints.const';


export interface DiskSpace {
    diskPath: string;
    free: number;
    size: number;
}

@Injectable({ providedIn: 'root' })
export class SuperuserService {
    constructor(private http: HttpClient) {}

    /** Returns the current machine diskspace */
    getDiskSpace(): Observable<DiskSpace> {
        const successSubject = new Subject<DiskSpace>();
        this.http.get(ApiEndpointSuperuser.diskspace).subscribe(
            (res: SuccessResponse) => {
                if (res.successful) {
                    successSubject.next(res.data as DiskSpace);
                }
                successSubject.complete();
            },
            _ => _
        );
        return successSubject.asObservable();
    }

    getListOfUsers(): Observable<User[]> {
        const successSubject = new Subject<User[]>();
        this.http.get(ApiEndpointSuperuser.getUsers).subscribe(
            (res: SuccessResponse) => {
                if (res.successful) {
                    successSubject.next(res.data as User[]);
                }
                successSubject.complete();
            },
            _ => _
        );
        return successSubject.asObservable();
    }

    createUser(user): Observable<SuccessResponse> {
        return this.http.post(ApiEndpointSuperuser.createUser, user) as Observable<SuccessResponse>;
    }

    deleteUser(user): Observable<SuccessResponse> {
        return this.http.post(ApiEndpointSuperuser.deleteUser, user) as Observable<SuccessResponse>;
    }
}
