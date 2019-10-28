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
};

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

  public isScrollingUpWatcher: boolean = false;
  public isScrollingUp = new Subject<boolean>();
  public isScrollingDnWatcher: boolean = false;
  public isScrollingDn = new Subject<boolean>();

  public atTopWatcher: boolean = window.scrollY == 0;
  public atTop = new Subject<boolean>();

  private previousHeight: number = window.scrollY;

  constructor(
    private http: HttpClient
  ) {

    window.addEventListener('resize', ev => {

      this.isMobileWatcher = window.innerWidth <= this.mobileWidthTrigger || window.innerHeight <= this.mobileHeightTrigger;
      this.isMediumWatcher = !this.isMobileWatcher && window.innerWidth < this.mediumWidthTrigger;
      this.isMobile.next(this.isMobileWatcher);
      this.isMedium.next(this.isMediumWatcher);
    });

    window.addEventListener('scroll', ev => {

      if (window.scrollY > this.previousHeight) {
        this.isScrollingDnWatcher = true;
        this.isScrollingUpWatcher = false;
      } else {
        this.isScrollingDnWatcher = false; 
        this.isScrollingUpWatcher = true;
      }
  
      this.previousHeight = window.scrollY;
      this.atTopWatcher = window.scrollY == 0;

      this.atTop.next(this.atTopWatcher);
      this.isScrollingDn.next(this.isScrollingDnWatcher);
      this.isScrollingUp.next(this.isScrollingUpWatcher);

      setTimeout(() => {

        this.isScrollingDnWatcher = false;
        this.isScrollingUpWatcher = false;
      }, 100);
    });
  }

  public contactMe(form: ContactForm, success: Function, err: Function): void {

    this.http.post('https://wesprodev.com/contact', form)
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
