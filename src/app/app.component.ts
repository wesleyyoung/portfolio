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

  public links: Array<any> = [{
    name: 'HOME',
    url: '/'
  }, {
    name: 'ABOUT',
    url: 'about'
  }];

  public squigglePoints: Array<string> = [
    '0,0',
    '10,10',
    '20,0',
    '30,10',
    '40,0',
    '50,10',
    '60,0',
    '70,10',
    '80,0',
    '90,10',
    '100,0',
    '110,10'
  ];

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
