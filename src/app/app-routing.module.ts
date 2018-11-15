import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from "@angular/router";
import { QuestionsComponent } from './questions/questions.component';
import { AnswersComponent } from './answers/answers.component';
import { QuestionComponent } from './question/question.component';
import {LoginComponent} from "./login/login.component";

const appRoutes : Routes = [
  { path: "login", component: LoginComponent },
  { path: "", component : QuestionsComponent},
  { path: "question/:index", component : QuestionComponent},
  { path: "**", redirectTo: ""}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false})
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
