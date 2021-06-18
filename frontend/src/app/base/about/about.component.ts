import { Component, OnInit } from '@angular/core';

import { FileService } from 'src/app/services/items/file.service';


@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
    constructor(private readonly fileService: FileService) {}

    ngOnInit(): void {}

    getSatzung() {
        this.fileService.getSatzung();
    }
}
