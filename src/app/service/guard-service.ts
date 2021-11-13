import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { getTokenLogin } from "./login-service";

@Injectable()
export class GuardService implements CanActivate{
    constructor(private router: Router){ }
    canActivate(route: ActivatedRouteSnapshot): boolean {
        let token = getTokenLogin();
        if(token.username == 'ghozibimoruci' && token.password == 'ghozibimoruci'){
            return true
        }else{
            this.router.navigateByUrl('/login');
            return false
        }
    }
}