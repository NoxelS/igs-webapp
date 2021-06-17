import { Component, OnInit } from '@angular/core';

import { DiskSpace, SuperuserService } from 'src/app/services/superuser.service';


@Component({
    selector: 'app-servermanagement',
    templateUrl: './servermanagement.component.html',
    styleUrls: ['./servermanagement.component.scss']
})
export class ServermanagementComponent implements OnInit {
    constructor(private readonly superuserService: SuperuserService) {}

    private diskSpace: DiskSpace;

    freeSpaceReadable: number;
    usedSpaceReadable: number;
    diskSizeReadable: number;

    usedPercent: number;
    freePercent: number;


    ngOnInit(): void {
        this.superuserService.getDiskSpace().subscribe(diskSpace => {
            this.diskSpace = diskSpace;
            this.usedSpaceReadable =  Math.round(100 * (diskSpace.size - diskSpace.free) / 1000000000) / 100;
            this.diskSizeReadable = Math.round(100 * diskSpace.size / 1000000000) / 100;
            this.freeSpaceReadable = Math.round(100 * diskSpace.free / 1000000000) / 100;

            this.usedPercent = Math.round(100 * this.usedSpaceReadable/this.diskSizeReadable * 100) / 100;
            this.freePercent =  Math.round(100 *this.freeSpaceReadable/this.diskSizeReadable * 100) / 100;
            

        })
    }
}
