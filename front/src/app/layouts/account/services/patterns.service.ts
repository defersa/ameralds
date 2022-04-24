import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageRequest, PatternMaxType, SmallPattern } from 'src/app/interface/pattern.interface';
import { getAction, HttpActions } from 'src/app/utils/action-builder';
import { MapImage } from '../../store/utils/images';

@Injectable({
	providedIn: 'root'
})
export class PatternsService {

	constructor(
		private httpClient: HttpClient
	) { }

    public getPatterns(page: number = 1): Observable<PageRequest> {
        return this.httpClient.get<PageRequest>(getAction(HttpActions.GetOwnPatterns) + page)
            .pipe(map((value: PageRequest) => {
                value.items.forEach((pattern: PatternMaxType) => pattern.images = pattern.images.map(MapImage));
                return value;
            }));
    }
}
