import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee.routing';

@NgModule({
    imports: [SharedModule, EmployeeRoutingModule, TranslateModule.forChild()],
    exports: [],
    declarations: [EmployeeComponent, EmployeeFormComponent],
    providers: [EmployeeFormComponent],
})
export class EmployeeModule { }
