import { makeAutoObservable, observable, action } from "mobx";

export class Alerts {
  type: string = "success";
  message: string = "";
  open: boolean = false;

  constructor() {
    makeAutoObservable(this, {
      type: observable,
      message: observable,
      open: observable,
      alert: action,
      dismiss: action
    });
  }

  alert(type: string, message: string) {
    this.type = type;
    this.message = message;
    this.open = true;
  }

  dismiss() {
    this.open = false;
  }
}
