import { Injectable } from '@angular/core';
import { 
  Component,
  OnInit,
  Inject,
  HostListener,
  NgZone ,
  ViewChild
} from '@angular/core';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

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

  constructor() {
    window.addEventListener('resize', ev => {
      this.isMobileWatcher = window.innerWidth <= this.mobileWidthTrigger || window.innerHeight <= this.mobileHeightTrigger;
      this.isMediumWatcher = !this.isMobileWatcher && window.innerWidth < this.mediumWidthTrigger;
      this.isMobile.next(this.isMobileWatcher);
      this.isMedium.next(this.isMediumWatcher);
    });
  }
}
