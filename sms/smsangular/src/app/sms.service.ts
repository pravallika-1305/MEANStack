import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  constructor(public smsService: HttpClient) { }
  sendMessage(url, data) {
    return this.smsService.post(url, data);
  }
}
