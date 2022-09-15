import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { sortArray } from "../../shared/shared_file";
import { firstNameF, firstNameM, groupName, lastNameF, lastNameM } from '../../shared/base-file';

@Component({
    selector: 'employee-component',
    templateUrl: 'employee.component.html',
    styleUrls: ['employee.component.scss']
})

export class EmployeeComponent implements OnInit {employeeList=[];
    baseEmployeeList=[];
    pageList=0;
    sizeList=10;
    totalList=100;
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

    editedEmployee = null;
    showList=true;
    ngOnInit(): void {
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
      this.baseEmployeeList = [];
      while(this.baseEmployeeList.length<lengthList){
        let eAge = this.getRandomAge();
        let isMale = this.getRandomBoolean();
        let dateBorn = this.getRandomNumber(1, 31),
        monthBorn = this.getRandomNumber(1, 12),
        yearBorn = moment().year() - eAge;
        let birthDate = moment(monthBorn+'-'+dateBorn+'-'+yearBorn).format('MMMM DD, YYYY');
        let birthDateSort = moment(monthBorn+'-'+dateBorn+'-'+yearBorn).format('YYYY-MMMM-DD');
        let firstName = this['firstName'+(isMale?'M':'F')][this.getRandomNumber(1, 15) - 1];
        let lastName = this['lastName'+(isMale?'M':'F')][this.getRandomNumber(1, 15) - 1];
        let username = firstName.toLowerCase()+'.'+lastName.toLowerCase();
        username = this.generateEmployeeUsername(username);
        let basicSalary = this.getRandomNumber(8, 26)*1000000;
        let group = groupName[this.getRandomNumber(1, 10) - 1];
        let status = this.getRandomNumber(1, 20) > 18?'inactive':'active';
        this.baseEmployeeList.push({
          id: this.baseEmployeeList.length,
          username,
          firstName,
          lastName,
          fullname: firstName+' '+lastName,
          email: username+'@gmail.com',
          birthDate,
          birthDateSort, 
          basicSalary,
          group,
          status,
          description: moment().format('DD-MM-YYYY')
         })
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
      this.filterEmpoyeeList();
    }

    emitFormEmployee(event){
      if(event){
        if(event.id < 0){
          event.id = this.baseEmployeeList.length;
          this.baseEmployeeList.push(event);
        }else{
          let editedIndex = this.baseEmployeeList.findIndex(emp => emp.id == event.id);
          this.baseEmployeeList[editedIndex] = event;
        }
      }
      this.showList=true;
      this.filterEmpoyeeList();
    }
}