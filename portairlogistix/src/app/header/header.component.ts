import { Component, HostListener, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {

  customerLink: string = "https://customer.portairlogistix.com/";
  registerLink: string = "https://customer.portairlogistix.com/signup";
  navbarfixed: boolean;
  currentRoute: string = ''
  isMenuCollapsed = true;

  @ViewChild('navbarCustom', { read: ElementRef, static: false }) navbarCustom: ElementRef;

  @HostListener('window:scroll', ['$event']) onscroll() {
    switch (this.currentRoute) {
      case "about": {
        if (window.scrollY > 100) {
          this.navbarCustom.nativeElement.classList.remove('aboutPage');
          this.navbarCustom.nativeElement.classList.remove('ratesPage');
        }
        else {
          this.navbarCustom.nativeElement.classList.add('aboutPage');
        }
        break;
      }
      case "rates": {
        if (window.scrollY > 100) {
          this.navbarCustom.nativeElement.classList.remove('aboutPage');
          this.navbarCustom.nativeElement.classList.remove('ratesPage');
        }
        else {
          this.navbarCustom.nativeElement.classList.add('ratesPage');
        }
        break;
      }
      case "contact": {
        if (window.scrollY > 100) {
          this.navbarCustom.nativeElement.classList.remove('headerBackgroundImage');
        }
        else {
          this.navbarCustom.nativeElement.classList.add('headerBackgroundImage');
        }
      }
    }
    (window.scrollY > 100) ? this.navbarfixed = true : this.navbarfixed = false;
  }

  constructor(private router: Router) {
  }

  ngAfterViewInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.isMenuCollapsed = true;
        this.currentRoute = (event.url).replace("/", "");
        switch (this.currentRoute) {
          case "about": {
            this.isMenuCollapsed = true;
            this.navbarCustom.nativeElement.classList.add('aboutPage');
            this.navbarCustom.nativeElement.classList.remove('ratesPage');
            this.navbarCustom.nativeElement.classList.remove('headerBackgroundImage');
            break;
          }
          case "rates": {
            this.navbarCustom.nativeElement.classList.add('ratesPage');
            this.navbarCustom.nativeElement.classList.remove('aboutPage');
            this.navbarCustom.nativeElement.classList.remove('headerBackgroundImage');
            break;
          }
          case "contact": {
            this.navbarCustom.nativeElement.classList.add('headerBackgroundImage');
            break;
          }
          default: {
            this.navbarCustom.nativeElement.classList.remove('aboutPage');
            this.navbarCustom.nativeElement.classList.remove('ratesPage');
            this.navbarCustom.nativeElement.classList.remove('headerBackgroundImage');
            break;
          }
        }
      }
    });
  }

}
