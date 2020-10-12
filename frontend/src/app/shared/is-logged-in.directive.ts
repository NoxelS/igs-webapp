import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';


@Directive({
    selector: '[isLoggedIn]'
})
export class IsLoggedInDirective implements OnInit, OnDestroy {
    subscription: Subscription;
    display: string;

    constructor(private readonly authService: AuthenticationService, private readonly el: ElementRef) {
        this.display = el.nativeElement.style.display;
        el.nativeElement.style.display = 'none';
    }

    ngOnInit() {
        const nativeElement: HTMLElement = this.el.nativeElement;
        this.subscription = this.authService.loggedIn.subscribe(isLoggedIn => {
            nativeElement.style.display = isLoggedIn ? this.display : 'none';
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
