import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatIconRegistry } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ApiService, Skill, Experience } from '../api.service';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.scss',
    '../../assets/fonts/custom-fonts.css'
  ],
  animations: [
    trigger('expand', [

      state('small', style({
        width: '0'
      })),
      state('big', style({
        width: '100%'
      })),
      transition('* => *', [
        animate('1.1s ease')
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {

  public isMobile: boolean = this.api.isMobileWatcher;
  public isMedium: boolean = this.api.isMediumWatcher;

  public isScrollingUp: boolean = this.api.isScrollingUpWatcher;
  public isScrollingDn: boolean = this.api.isScrollingDnWatcher;

  public skills: Array<Skill> = this.api.skills;

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

  public experiences: Array<Experience> = this.api.experiences.reverse();

  public titleIndex: number = 0;
  public title: any = this.titles[this.titleIndex];
  public titleChange;

  @ViewChild('molecularBg', { static: true }) canvas: ElementRef<HTMLCanvasElement>;

  public intro: Boolean = false;
  public introBtn: Boolean = false;
  public introBtnTxt: string = '';

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

  public isEven(n) {
    return n % 2 == 0;
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
      setTimeout(() => {
        this.introBtnTxt = 'Get In Touch!'
      }, 1000);
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