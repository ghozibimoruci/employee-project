import { Component } from "@angular/core";
@Component({
    selector: 'sidebar-tag',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.style.scss']
})
export class SideBarComponent {
    menuList = [
        {
            menuName: 'Home',
            routerLink: '/home'
        },
        {
            menuName: 'About',
            routerLink: '/about'
        }]
    
    constructor() { }
    
}