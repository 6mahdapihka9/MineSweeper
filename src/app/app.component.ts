import { Component } from '@angular/core';

import { Board } from "./entities/board";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  gameBuilt: boolean
  board: Board|undefined
  amountOfFields: number|undefined

  constructor() {
    this.gameBuilt = false
    window.oncontextmenu = (e:any) => {
      e.preventDefault();
    }
  }
  setBoard(board:any){
    this.gameBuilt = true;
    this.board = board
    this.amountOfFields = board.width*board.height
  }
  newBoard(){
    this.gameBuilt = false;
  }
}
