import { 
  Injectable,
  Component,
  OnInit,
  Inject,
  HostListener,
  NgZone ,
  ViewChild
} from '@angular/core';
import { 
  Subject,
  Observable
 } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';

export interface ContactForm {
  name: string,
  email: string,
  phone: string,
  message: string;
  sent: Date
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public mobileWidthTrigger = 600;
  public mobileHeightTrigger = 600;
  public mediumWidthTrigger = 1020;
  public isMobileWatcher: boolean = window.innerWidth <= this.mobileWidthTrigger || window.innerHeight <= this.mobileHeightTrigger;
  public isMobile = new Subject<boolean>();
  public isMediumWatcher: boolean = !this.isMobileWatcher && window.innerWidth <= this.mediumWidthTrigger;
  public isMedium = new Subject<boolean>();

  constructor(
    private http: HttpClient
  ) {
    window.addEventListener('resize', ev => {
      this.isMobileWatcher = window.innerWidth <= this.mobileWidthTrigger || window.innerHeight <= this.mobileHeightTrigger;
      this.isMediumWatcher = !this.isMobileWatcher && window.innerWidth < this.mediumWidthTrigger;
      this.isMobile.next(this.isMobileWatcher);
      this.isMedium.next(this.isMediumWatcher);
    });
  }

  public contactMe(form: ContactForm, success: Function, err: Function): void {
    this.http.post('http://wesprodev.com/contact', form)
      .subscribe(
        data => {
          success(data);
        },
        error  => {
          err(error);
        }
      )
  }
}
