import {Component, EventEmitter, Input, Output } from '@angular/core';
import {Board} from "../entities/board";

@Component({
  selector: 'app-gameplay-container',
  templateUrl: './gameplay-container.component.html',
  styleUrls: ['./gameplay-container.component.css']
})

export class GameplayContainerComponent{

  @Input() board: Board|undefined
  @Input() amountOfFields: number|undefined
  @Input() minesTotal: number|undefined

  @Output() newBoard = new EventEmitter()

  gameEnded: boolean
  userLost: boolean
  minesMarked: number
  minesLeft: number

  constructor() {
    this.gameEnded = false
    this.userLost = false
    this.minesMarked = 0
    this.minesLeft = 0
  }

  generateNewBoard(){
    this.newBoard.emit()
  }

  changeAmountOfMinesLeft(howChanged: any){
    if (typeof howChanged === "boolean")
      this.minesMarked += (howChanged)? 1 : -1
    else
      this.minesMarked = howChanged

    if (this.minesTotal)
      this.minesLeft = this.minesTotal - this.minesMarked
  }

  gameCondition(userLost: boolean){
    this.userLost = userLost
    this.gameEnded = true
  }
}
