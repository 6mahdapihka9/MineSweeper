import {Field} from "./field";

export interface Board{
  width:number;
  height:number;
  mines:number;
  fields:Field[][]
}
