import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { FormControl, NgForm, Validators } from "@angular/forms";
import * as moment from "moment";
import { getIntValue, setThousand } from "../../../shared/shared_file";
import { groupName } from "../../../shared/base-file";

@Component({
    selector: 'employee-form',
    templateUrl: 'employee-form.component.html',
    styleUrls: ['employee-form.component.scss', '../employee.component.scss']
})

export class EmployeeFormComponent implements OnInit {
    @ViewChild("employeeForm", null) employeeForm: NgForm;
    @Input('editedEmployee') editedEmployee = null;
    @Output('emitFormEmployee') emitFormEmployee = new EventEmitter;
    userId=-1;
    firstName='';
    lastName='';
    emailUser='';
    basicSalary='';
    birthDate=null;
    userGroup='';
    groupList=groupName;
    maxDate=new Date();
    ngOnInit(): void {
        setTimeout(()=>{
            this.employeeForm.controls.emailUser.setValidators([
                Validators.required, Validators.email
            ])
            this.employeeForm.controls.basicSalary.setValidators([
                Validators.required, (control: FormControl)=>{
                    if(getIntValue(control.value)<4500000){
                        return {min: true}
                    }else{
                        return null
                    }
                }
            ])
        })
        let val = this.editedEmployee;
        if(val){
            this.editedEmployee = val;
            this.userId = val.id;
            this.firstName = val.firstName;
            this.lastName = val.lastName;
            this.emailUser = val.email;
            this.basicSalary = setThousand(val.basicSalary);
            this.birthDate = new Date(val.birthDate);
            this.userGroup = val.group;
        }
    }

    cancelForm(){
        this.emitFormEmployee.emit(null);
    }

    submitForm(){
        this.emitFormEmployee.emit({
            id: this.userId,
            username: this.emailUser.split('@')[0],
            firstName: this.firstName,
            lastName: this.lastName,
            fullname: this.firstName+' '+this.lastName,
            email: this.emailUser,
            birthDate: moment(this.birthDate).format('MMMM DD, YYYY'),
            birthDateSort: moment(this.birthDate).format('YYYY-MMMM-DD'), 
            basicSalary: this.basicSalary,
            group: this.userGroup,
            status: 'active',
            description: moment().format('DD-MM-YYYY')
           })
    }
}