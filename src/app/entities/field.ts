export interface Field {
  i: number;
  j: number;
  isMined: boolean;
  isMarked: boolean;
  minesAround?:number;
  isLeftClicked?:boolean;
  id: string
}
