import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Answer} from "./models/answer";
import {Question} from "./models/question";
import {Observable, timer} from "rxjs";
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
 public questions : Question[] = [];
 private URL = "";


  constructor(private Httpclient : HttpClient) {
    timer(0, 1000)
      .pipe(switchMap(
        _ => this.Httpclient.get<Question[]>(this.URL+'api/questions/get/all'))
      ).subscribe(data => {
      this.questions = data;
    })
  }

  
  addQuestion(newQuestion):Observable<Question>{

    return this.Httpclient.post<Question>(this.URL+'api/questions/add', newQuestion);

  }

  getQuestionByIndex(index:number):Observable<Question>{
    return this.Httpclient.get<Question>(this.URL+"api/questions/get/"+index);
  }
  
}

