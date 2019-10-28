import {
  Component,
  HostListener,
  OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss',
    '../assets/fonts/custom-fonts.css'
  ]
})
export class AppComponent implements OnInit {

  title = 'Welsey Young Portfolio';

  public atTop: boolean = this.api.atTopWatcher;
  public isMobile: boolean = this.api.isMobileWatcher;
  public isMedium: boolean = this.api.isMediumWatcher;

  constructor(
    private api: ApiService
  ) {

  }

  ngOnInit() {
    this.api.isMobile.subscribe(isMobile => {
      this.isMobile = isMobile;
    });
    this.api.isMedium.subscribe(isMed => {
      this.isMedium = isMed;
    });
    this.api.atTop.subscribe(isAtTop => {
      this.atTop = isAtTop;
    });
  }
}
