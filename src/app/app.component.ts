import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    '../assets/fonts/custom-fonts.css'
  ]
})
export class AppComponent implements OnInit {

  title = 'Welsey Young Portfolio';

  public previousHeight: number = window.scrollY;
  public atTop: boolean = this.previousHeight == 0;
  public isMobile: boolean = this.api.isMobileWatcher;
  public isMedium: boolean = this.api.isMediumWatcher;

  constructor(
    private api: ApiService
  ) {

  }

  @HostListener('window:scroll', ['$event']) onscroll(ev) {
    this.previousHeight = window.scrollY;
    this.atTop = window.scrollY == 0;
  }

  ngOnInit() {
    this.api.isMobile.subscribe(isMobile => {
      this.isMobile = isMobile;
    });
    this.api.isMedium.subscribe(isMed => {
      this.isMedium = isMed;
    });
  }
}
