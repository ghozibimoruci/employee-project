import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import * as moment from "moment";
import { locationName } from "../../../shared/base-file";

@Component({
    selector: 'employee-form',
    templateUrl: 'employee-form.component.html',
    styleUrls: ['employee-form.component.scss', '../employee.component.scss']
})

export class EmployeeFormComponent implements OnInit {
    @ViewChild("employeeForm", null) employeeForm: NgForm;
    @Input('editedEmployee') editedEmployee = null;
    @Input('existingEmail') existingEmail = [];
    @Output('emitFormEmployee') emitFormEmployee = new EventEmitter;
    userId=-1;
    firstName='';
    lastName='';
    phoneNumber='';
    userLocation='';
    locationList=locationName;
    theImage1: File=null;
    imagePath1='';
    ngOnInit(): void {
        let val = this.editedEmployee;
        if(val){
            this.editedEmployee = val;
            this.userId = val.id;
            this.firstName = val.firstName;
            this.lastName = val.lastName;
            this.phoneNumber = val.phone;
            this.userLocation = val.address;
            // this['theImage'+(idx+1)] = {
            //     thumbnail: info.thumbnail,
            //     id: info.image_id,
            //     list_name: info.image_name,
            //     name: info.image_original_name,
            //     image_base64: info.image_url
            // };
            this.imagePath1 = val.imgUrl;
        }
    }

    handleDelete(idx){
      let nextIdx = idx+1;
      let nextImage=this['theImage'+nextIdx];
      let nextImagePath=this['imagePath'+nextIdx];
      if(nextImage && nextImagePath){
        this['theImage'+idx]=nextImage;
        this['imagePath'+idx]=nextImagePath;
        this.rehandleDelete(idx+1);
      }else{
        this['theImage'+idx]=null;
        this['imagePath'+idx]=null;
      }
    }
  
    rehandleDelete(idx){
      return this.handleDelete(idx);
    }

    changeImage(event, idx){
      this['theImage'+idx] = event.theImage;
      this['imagePath'+idx] = event.imagePath;
    }

    cancelForm(){
        this.emitFormEmployee.emit(null);
    }

    submitForm(){
        this.emitFormEmployee.emit({
            id: this.userId,
            firstName: this.firstName,
            lastName: this.lastName,
            fullname: this.firstName+' '+this.lastName,
            address: this.userLocation,
            phone: this.phoneNumber,
            // imgUrl,
            created: moment().format('DD-MM-YYYY')
           })
    }
}