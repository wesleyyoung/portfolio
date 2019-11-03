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

export interface Skill {
  name: string;
  name_accent: string;
  img: string;
  rating: number;
  color: string;
}

export interface Experience {
  title: string;
  subtitle: string;
  dateRange: string;
  text: string;
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

  public isScrollingUpWatcher: boolean = false;
  public isScrollingUp = new Subject<boolean>();
  public isScrollingDnWatcher: boolean = false;
  public isScrollingDn = new Subject<boolean>();

  public atTopWatcher: boolean = window.scrollY == 0;
  public atTop = new Subject<boolean>();

  private previousHeight: number = window.scrollY;

  public skills: Array<Skill> = [{
    name: 'Node',
    name_accent: 'JS',
    img: './assets/imgs/nodejs.webp',
    color: '#81cf08',
    rating: 5
  }, {
    name: 'Type',
    name_accent: 'Script',
    img: './assets/imgs/typescript.webp',
    color: '#007acc',
    rating: 3
  }, {
    name: 'Amazon ',
    name_accent: 'Web Services',
    img: './assets/imgs/aws.webp',
    color: '#ff9900',
    rating: 4
  }, {
    name: 'C',
    name_accent: '#',
    img: './assets/imgs/csharp.webp',
    color: '#953dac',
    rating: 2
  }, {
    name: 'Angular',
    name_accent: '',
    img: './assets/imgs/angular.webp',
    color: '#dd0031',
    rating: 4
  }, {
    name: 'Ionic ',
    name_accent: 'Framework',
    img: './assets/imgs/ionic.webp',
    color: '#008bff',
    rating: 3
  }, {
    name: 'HTML',
    name_accent: '5',
    img: './assets/imgs/html5.webp',
    color: '#ff6d00',
    rating: 5
  }, {
    name: 'Python',
    name_accent: '',
    img: './assets/imgs/python.webp',
    color: '#ffd747',
    rating: 2
  }, {
    name: 'Mongo',
    name_accent: 'DB',
    img: './assets/imgs/mongodb.webp',
    color: '#81c564',
    rating: 3
  }, {
    name: 'Linux',
    name_accent: '',
    img: './assets/imgs/linux.webp',
    color: '#f79c3d',
    rating: 4
  }];

  public experiences: Array<Experience> = [{
    title: 'BidSync - American Fork, UT',
    subtitle: 'Customer Service Associate',
    dateRange: 'November 2014 to June 2015',
    text: 'At BidSync I was responsible for assisting contractors and other small businesses in using the site. It was my first full-time job and it taught me a lot about how effective web-technologies can be in shaping how we interact in the public and private marketplace.'
  }, {
    title: 'Mountainland Applied Technology College - Lehi, UT',
    subtitle: 'Certification in Web Development',
    dateRange: 'August 2015 to May 2016',
    text: 'I left my job at BidSync to persue my interest in Web Development. '
  }, {
    title: 'Bask Technology - Lehi, UT',
    subtitle: 'Lead Coordinator',
    dateRange: 'December 2015 to September 2016',
    text: 'My responsibility at bask was to manage a monthly budget of ~$100,000 for Google AdWords campaigns and assist with increasing ad profitability. Within my first month of working at Bask, I improved the daily average revenue gained from online advertising from ~5% to above 400%'
  }, {
    title: 'Xactware Solutions - Lehi, UT',
    subtitle: 'Intern',
    dateRange: 'May 2016 to October 2016',
    text: 'I worked with management in Xactware\'s Training department to design and build an internal tool for the purpose of scheduling ride-alongs between trainers and participating clients.'
  }, {
    title: 'Vision Smart Homes - Saint George, UT',
    subtitle: 'Systems Programmer',
    dateRange: 'May 2018 - Present',
    text: 'I install and program routers, switches, Wi-Fi access points, TVs, home theaters, and then integrate them with control systems such as Control 4 and Crestron.'
  }];

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
