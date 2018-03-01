import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthServiceService} from '../-shared-module/AuthService/auth-service.service';

 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router,public auth:AuthServiceService) { }
 
    canActivate() {
        if (localStorage.getItem('logindetails')) {
            // logged in so return true
            return true;
        }
 
        // not logged in so redirect to login page
        // this.router.navigate(['/login']);
        return false;
    }
}