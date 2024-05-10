import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  myLatlng: any;
  map: any;
  infowindow: any = new google.maps.InfoWindow;

  constructor() { }

  imitMapVars(mapElement: any) {
    this.myLatlng = { lat: 18.015592129712307, lng: -76.75156020674734 };
    this.map = new google.maps.Map(mapElement, {
      zoom: 15,
      disableDefaultUI: true,
      center: this.myLatlng,
    });
  }

  initMap(outageData: any): void {
    let labelIndex = 1;
    const icon = {
      url: `../../assets/logopng.png`,
      mapsUrl: 'https://maps.google.com?q=' + this.myLatlng.lat + ',' + this.myLatlng.lng,
      scaledSize: new google.maps.Size(200, 150),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 0)
    };
    const map = this.map;

    /* Advanced google marker pin customization that is not to be used for PROD yet
    const pinView = new google.maps.marker.PinView({
      scale: 1.5,
      background: '#1B9BE4',
      borderColor: '#ffffff',
      glyphColor: 'white'
    });*/

    outageData.forEach((obj: any) => {
      /*Advanced google marker pin customization that is not to be used for PROD yet
      var marker = new google.maps.marker.AdvancedMarkerView({
        map,
        position: {lat: obj.lat, lng: obj.lng},
        content: pinView.element,
        title: obj.address
      });*/
      var marker = new google.maps.Marker({
        position: { lat: obj.lat, lng: obj.lng },
        map,
        //label: "" + (labelIndex++),
        title: obj.address,
        animation: google.maps.Animation.DROP,
        //icon: icon
      });



      const windowSet = this.infowindow.setContent(`
        <ng-container>
          <p style='font-size:17px; font-weight:500; color: #FFFF;'> 1, 6 Daisy Ave, Kingston</p>
          <p><b style='font-weight:900;'></p>
          <a href='${icon.mapsUrl}' target='_blank'><img style='width: 170px; height=120px;' src='${icon.url}'/><a/>
        </ng-container>
      `);
      this.infowindow.open(map, marker);
      map.setZoom(16);
      map.setCenter(marker.getPosition() as google.maps.LatLng);

      marker.addListener("click", () => {
        this.infowindow.open(map, marker);
        map.setZoom(16);
        map.setCenter(marker.getPosition() as google.maps.LatLng);
      });

    })
  }

  getMarkerPosition(lat: number, lng: number, address: string, date: string) {
    const map = this.map;
    var marker = new google.maps.Marker({
      position: { lat, lng },
    });
    map.setZoom(16);
    map.setCenter(marker.getPosition() as google.maps.LatLng);
  }
}
