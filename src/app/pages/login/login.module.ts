import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login.routing';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [SharedModule, LoginRoutingModule, TranslateModule.forChild()],
    exports: [],
    declarations: [LoginComponent],
    providers: [
    ],
})
export class LoginModule { }
