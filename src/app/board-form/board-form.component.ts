import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Board} from "../entities/board";

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.css']
})
export class BoardFormComponent implements OnInit {

  @Output() tryToBuildBoard = new EventEmitter<Board>();

  width: number;
  height: number;
  mines: number;

  constructor() {
    this.width = this.height = 10;
    this.mines = 20;
  }

  changeWidth(event: any){
    let value = event.target.value;
    if (+value > 9 && +value < 41)
      this.width = +value;
    else
      event.target.value = this.width;
  }

  changeHeight(event: any){
    let value = event.target.value;
    if (+value > 9 && +value < 21)
      this.height = +value;
    else
      event.target.value = this.height;
  }

  changeMines(event: any){
    let value = event.target.value;
    if (+value > 9 && +value < Math.floor((this.width*this.height)/2))
      this.mines = +value;
    else
      event.target.value = this.mines;
  }

  submit(){
    let matrix = new Array(this.height).fill(
      new Array(this.width).fill(undefined)
    );

    matrix = matrix.map((value, index) => {
      return value.map((currentValue: any, wIndex: any) => {
        return {
          i: index,
          j: wIndex,
          isMined: false,
          isMarked: false,
          minesAround: 0,
          id: index+'-'+wIndex
        }
      })
    })

    let iter = this.mines
    let i: number, j:number
    do {
      i = Math.floor(Math.random() * this.height);
      j = Math.floor(Math.random() * this.width);
      if (!matrix[i][j].isMined){
        matrix[i][j].isMined = true

        if (i > 0){
          matrix[i - 1][j].minesAround++
          if (j > 0)
            matrix[i - 1][j - 1].minesAround++
          if (j < this.width-1)
            matrix[i - 1][j + 1].minesAround++
        }

        if (i < this.height-1){
          matrix[i + 1][j].minesAround++
          if (j > 0)
            matrix[i + 1][j - 1].minesAround++
          if (j < this.width-1)
            matrix[i + 1][j + 1].minesAround++
        }

        if (j > 0)
          matrix[i][j - 1].minesAround++
        if (j < this.width-1)
          matrix[i][j + 1].minesAround++
        iter--;
      }
    } while(iter > 0);

    this.tryToBuildBoard.emit({
      width: this.width,
      height: this.height,
      mines: this.mines,
      fields: matrix
    });
  }

  ngOnInit(): void {
  }

}
