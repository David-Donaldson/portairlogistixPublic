import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) { }

  submitContactform(requestdata: any, captchaToken: any) {
    var url = `${environment.apiUrl}/api/PortairLogistix/contactForm/`;
    return this.http.post(url, requestdata, {params: {captchaToken}});
  }
}
