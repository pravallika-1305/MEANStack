import { Component } from '@angular/core';
import { SmsService } from './sms.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smsangular';
  constructor(public smsService: SmsService){}
}
