import { Component } from '@angular/core';

import { DeviceDetectorService } from 'ngx-device-detector';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    isMobile: boolean;

    constructor(private readonly ds: DeviceDetectorService) {
        this.isMobile = this.ds.isMobile() || this.ds.isTablet();
    }
}
