import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { getAction, HttpActions } from 'src/app/utils/action-builder';

@Component({
    selector: 'amstore-pattern-add',
    templateUrl: './pattern-add.component.html',
    styleUrls: ['./pattern-add.component.scss']
})
export class PatternAddComponent implements OnInit {

    constructor(
        private httpService: HttpClient
    ) {
    }

    public ngOnInit(): void {
    }

    public file: File | null = null;

    public upload(): void {
        console.log(this.file);
        if(!this.file){
            return;
        }
        const data: FormData = new FormData();
        data.append('file', this.file);
        data.append('title', 'file');
        this.httpService.post(getAction(HttpActions.UploadImage), data).subscribe((result)=> {
            console.log(result);
        })
    }
    public dropFiles(fileList: EventTarget | null): void {
        const files: FileList | null = fileList ? (fileList as HTMLInputElement).files : null;
        this.file = files?.length ? files[0] : null;
    }
}
