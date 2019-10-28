import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { MatIconRegistry } from '@angular/material/icon';
import { fromEvent, interval } from 'rxjs';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { ApiService } from '../api.service';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';

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
    './dashboard.component.scss',
    '../../assets/fonts/custom-fonts.css'
  ]
})
export class DashboardComponent implements OnInit {

  public isMobile: boolean = this.api.isMobileWatcher;
  public isMedium: boolean = this.api.isMediumWatcher;

  public isScrollingUp: boolean = this.api.isScrollingUpWatcher;
  public isScrollingDn: boolean = this.api.isScrollingDnWatcher;

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

  public titles: Array<any> = [{
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
    }];

  public titleIndex: number = 0;
  public title: any = this.titles[this.titleIndex];
  public titleChange;

  @ViewChild('molecularBg', { static: true }) canvas: ElementRef<HTMLCanvasElement>;

  public intro: Boolean = false;
  public introBtn: Boolean = false;

  private ctx: CanvasRenderingContext2D;
  
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
    private api: ApiService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private ngZone: NgZone
  ) {

    iconRegistry.addSvgIcon('linkedin', sanitizer.bypassSecurityTrustResourceUrl('assets/linkedin.svg'));
    iconRegistry.addSvgIcon('github', sanitizer.bypassSecurityTrustResourceUrl('assets/github.svg'));
    iconRegistry.addSvgIcon('twitter', sanitizer.bypassSecurityTrustResourceUrl('assets/twitter.svg'));
    iconRegistry.addSvgIcon('star', sanitizer.bypassSecurityTrustResourceUrl('assets/star.svg'));
    iconRegistry.addSvgIcon('halfStar', sanitizer.bypassSecurityTrustResourceUrl('assets/star-half.svg'));
    iconRegistry.addSvgIcon('emptyStar', sanitizer.bypassSecurityTrustResourceUrl('assets/star-empty.svg'));

    window.addEventListener('resize', ev => {
      
      this.canvas.nativeElement.setAttribute('height', window.innerHeight + 'px');
      this.canvas.nativeElement.setAttribute('width', window.innerWidth + 'px');
    });
  }

  openContactModal(): void {

    this.dialog.open(ContactModalComponent, {
      panelClass: [
        'contact-modal',
        'dark-bg'
      ]
    });
  }

  public draw_skill_2(): void {

    const moleculeField: MoleculeField = new MoleculeField(this.ctx, 45);

    const runtime: RunTime = new RunTime(this.ctx, [
      moleculeField
    ], this.ngZone);

    runtime.init();

    setInterval(() => {

    }, 1000);
  }

  ngOnInit() {

    this.canvas.nativeElement.setAttribute('height', window.innerHeight + 'px');
    this.canvas.nativeElement.setAttribute('width', window.innerWidth + 'px');

    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;

    this.api.isMobile.subscribe(isMobile => {
      this.isMobile = isMobile;
    });

    this.api.isMedium.subscribe(isMed => {
      this.isMedium = isMed;
    });

    this.api.isScrollingUp.subscribe(isScrollingUp => {
      this.isScrollingUp = isScrollingUp;
    });

    this.api.isScrollingDn.subscribe(isScrollingDn => {
      this.isScrollingDn = isScrollingDn;
    });

    this.draw_skill_2();

    this.intro = true;

    setTimeout(() => {
      this.introBtn = true;
    }, 1500);
  }

}

export interface Molecule {
  x: number,
  y: number,
  x_mod: number,
  y_mod: number,
  radius: number,
  bonded: boolean,
  bond_color: string
}

export interface MolecularBond {
  startIndex: number,
  endIndex: number
}

export class MoleculeField {

  private color = 'whitesmoke';
  private bondColor = 'whitesmoke';
  private bondThreshold = 85;
  public molecules: Array<Molecule> = [];
  public bonds: Array<MolecularBond> = [];

  constructor(
    private ctx: CanvasRenderingContext2D,
    private count: number
  ) {

    let modifiers = [-2, -1, -0.75, -0.5, -0.25, 0.25, 0.5, 0.75, 1, 2];

    for (var i = 0; i < this.count; i++) {
      this.molecules.push({
        x: Math.floor((Math.random() * this.ctx.canvas.width) + 1),
        y: Math.floor((Math.random() * this.ctx.canvas.height) + 1),
        x_mod: modifiers[Math.floor((Math.random() * modifiers.length - 1))],
        y_mod: modifiers[Math.floor((Math.random() * modifiers.length - 1))],
        radius: 4,
        bonded: false,
        bond_color: 'rgb(' + Math.floor((Math.random() * 255) + 80) + ',' + ((Math.random() * 255) + 80) + ',' + ((Math.random() * 255) + 80) + ')'
      });
    }
  }

  public draw() {

    this.update();

    this.ctx.strokeStyle = this.bondColor;

    for (var i = 0; i < this.bonds.length; i++) {

      this.ctx.beginPath();
      this.ctx.moveTo(this.molecules[this.bonds[i].startIndex].x, this.molecules[this.bonds[i].startIndex].y);
      this.ctx.lineTo(this.molecules[this.bonds[i].endIndex].x, this.molecules[this.bonds[i].endIndex].y);
      this.ctx.stroke();

      this.molecules[this.bonds[i].startIndex].bonded = true;
      this.molecules[this.bonds[i].endIndex].bonded = true;
    }

    for (var i = 0; i < this.molecules.length; i++) {

      if (this.molecules[i].bonded) {
        this.ctx.fillStyle = this.molecules[i].bond_color;
      } else {
        this.ctx.fillStyle = this.color;
      }

      this.ctx.beginPath();
      this.ctx.arc(this.molecules[i].x, this.molecules[i].y, this.molecules[i].radius, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }

  public update() {

    this.bonds = [];
    let coords: Array<any> = [];
    for (var i = 0; i < this.molecules.length; i++) {

      this.molecules[i].bonded = false;

      if (this.molecules[i].x > this.ctx.canvas.width) {
        this.molecules[i].x = this.ctx.canvas.width;
        this.molecules[i].x_mod *= -1;
      } else if (this.molecules[i].x < 0) {
        this.molecules[i].x = 0;
        this.molecules[i].x_mod *= -1;
      }
      if (this.molecules[i].y > this.ctx.canvas.height) {
        this.molecules[i].y = this.ctx.canvas.height;
        this.molecules[i].y_mod *= -1;
      } else if (this.molecules[i].y < 0) {
        this.molecules[i].y = 0;
        this.molecules[i].y_mod *= -1;
      }

      this.molecules[i].x += this.molecules[i].x_mod;
      this.molecules[i].y += this.molecules[i].y_mod;

      for (var j = 0; j < coords.length; j++) {

        let x_distance: number = this.molecules[i].x - coords[j].x;
        let y_distance: number = this.molecules[i].y - coords[j].y;

        if (x_distance < this.bondThreshold && x_distance > this.bondThreshold * -1) {
          if (y_distance < this.bondThreshold && y_distance > this.bondThreshold * -1) {
            this.bonds.push({
              startIndex: i,
              endIndex: j
            });
          }
        }
      }

      coords.push({
        x: this.molecules[i].x,
        y: this.molecules[i].y
      });
    }
  }
}

export class RunTime {

  private id: number;

  constructor(
    private ctx: CanvasRenderingContext2D,
    public objects: Array<any>,
    private ngZone: NgZone
  ) { }

  init() {
    this.ngZone.runOutsideAngular(() => this.draw());
    this.id = requestAnimationFrame(this.draw.bind(this));
    setInterval(() => {
      this.draw();
    }, 40);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    for (var i = 0; i < this.objects.length; i++) {
      this.objects[i].draw();
    }
  }

  stop() {
    cancelAnimationFrame(this.id);
  }
}