import { Component, OnInit } from '@angular/core';
import { SmsService } from '../sms.service';
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-smsform',
  templateUrl: './smsform.component.html',
  styleUrls: ['./smsform.component.css']
})
export class SmsformComponent implements OnInit {
  loading = false;
  buttonText = "SEND";
  
  phoneFormControl = new FormControl("", [
    Validators.required,
    //Validators.maxLength(12)
  ]);
  
  nameFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(4)
  ]);
  messageFormControl = new FormControl("", [
    Validators.required
  ]);
  
    getErrorMessage() {
      if (this.phoneFormControl.hasError('required')) {
        return 'You must enter a value';
      }
  
      return this.phoneFormControl.hasError('phoneFormControl') ? 'Not a valid email' : '';
    }
    constructor(public smsService: SmsService ) { }
  
    ngOnInit(): void {
    }
    register() {
      this.loading = true;
      this.buttonText = "Sending...";
      let user = {
        name: this.nameFormControl.value,
        phone: this.phoneFormControl.value,
        message: this.messageFormControl.value
      }
      this.smsService.sendMessage("http://localhost:3000/sendSMS", user).subscribe(
      data => {
        let res:any = data; 
        console.log(
          `👏 > 👏 > 👏 > 👏 ${user.name}s details are sent successfully, the message id is ${res.messageId}`
        );
      },
      err => {
        console.log(err);
        this.loading = false;
        this.buttonText = "SEND";
      },() => {
        this.loading = false;
        this.buttonText = "SEND";
      }
    );
}
}

