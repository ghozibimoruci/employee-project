import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { sortArray } from "../../shared/shared_file";
import { allProviderName, basePhone, baseProfileF, baseProfileM, firstNameF, firstNameM, groupName, lastNameF, lastNameM, locationName } from '../../shared/base-file';
import { FormBuilder, FormControl, Validators } from "@angular/forms";

@Component({
    selector: 'employee-component',
    templateUrl: 'employee.component.html',
    styleUrls: ['employee.component.scss']
})

export class EmployeeComponent implements OnInit {employeeList=[];
    baseEmployeeList=[];
    pageList=0;
    sizeList=10;
    totalList=10;
    sortByList=[
      { value: 'fullname', name: 'Name' },
      { value: 'email', name: 'Email' },
      { value: 'birthDateSort', name: 'Birth Date' },
      { value: 'group', name: 'Group' },
      { value: 'status', name: 'Status' },
    ];
    sortBy='fullname';
    searchName='';
    firstNameM = firstNameM;
    firstNameF = firstNameF;
    lastNameM = lastNameM;
    lastNameF = lastNameF;
    baseProfileM = baseProfileM;
    baseProfileF = baseProfileF;

    editedEmployee = null;
    existingEmail = [];
    showList = true;
    constructor(
      private formBuilder : FormBuilder
    ){
    }
    ngOnInit(): void {
      this.formBuilder.group({
        userName: [null, [Validators.required, Validators.maxLength(50)]],
        passWord: [null, [Validators.required]]
      })
      this.generateEmployeeName(this.totalList);
      this.filterEmpoyeeList();
    }

    getRandomNumber(min: number, max: number){
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
    getRandomAge(){
      return this.getRandomNumber(21, 55);
    }
  
    getRandomBoolean(){
      let randomNum = this.getRandomNumber(1, 20);
      return 11 < randomNum;
    }
  
    generateEmployeeUsername(username){
      let reverseList = JSON.parse(JSON.stringify(this.baseEmployeeList)).reverse();
      let existingEmployee = reverseList.find(emp => (emp.username||'').includes(username));
      if(existingEmployee){
        let indexId = parseInt((existingEmployee.username||'').slice(-2));
        let newIndex = (indexId||0)+1;
        let newIndexId = (newIndex>9?'':'0')+newIndex.toString();
        return username+newIndexId;
      }else{
        return username;
      }
    }
  
    generateEmployeeName(lengthList: number){
      let existingEmployeeList = this.getLocalList();
      this.baseEmployeeList = [];
      if(existingEmployeeList){
        this.baseEmployeeList = existingEmployeeList;
      }else{
        while(this.baseEmployeeList.length<lengthList){
          let generatePhone2 = (startNum: number, endNum: number) => {
            let randomNum = this.getRandomNumber(startNum, endNum).toString();
            if(randomNum.length < 8){
              let multiple0 = '';
              for(let i = 0; i < (8 - randomNum.length); i++){
                multiple0 += '0';
              }
              randomNum = multiple0+randomNum;
            }
            return randomNum;
          }
          const generateNewEmployee = () => {
            let isMale = this.getRandomBoolean();
            let firstName = this['firstName'+(isMale?'M':'F')][this.getRandomNumber(1, 15) - 1];
            let lastName = this['lastName'+(isMale?'M':'F')][this.getRandomNumber(1, 15) - 1];
            let address = locationName[this.getRandomNumber(1, 15) - 1];
            let providerName = allProviderName[this.getRandomNumber(1, allProviderName.length) - 1],
            phoneNumber1Array = basePhone[providerName],
            phoneNumber1 = phoneNumber1Array[this.getRandomNumber(1, phoneNumber1Array.length) - 1],
            phoneNumber2 = generatePhone2(9999, 99999999);
            let imgUrl = this['baseProfile'+(isMale?'M':'F')][this.baseEmployeeList.length];
            return {
              id: this.baseEmployeeList.length,
              firstName,
              lastName,
              fullname: firstName+' '+lastName,
              address,
              phone: phoneNumber1 + phoneNumber2,
              imgUrl,
              created: moment().format('DD-MM-YYYY')
             }
          }
          let newEmployee = generateNewEmployee();
          this.baseEmployeeList.push(newEmployee);
        }
        this.setLocalList();
      }
    }

    filterEmpoyeeList(){
      let newBaseEmployee = JSON.parse(JSON.stringify(this.baseEmployeeList));
      sortArray(newBaseEmployee, this.sortBy);
      newBaseEmployee = newBaseEmployee.filter(emp => (emp.fullname||'').toLowerCase().includes(this.searchName.toLowerCase()));
      this.employeeList=[];
      for(let i = 0; i < this.sizeList; i++){
        let pushedItem = newBaseEmployee[(this.pageList*this.sizeList)+i];
        if(pushedItem){
          this.employeeList.push(pushedItem);
        }
      }
      this.totalList = newBaseEmployee.length;
    }

    selectSortBy(){
      this.filterEmpoyeeList();
    }

    searchNameAction(){
      this.filterEmpoyeeList();
    }

    changePage(event){
      this.pageList=event.pageIndex;
      this.filterEmpoyeeList();
    }

    changeForm(theEmployee){
        this.existingEmail = [];
        let filteredEmployee = this.baseEmployeeList.filter(emp => emp.id!=(theEmployee?theEmployee.id:-1));
        this.existingEmail = filteredEmployee.map(emp => emp.email);
        this.editedEmployee = theEmployee;
        this.showList=false;
    }
    
    addEmployee(){
      this.changeForm(null);
    }

    editEmployee(theEmployee){
      this.changeForm(JSON.parse(JSON.stringify(theEmployee)));
    }

    deleteEmployee(theEmployee){
      this.baseEmployeeList = this.baseEmployeeList.filter(emp => emp.id != theEmployee.id);
      if(this.employeeList.length==1){
        this.pageList--;
      }
      this.filterEmpoyeeList();
    }

    emitFormEmployee(event){
      if(event){
        if(event.id < 0){
          let lastEmp = this.baseEmployeeList[this.baseEmployeeList.length - 1];
          let lastIndex = lastEmp.id;
          event.id = lastIndex+1;
          this.baseEmployeeList.push(event);
        }else{
          let editedIndex = this.baseEmployeeList.findIndex(emp => emp.id == event.id);
          this.baseEmployeeList[editedIndex] = event;
        }
      }
      this.setLocalList();
      this.showList=true;
      this.filterEmpoyeeList();
    }

    getLocalList(){
      return JSON.parse(localStorage.getItem('employee-list')||'null');
    }

    setLocalList(){
      localStorage.setItem('employee-list', JSON.stringify(this.baseEmployeeList));
    }
}