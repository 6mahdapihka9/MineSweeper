import { Component, OnInit } from '@angular/core';
import {Board} from "../../entities/board";
import {animate, style, transition, trigger} from "@angular/animations";
import {animations, buildRouteTransition} from "ngx-animations";

// @ts-ignore
// @ts-ignore
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  animations: [
    trigger('insertRemoveBoard', [
      // transition('void => *', [
      //   animations.fadeIn(125)
      // ]),
      // transition('* => void', [
      //   animations.fadeOut(125)
      // ])
      transition(':enter', [
        style({ opacity: 0, display: 'none'}),
        animate('300ms', style({ opacity: 1, display: 'flex' })),
      ]),
      transition(':leave', [
        style({ opacity: 1, display: 'flex'}),
        animate('300ms', style({ opacity: 0, display: 'none' }))
      ])

    ]),
    trigger('insertRemoveForm', [
      // buildRouteTransition({
      //   stateChangeExpr: '* => *',
      //   enter: animations.fadeIn(125),
      //   leave: animations.fadeOut(125),
      // })
      transition(':enter', [
        style({ opacity: 0, display: 'none'}),
        animate('300ms', style({ opacity: 1, display: 'flex' })),
      ]),
      transition(':leave', [
        style({ opacity: 1, display: 'flex'}),
        animate('300ms', style({ opacity: 0, display: 'none' }))
      ])
    ])
  ],
  host: {
    class: 'content'
  }
})
export class GameComponent{
  gameBuilt: boolean
  board: Board|undefined
  amountOfFields: number|undefined
  userName: string | undefined;

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

  setUserName(name: string) {
    this.userName = name
  }
}
