import {Component, EventEmitter, Input, Output, ViewChildren} from '@angular/core';
import {FieldComponent} from "./field/field.component";
import {Board} from "../../entities/board";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent{
  @Input() board: Board|undefined;
  @Input() amountOfFields: number|undefined;

  @Output() minesMarked = new EventEmitter();
  @Output() gameEnded = new EventEmitter();

  @ViewChildren(FieldComponent)
  private buttonComp: FieldComponent[]|undefined;

  minesLeftChange(howChanged: boolean){
    this.minesMarked.emit(howChanged)
  }

  mineExploded(){
    this.gameEnded.emit(true)
  }

  spacesLeftChange(zma: any){
    //zma = fieldWithZeroMinesAround
    //вызвать каскад открытий пустых полей
    setTimeout(()=>{
      if (zma){
        let i = zma.i,
            j = zma.j

        if (this.buttonComp) {
          this.buttonComp.filter(child => {
            if (this.board)
              if ((
                (i > 0 && child.id === "" + (i - 1) + "-" + j) ||
                (i < this.board?.height && child.id === "" + (i + 1) + "-" + j) ||
                (j > 0 && child.id === "" + i + "-" + (j - 1)) ||
                (j < this.board?.width && child.id === "" + i + "-" + (j+1)) ||
                (i > 0 && j > 0 && child.id === "" + (i - 1) + "-" + (j - 1)) ||
                (i > 0 && j < this.board?.width && child.id === "" + (i - 1) + "-" + (j + 1)) ||
                (i < this.board?.height && j > 0 && child.id === "" + (i + 1) + "-" + (j - 1)) ||
                (i < this.board?.height && j < this.board?.width && child.id === "" + (i + 1) + "-" + (j + 1))
              ) && !child.field?.isLeftClicked)
                return true
            return false
          }).forEach(neighbour => neighbour.leftClick())
        }
      }
    },0)

    if (this.amountOfFields && this.board) {
      this.amountOfFields--
      if ((this.amountOfFields - this.board?.mines) === 0) {
        this.gameEnded.emit(false)
        this.minesMarked.emit(this.board.mines)
      }
    }
  }
}
