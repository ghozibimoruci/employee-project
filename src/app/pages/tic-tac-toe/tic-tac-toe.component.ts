import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'tic-tac-toe',
    templateUrl: 'tic-tac-toe.component.html',
    styleUrls: ['tic-tac-toe.component.scss']
})

export class TicTacToeComponent implements OnInit {
    fieldValue = null;
    gameLength = 0;
    firstPlayer = true;
    gameArray = [];
    ngOnInit(): void {
    }
    setGameLength(){
        if(this.fieldValue>2){
            this.gameLength = this.fieldValue;
            for(let i = 0; i < this.gameLength; i++){
                let pushArray = Array.from({length: this.gameLength}, ()=>'');
                this.gameArray.push(pushArray);
            }
        }else{
            alert('Game Length is too short');
            this.resetGame();
        }
    }
    clickYourTurn(column, row){
        this.gameArray[row][column] = (this.firstPlayer?'X':'O');
        let checkIfTrue = (theText: string) => {
            return theText==(this.firstPlayer?'X':'O');
        }
        let countDiagRight = 0, countDiagLeft = 0,
        countHori = 0, countVerti = 0, horiFull = 0, vertiFull = 0;
        for(let i = 0; i < this.gameLength; i++){
            for(let j = 0; j < this.gameLength; j++){
                if(checkIfTrue(this.gameArray[i][j])){
                    countHori++
                }
                if(checkIfTrue(this.gameArray[j][i])){
                    countVerti++
                }
            }
            if(countHori != this.gameLength && countVerti != this.gameLength){
                if(checkIfTrue(this.gameArray[i][i])){
                    countDiagLeft++
                }
                if(checkIfTrue(this.gameArray[this.gameLength - 1 - i][i])){
                    countDiagRight++
                }
            }else{
                if(countHori == this.gameLength){
                    horiFull++
                }
                if(countVerti == this.gameLength){
                    vertiFull++
                }
            }
            countVerti = 0;
            countHori = 0;
        }
        if(
            horiFull>0||vertiFull>0||
            countDiagLeft==this.gameLength||
            countDiagRight==this.gameLength
        ){
            setTimeout(()=>{
                alert(`${this.firstPlayer?'First':'Second'} Player Win the Game!`);
                this.resetGame();
            })
        }else{
            let stringCount = '';
            this.gameArray.forEach(
                array => {
                    stringCount += array.join('');
                }
            )
            if(stringCount.length == (this.gameLength*this.gameLength)){
                setTimeout(()=>{
                    alert('The Game is Draw');
                    this.resetGame();
                })
            }else{
                this.firstPlayer = !this.firstPlayer;
            }
        }
    }
    resetGame(){
        this.gameLength = 0;
        this.fieldValue = null;
        this.gameArray = [];
    }
}