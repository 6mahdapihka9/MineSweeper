import {Component, EventEmitter, Output, Input} from '@angular/core';
import {Field} from "../../../entities/field";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent{
  text: string

  @Input() id: string|undefined
  @Input() field: Field|undefined

  //для отображения количества отмеченых мин
  @Output() mineMarked = new EventEmitter();
  //игрок взорвал мину
  @Output() mineExploded = new EventEmitter();
  //открыть поле и вызвать в родителе каскад если мин рядом нет
  @Output() fieldOpened = new EventEmitter();

  constructor() {
    this.text = ""
  }

  leftClick(){
    if (!this.field?.isMarked) {
      if (this.field?.isMined) {
        this.text = "💣"
        this.mineExploded.emit(true)
      } else if (this.field?.minesAround === 0) {
        this.fieldOpened.emit({
          i: this.field?.i,
          j: this.field?.j
        })
      } else {
        this.text = ""+this.field?.minesAround
        this.fieldOpened.emit()
      }
      // @ts-ignore
      this.field?.isLeftClicked = true
    }
  }

  rightClick(){
    if (this.field?.isMarked) {
      this.text = ""
      this.mineMarked.emit(false)
    } else {
      this.text = "🚩"
      this.mineMarked.emit(true)
    }
    // @ts-ignore
    this.field?.isMarked = !this.field?.isMarked
  }
}
