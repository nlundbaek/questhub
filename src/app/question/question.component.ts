import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QuestionsService} from "../questions.service";
import {Question} from "../models/question";
import {AnswersService} from "../answers.service";
import {Answer} from "../models/answer";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
public question : Question;
  public name:string = "";
  public answer:string="";
  public questionID:number=0;


  constructor(
    private route: ActivatedRoute,
    public questionService: QuestionsService,
    public answerService: AnswersService
  ) { }





  ngOnInit() {
    this.route.params.subscribe(params => {
      const index = +params['index'];
      this.questionID = index;
      this.questionService.getQuestionByIndex(index).subscribe(
        (question) => {
          this.question = question;
        },
        response => {
          alert("not found");
        },
        () => {

        }
      )
    })

  }

  addAnswer(){
    const newAnswer: Answer = {
      name: this.name,
      answer:this.answer,
      questionID:this.questionID,
      timestamp : new Date(),
      rating:0
    };
    this.answerService.addAnswer(newAnswer).subscribe(
      (val) => {
        this.name = this.answer = '';
        this.question.answers.push(newAnswer)
      },
      response => {

      },
      () => {

      }
    );
  }

  upVote(index, answer:Answer){
    this.answerService.upVote(index, this.questionID).subscribe(
      () => {

        answer.rating++
      },
      response => {
        console.log(response);
        alert("REEEE");
      },
      () => {

      }
    )
  };

  downVote(index, answer:Answer){
    this.answerService.downVote(index, this.questionID).subscribe(
      () => {

        answer.rating--
      },
      response => {
        console.log(response);
        alert("REEEE");
      },
      () => {

      }
    )
  };

}
