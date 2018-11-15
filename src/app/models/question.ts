import {Answer} from "./answer";

export interface Question {
  name:string,
  title:string,
  question:string,
  timestamp?:number,
  answers?:Answer[]
}
