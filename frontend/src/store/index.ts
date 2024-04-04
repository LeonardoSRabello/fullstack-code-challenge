import { Users } from "./users";
import { Questions } from "./questions";
import { Alerts } from "./alerts";
import { QuestionAnswers } from "./questionAnswers";
import { UserAnswers } from "./userAnswers";

export class RootStore {
  users: Users;
  questions: Questions;
  alerts: Alerts;
  questionAnswers: QuestionAnswers;
  userAnswers: UserAnswers;

  constructor() {
    this.users = new Users();
    this.questions = new Questions(this);
    this.alerts = new Alerts();
    this.questionAnswers = new QuestionAnswers(this);
    this.userAnswers = new UserAnswers(this);
  }
}
