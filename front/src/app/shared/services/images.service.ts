import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageAddRequest, ImageModelRequest } from 'src/app/interface/image.interface';
import { ResultRequest } from 'src/app/interface/request.interface';
import { getAction, HttpActions } from 'src/app/utils/action-builder';

@Injectable({
    providedIn: 'root'
})
export class ImagesService {

    constructor(
        private httpClient: HttpClient
    ) { }

    public deleteImage(id: number): Observable<ResultRequest> {
        return this.httpClient.delete<ResultRequest>(getAction(HttpActions.UploadImage), { params: { id: String(id) } });
    }

    public getImages(page: string): Observable<ImageModelRequest> {
        return this.httpClient.get<ImageModelRequest>(getAction(HttpActions.GetImages) + page);
    }

    public uploadImages(file: File): Observable<ImageAddRequest> {
        const data: FormData = new FormData();
        data.append('file', file);
        data.append('title', 'file');
        return this.httpClient.post<ImageAddRequest>(getAction(HttpActions.UploadImage), data)
    }
}
