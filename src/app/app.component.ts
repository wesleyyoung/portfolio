import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    '../assets/fonts/custom-fonts.css'
  ]
})
export class AppComponent implements OnInit{
  public previousHeight: number = window.scrollY;
  public atTop: boolean = this.previousHeight == 0;
  title = 'Welsey Youngs Portfolio';

  @HostListener('window:scroll', ['$event']) onscroll(ev) {
    this.previousHeight = window.scrollY;
    this.atTop = window.scrollY == 0;
  }

  ngOnInit() {
    
  }
}
