import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Question} from "./models/question";
import {Answer} from "./models/answer";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  private URL = "";
  constructor(private Httpclient : HttpClient) { }

  upVote(index, questionID){
    return this.Httpclient.put(this.URL+'api/answers/upVote',{"answerIndex":index,"questionID":questionID});
  }

  downVote(index,questionID){
    return this.Httpclient.put(this.URL+'api/answers/downVote',{"answerIndex":index, "questionID":questionID});
  }

  addAnswer(answer):Observable<Answer>{

    return this.Httpclient.post<Answer>(this.URL+'api/answers/add', answer);
  }
}

