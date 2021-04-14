import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { GoodsService } from 'src/app/services/goods.service';
import { getAction, HttpActions } from 'src/app/utils/action-builder';

interface ISmallProfile {
    username: string;
    email: string;
    godmode: boolean;
    goods: any;
}

@Component({
    selector: 'amstore-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    host: {
        class: 'amstore-profile'
    }
})
export class ProfileComponent implements OnInit {

    public profile: ISmallProfile | null = null;

    // TODO: Присвоение вынести в отдельную функцию подписки
    public get godmode(): boolean {
        return this.profile?.godmode || false;
    }

    public get goods(): any {
        return this.profile?.goods || undefined;
    }

    constructor(
        private httpClient: HttpClient,
        private authService: AuthService,
        private goodsService: GoodsService
    ) { }

    public ngOnInit(): void {
        this.authService.initAuth();
        this.authService.authStatus.subscribe((status: boolean) => {
            this.profile = null;
            if (status) {
                this.httpClient.get<ISmallProfile>(
                    getAction(HttpActions.Profile))
                    .subscribe((result: ISmallProfile) => {
                        this.profile = result;
                        this.goodsService.goods$.next(result.goods);
                    });
            }
            this.authService.godmodeStatus.next(this.godmode);
        });

    }
    public logout(): void {
        this.authService.logout();
    }

}
