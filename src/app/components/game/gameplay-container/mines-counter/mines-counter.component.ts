import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-mines-counter',
  templateUrl: './mines-counter.component.html',
  styleUrls: ['./mines-counter.component.css']
})
export class MinesCounterComponent{
  @Input() minesTotal: number|undefined
  @Input() minesLeft: number|undefined

  @Output() newBoard = new EventEmitter();
  @Output() restartBoard = new EventEmitter();

  generateNewBoard(){
    this.newBoard.emit()
  }

  restartGame() {
    this.restartBoard.emit()
  }
}
