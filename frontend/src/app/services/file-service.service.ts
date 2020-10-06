import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { IgsResponse, SuccessResponse } from '../backend-datatypes/response.model';
import { ShortFile } from '../backend-datatypes/short-file.model';


@Injectable({ providedIn: 'root' })
export class FileService {
    fileList: ShortFile[] = [];
    fileChange$: BehaviorSubject<ShortFile[]> = new BehaviorSubject([]);

    constructor(private http: HttpClient) {}

    get files(): Observable<ShortFile[]> {
        return this.fileChange$.asObservable();
    }

    getFiles() {
        this.http.post(environment.backendUrl + '/files/list', {}).subscribe(
            (res: IgsResponse<ShortFile[]>) => {
                if (res.successful) {
                    this.fileList = res.data;
                    this.fileChange$.next(this.fileList);
                }
                console.log(res);
            },
            _ => _
        );
    }

    createFile() {
        this.http.post(environment.backendUrl + '/files/create', {}).subscribe(
            (res: SuccessResponse) => {
                if (res.successful) {
                    this.getFiles();
                }
                console.log(res);
            },
            _ => _
        );
    }

    removeFile(file: ShortFile) {
        this.http.post(environment.backendUrl + '/files/remove', file).subscribe(
            (res: SuccessResponse) => {
                if (res.successful) {
                    this.getFiles();
                }
                console.log(res);
            },
            _ => _
        );
    }

    downloadFile(id: number) {
        // TODO: prettify
        const httpOptions = {
            responseType: 'blob' as 'json'
        };

        this.http.post(environment.backendUrl + '/files/get/' + id, {}, httpOptions).subscribe((data: any) => {
            const blob = new Blob([data], { type: 'application/pdf' });
    
            var downloadURL = window.URL.createObjectURL(data);
            var link = document.createElement('a');
            link.href = downloadURL;
            link.download = 'help.pdf';
            link.click();
        });
    }
}
