import { Component, OnInit } from '@angular/core';
import { fromEvent, interval } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.css',
    '../../assets/fonts/custom-fonts.css'
  ]
})
export class DashboardComponent implements OnInit {

  public titles: Array<any> = [
    {
      txt: "Web Developer.",
      style: ""
    }, {
      txt: "Audio Visual Tech.",
      style: ""
    }, {
      txt: "IT Wizard.",
      style: ""
    }, {
      txt: "Keyboard Warrior.",
      style: ""
    }
  ];
  
  public titleIndex: number = 0;
  public title: any = this.titles[this.titleIndex];
  public titleChange;
  public isMobile: boolean = this.api.isMobileWatcher;
  public isMedium: boolean = this.api.isMediumWatcher;

  constructor(private api: ApiService) {

    this.titleChange = setInterval(() => {

      this.titleIndex++;

      if (this.titleIndex >= this.titles.length) {
        this.titleIndex = 0;
      }

      this.title = this.titles[this.titleIndex];

    }, 5000);
  }

  ngOnInit() {
    this.titleChange.value;
    this.api.isMobile.subscribe(isMobile => {
      this.isMobile = isMobile;
    });
    this.api.isMedium.subscribe(isMed => {
      this.isMedium = isMed;
    });
  }

}
