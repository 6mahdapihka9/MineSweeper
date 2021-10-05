import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Board} from "../../../entities/board";
import {StatisticsService} from "../../../service/statistics.service";
import {RecordsService} from "../../../service/records.service";
import {BoardComponent} from "./board/board.component";

@Component({
  selector: 'app-gameplay-container',
  templateUrl: './gameplay-container.component.html',
  styleUrls: ['./gameplay-container.component.css']
})

export class GameplayContainerComponent{

  @Input() userName: string|undefined
  @Input() board: Board|undefined
  @Input() amountOfFields: number|undefined
  @Input() minesTotal: number|undefined
  @Input() minesLeft: number|undefined

  @Output() newBoard = new EventEmitter()


  @ViewChild(BoardComponent)
  private boardComp: BoardComponent|undefined;

  gameStart: Date
  gameEnded: boolean
  userLost: boolean
  minesMarked: number
  clicked = false

  constructor(public SS: StatisticsService, public RS: RecordsService) {
    this.gameStart = new Date()
    this.gameEnded = false
    this.userLost = false
    this.minesMarked = 0
  }

  generateNewBoard(){
    this.newBoard.emit()
  }

  restartBoard() {
    this.board?.fields.forEach(row => {
      row.forEach(f => f.isLeftClicked = f.isMarked = false )
    });

    this.clicked = false
    this.gameEnded = false
    this.userLost = false
    this.minesMarked = 0
    if (this.board && this.boardComp)
      this.boardComp.amountOfFields = this.amountOfFields = this.board.width*this.board.height
  }

  changeAmountOfMinesLeft(howChanged: any){
    if (typeof howChanged === "boolean")
      this.minesMarked += (howChanged)? 1 : -1
    else
      this.minesMarked = howChanged

    if (this.minesTotal)
      this.minesLeft = this.minesTotal - this.minesMarked
  }

  gameStarted(){
    if (!this.clicked){
      this.clicked = true
      this.gameStart = new Date()
    }
  }

  gameCondition(userLost: boolean){
    this.userLost = userLost
    this.gameEnded = true

    if (this.board && this.gameStart){
      // let id = '', name = '',
      //   chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
      //
      // for (let i = 0; i < 10; i++) {
      //   id += chars.charAt(Math.floor(Math.random() * chars.length));
      //   name += chars.charAt(Math.floor(Math.random() * chars.length));
      // }

      let endDate = new Date();
      // @ts-ignore
      let time = (endDate - this.gameStart)/1000;

      this.SS.createStatistic({
        date: this.gameStart,
        width: this.board.width,
        height: this.board.height,
        mines: this.board.mines,
        time: time,
        playerName: this.userName? this.userName : '',
        lost: userLost
      }).catch(error => console.log(error));


      //todo выяснить есть ли такое полев таблице
      //добавить новое, если нет
      //обновить существующее, если да

      if (!this.userLost){
        // @ts-ignore
        let rec = this.RS.records.find(rec => {
          return rec.payload.doc.data().width === this.board?.width &&
            rec.payload.doc.data().height === this.board?.height &&
            rec.payload.doc.data().mines === this.board?.mines;
        });

        if (!rec)
          this.RS.createRecord({
            width: this.board.width,
            height: this.board.height,
            mines: this.board.mines,
            fastestTime: time,
            playerName: this.userName? this.userName : '--',
            date: this.gameStart,
            averageTime: time,
            amountOfGames: 1
          }).catch(error => console.log(error));
        else
          this.RS.updateRecord(rec.payload.doc.id, {
            fastestTime: (rec.payload.doc.data().fastestTime > time)? time : rec.payload.doc.data().fastestTime,
            playerName: (rec.payload.doc.data().fastestTime > time)? this.userName? this.userName : '--' : rec.payload.doc.data().playerName,
            date: (rec.payload.doc.data().fastestTime > time)? this.gameStart : rec.payload.doc.data().date,
            averageTime: (rec.payload.doc.data().averageTime*rec.payload.doc.data().amountOfGames + time)/(rec.payload.doc.data().amountOfGames+1),
            amountOfGames: rec.payload.doc.data().amountOfGames+1
          }).catch(error => console.log(error));
      }


    }
  }
}
