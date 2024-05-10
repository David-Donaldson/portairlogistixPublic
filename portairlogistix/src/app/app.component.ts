import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { LoaderService } from './services/loader.service';
import { NavigationEnd, Router, Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'portairlogistix';
  cssClass: string = "";
  currentRoute: string = '';
  routerClassChange: string = '';

  constructor(
    private loaderService: LoaderService,
    private spinner: NgxSpinnerService,
    private router: Router) {
  }

  ngOnInit() {
    this.getRoute();
  }

  ngAfterViewInit() {
    this.loaderService.httpProgress().subscribe((status: boolean) => {
      (status) ? this.spinner.show() : this.spinner.hide();
    });
  }

  getRoute() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = (event.url).replace("/", "");
        this.routeStyleChange();
      }
    })
  }

  routeStyleChange() {
    switch (this.currentRoute) {
      case "about": {
        this.routerClassChange = 'aboutRouting'
        break;
      }
      case "rates": {
        this.routerClassChange = 'ratesRouting'
        break;
      }
      case "home": {
        this.routerClassChange = 'homeRouting'
        break;
      }
      default: {
        break;
      }
    }
  }
}
