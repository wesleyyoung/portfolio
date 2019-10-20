import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { fromEvent, interval } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { ApiService } from '../api.service';

export interface Skill {
  name: string;
  name_accent: string;
  img: string;
  rating: number;
  color: string;
}

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
  public skills: Array<Skill> = [{
      name: 'Node',
      name_accent: 'JS',
      img: './assets/imgs/nodejs.png',
      color: '#81cf08',
      rating: 5
    }, {
      name: 'Type',
      name_accent: 'Script',
      img: './assets/imgs/typescript.png',
      color: '#007acc',
      rating: 3
    }, {
      name: 'Amazon ',
      name_accent: 'Web Services',
      img: './assets/imgs/aws.png',
      color: '#ff9900',
      rating: 4
    }, {
      name: 'C',
      name_accent: '#',
      img: './assets/imgs/csharp.png',
      color: '#953dac',
      rating: 2
    }, {
      name: 'Angular',
      name_accent: '',
      img: './assets/imgs/angular.png',
      color: '#dd0031',
      rating: 4
    }, {
      name: 'Ionic ',
      name_accent: 'Framework',
      img: './assets/imgs/ionic.png',
      color: '#008bff',
      rating: 3
    }, {
      name: 'HTML',
      name_accent: '5',
      img: './assets/imgs/html5.png',
      color: '#ff6d00',
      rating: 5
    }, {
      name: 'Python',
      name_accent: '',
      img: './assets/imgs/python.png',
      color: '#ffd747',
      rating: 2
    }, {
      name: 'Mongo',
      name_accent: 'DB',
      img: './assets/imgs/mongodb.png',
      color: '#81c564',
      rating: 3
    }, {
      name: 'Linux',
      name_accent: '',
      img: './assets/imgs/linux.png',
      color: '#f79c3d',
      rating: 4
    }
  ];

  constructor(
    private api: ApiService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {

    iconRegistry.addSvgIcon('linkedin', sanitizer.bypassSecurityTrustResourceUrl('assets/linkedin.svg'));
    iconRegistry.addSvgIcon('github', sanitizer.bypassSecurityTrustResourceUrl('assets/github.svg'));
    iconRegistry.addSvgIcon('twitter', sanitizer.bypassSecurityTrustResourceUrl('assets/twitter.svg'));
    iconRegistry.addSvgIcon('star', sanitizer.bypassSecurityTrustResourceUrl('assets/star.svg'));
    iconRegistry.addSvgIcon('halfStar', sanitizer.bypassSecurityTrustResourceUrl('assets/star-half.svg'));
    iconRegistry.addSvgIcon('emptyStar', sanitizer.bypassSecurityTrustResourceUrl('assets/star-empty.svg'));

    this.titleChange = setInterval(() => {

      this.titleIndex++;

      if (this.titleIndex >= this.titles.length) {
        this.titleIndex = 0;
      }

      // this.title = this.titles[this.titleIndex];

    }, 5000);
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
