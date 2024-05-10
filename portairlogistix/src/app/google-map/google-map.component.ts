import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { GoogleMapsService } from '../services/google-maps.service';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit, AfterViewInit, OnDestroy {
  divMapMediaStyle: boolean = false;
  responsiveObserve: any;
  constructor(private googleMaps: GoogleMapsService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.googleMaps.imitMapVars(document.getElementById("map") as HTMLElement);
    const startingPins = [
      {
        "lat": 18.015592129712307,
        "lng": -76.75156020674734,
      }
    ];
    this.googleMaps.initMap(startingPins);
  }
  ngOnDestroy(): void {
  }
}
/* this was moved to the index.html core file.
declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
*/
