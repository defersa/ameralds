import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';

export type IconsName =
    'login' | 'logout' | 'profile' | 'registration' | 'community' |
    'order' | 'info' | 'apply' | 'warn' | 'map' | 'question' | 'setting' |
    'message' | 'chat' | 'sale' | 'time' | 'status' | 'card' | 'coupon' | 'price' |
    'chevrone-down' | 'chevrone-up' | 'cross' | 'ellipsis' | 'heart' | 'pattern' | 'jewelry' |
    'left-arrow' | 'right-arrow' |
    'upload' | 'download' | 'trash' | 'refresh' |
    'eye-off' | 'eye-on';

const ICONS_SRC: Record<IconsName, string> = {
    'login': "NI Login.svg",
    'logout': "NI Logout.svg",
    'profile': "NI Profile.svg",
    'registration': "NI Registration.svg",
    'community': "NI Communiti.svg",
    'order': "NI Order.svg",
    'info': "NI Info.svg",
    'apply': "NI Apply.svg",
    'warn': "NI Warn.svg",
    'map': "NI Map.svg",
    'question': "NI Question.svg",
    'setting': "NI Setting.svg",

    'message': "NI Message.svg",
    'chat': "NI Chat.svg",
    'sale': "NI Sale.svg",
    'time': "NI Time.svg",
    'status': "NI Status.svg",
    'card': "NI Card.svg",
    'coupon': "NI Coupon.svg",
    'price': "NI Price.svg",

    'chevrone-down': "Chevron-down.svg",
    'chevrone-up': "Chevron-up.svg",
    'cross': "Cross.svg",
    'ellipsis': "Ellipsis.svg",
    'heart': "Heart.svg",

    'left-arrow': "Left Arrow.svg",
    'right-arrow': "Right Arrow.svg",
    'jewelry': "Jewelry.svg",
    'pattern': "Pattern.svg",

    'upload': "EVA Upload.svg",
    'trash': "EVA Trash.svg",
    'download': "EVA Download.svg",
    'refresh': "EVA Refresh.svg",

    'eye-off': "Eye-off.svg",
    'eye-on': "Eye-on.svg"
};

@Injectable({
    providedIn: 'root'
})
export class IconsService {

    public httpReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public svgMap: Map<IconsName, SafeHtml> = new Map([]);

    constructor(private _httpClient: HttpClient, private _sanitizer: DomSanitizer) {
        const headers = new HttpHeaders();
        headers.set('Accept', 'image/svg+xml');

        combineLatest(Object.keys(ICONS_SRC)
            .map((key: string) => {
                const iconKey: IconsName = key as IconsName;
                return this._httpClient.get('/assets/icons/' + ICONS_SRC[iconKey], { headers, responseType: 'text' })
                    .pipe(tap((item: string) => {
                        this.svgMap.set(iconKey, this._sanitizer.bypassSecurityTrustHtml(item));
                    }));
            }))
            .subscribe(() => this.httpReady$.next(true));
    }
}
