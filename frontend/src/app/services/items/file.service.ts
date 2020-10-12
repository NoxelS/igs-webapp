import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { IgsResponse, SuccessResponse } from '../../backend-datatypes/response.model';
import { ShortFile } from '../../backend-datatypes/short-file.model';
import { ApiEndpointFile } from '../endpoints.const';


@Injectable({ providedIn: 'root' })
export class FileService {
    private fileList: ShortFile[] = [];
    private fileChange$: BehaviorSubject<ShortFile[]> = new BehaviorSubject([]);

    constructor(private http: HttpClient) {}

    get files(): Observable<ShortFile[]> {
        return this.fileChange$.asObservable();
    }

    /** Trigger the FileService to fetch new files. */
    get() {
        this.http.get(ApiEndpointFile.get).subscribe(
            (res: IgsResponse<ShortFile[]>) => {
                if (res.successful) {
                    this.fileList = res.data;
                    this.fileChange$.next(this.fileList);
                }
            },
            _ => _
        );
    }

    /** Create a new file. */
    create(file: File, description: string) {
        // The service builds form data to send a file and metadata concurrently.
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        formData.append('description', description);
        this.http.post(ApiEndpointFile.create, formData).subscribe(
            (res: SuccessResponse) => {
                if (res.successful) {
                    this.get();
                }
            },
            _ => _
        );
    }

    /** Remove a file. */
    remove(file: ShortFile) {
        this.http.post(ApiEndpointFile.remove, file).subscribe(
            (res: SuccessResponse) => {
                if (res.successful) {
                    this.get();
                }
            },
            _ => _
        );
    }

    /** Edit an existing file by removing the old one and uploading a new one. */
    edit(file) {
        // TODO: remove old and upload new file
        // TODO: discuss if necessary
    }

    /** Download a specific file. */
    download(shortFile: ShortFile) {
        this.http
            .get(ApiEndpointFile.download(shortFile.id), {
                responseType: 'blob' as 'json'
            })
            .subscribe((data: any) => {
                // const blob = new Blob([data], { type: shortFile.mimetype });
                const downloadURL = window.URL.createObjectURL(data);
                const link = document.createElement('a');
                link.href = downloadURL;
                link.download = shortFile.name;
                link.click();
            });
    }
}
