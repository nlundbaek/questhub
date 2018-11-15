import { Component, OnInit } from '@angular/core';
import {QuestionsService} from "../questions.service";
import {Question} from "../models/question";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  public name:string = "";
  public title:string="";
  public question:string="";

  constructor(public QuestionService:QuestionsService) {


  }

  ngOnInit() {
  }

  addQuestion(){
    const newQuestion: Question = {
      name: this.name,
      title:this.title,
      question:this.question
    };
    this.QuestionService.addQuestion(newQuestion).subscribe(
      (val) => {
        this.name = this.title = this.question = '';
      },
      response => {

      },
      () => {

      }
    );
  }


}
