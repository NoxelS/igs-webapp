import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { User } from 'src/app/backend-datatypes/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
    selector: 'igs-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    user: User;
    subscription: Subscription;

    constructor(private readonly authService: AuthenticationService) {}

    ngOnInit() {
        this.subscription = this.authService.user.subscribe(user => (this.user = user));
    }
    
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
