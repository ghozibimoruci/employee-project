import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'pagination',
    templateUrl: 'pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})

export class Pagination {
    size=0;
    total=0;
    pageIndex=0
    @Input('pageIndex') set changeIndex(val){
        this.pageIndex=(val||0)+1;
    };
    @Input('sizeNtotal') set setSizeTotal(val : {size: 0, total: 0}){
        this.size=val.size;
        this.total=val.total;
        this.settingList();
    }
    @Input('disabled') disabled = false;
    @Output('pageEvent') pageEvent=new EventEmitter<any>();
    pageListArray = [];

    settingList(){
        let theTotal = this.total||0;
        let theSize = this.size||1;
        let fixedNum = Math.floor(theTotal/theSize);
        let lastPage = (theTotal%theSize)?(fixedNum+1):fixedNum;
        this.pageListArray = [lastPage];
        this.changePageAction(this.pageIndex||1);
    }

    changePageAction(newPage: number){
        this.pageIndex = newPage;
        let lastPage = this.pageListArray.pop();
        let pushFirstNPage = (N) => {
            let max = 1;
            this.pageListArray=[];
            while(max<=N){
                this.pageListArray.push(max);
                max++;
            }
        }
        let addingDots = () => {
            this.pageListArray.push('...');
        }
        let pushLastNPage = (N) => {
            let max = N;
            while(max){
                this.pageListArray.push(lastPage - (max-1));
                max--;
            }
        }
        if(lastPage>8){
            if(this.pageIndex<5){
                pushFirstNPage(5);
                addingDots();
                pushLastNPage(3);
            }else if(this.pageIndex>lastPage-4){
                pushFirstNPage(3);
                addingDots();
                pushLastNPage(5);
            }else{
                this.pageListArray = this.pageIndex-2<=5?[1, '...']:[1, 2, 3, '...'];
                let max = 5;
                while(max){
                    this.pageListArray.push(this.pageIndex+3-max);
                    max--;
                }
                this.pageListArray.push('...');
                pushLastNPage(this.pageIndex+7>=lastPage?1:3);
            }
        }else{
            pushFirstNPage(lastPage);
        }

    }

    changePage(newPage: number){
        this.changePageAction(newPage);
        this.pageEvent.emit({
            pageIndex: this.pageIndex-1
        });
    }
}