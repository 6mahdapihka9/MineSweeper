import {Component, EventEmitter, Output, Input} from '@angular/core';
import {Field} from "../../../../../entities/field";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent{

  @Input() id: string|undefined
  // @ts-ignore
  @Input() field: Field

  //для отображения количества отмеченых мин
  @Output() mineMarked = new EventEmitter();
  //игрок взорвал мину
  @Output() mineExploded = new EventEmitter();
  //открыть поле и вызвать в родителе каскад если мин рядом нет
  @Output() fieldOpened = new EventEmitter();

  constructor() {
    this.field = {
      i: 0,
      j: 0,
      isMined: false,
      isMarked: false,
      minesAround: 0,
      isLeftClicked: false,
      id: '0-0'
    }
  }

  leftClick(){
    if (!this.field?.isMarked) {
      if (this.field?.isMined) {
        this.mineExploded.emit(true)
      } else if (this.field?.minesAround === 0) {
        this.fieldOpened.emit({
          i: this.field?.i,
          j: this.field?.j
        })
      } else {
        this.fieldOpened.emit()
      }
      // @ts-ignore
      this.field?.isLeftClicked = true
    }
  }

  rightClick(){
    this.mineMarked.emit( !this.field?.isMarked )
    if (this.field)
      this.field.isMarked = !this.field.isMarked
  }
}
