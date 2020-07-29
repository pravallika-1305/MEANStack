import { Component,AfterViewInit } from '@angular/core';
import '../vendor/jitsi/external_api.js'
declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jitsi';
  domain: string = "meet.jit.si";
  options:any;
  api:any;

  ngAfterViewInit(): void {
    this.options = {
      roomName:"EdunateJitsiMeet",
      width: 700,
      height: 700,
      parentNode: document.querySelector('#meet')
    }
    this.api = new JitsiMeetExternalAPI(this.domain,this.options);
  }
}
