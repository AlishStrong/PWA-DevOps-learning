import { Component, Inject, OnInit } from '@angular/core';
import { LeafletMap, LeafletTileLayer, LEAFLET_TOKEN } from 'src/app/leaflet/leaflet.service';

const helsinkiLatLong = [60.1699, 24.9384];
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: LeafletMap;
  tiles: LeafletTileLayer;
  userLatLong: number[];

  constructor(@Inject(LEAFLET_TOKEN) private leaflet: any) { }

  ngOnInit() {
    this.obtainCurrentLocation();
  }

  private obtainCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.positionSuccess(),
        this.positionError()
      );
    } else {
      console.warn('User did not allow location obtainment');
      this.renderLeafletMap();
    }
  }

  private positionSuccess() {
    return (position: Position) => {
      console.log(position);
      this.userLatLong = [position.coords.latitude, position.coords.longitude];
      this.renderLeafletMap(this.userLatLong);
    };
  }

  private positionError() {
    return (positionError: PositionError) => {
      console.error(positionError);
      this.renderLeafletMap();
    };
  }

  private renderLeafletMap(latlong?: number[]): void {
    // Leaflet requires a timeout to render properly!
    setTimeout(() => {
      const mymap = this.leaflet.map('mapid');

      this.leaflet.tileLayer(
        'https://cdn.digitransit.fi/map/v1/{id}/{z}/{x}/{y}@2x.png',
        {
          attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
          maxZoom: 19,
          tileSize: 512,
          zoomOffset: -1,
          id: 'hsl-map'
        }).addTo(mymap);

      // If user's location was obtained, location icon will be added  
      if (latlong) {
        mymap.setView(latlong, 13);
        this.setUserLocationIcon(latlong).addTo(mymap);
      } else {
        mymap.setView(helsinkiLatLong, 13);
      }
    }, 100)
  }

  private setUserLocationIcon(latlong: number[]): any {
    const customIcon = this.leaflet.icon({
      iconUrl: '/svg/location-sharp.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 39],
      popupAnchor: [0.5, -20],
    });
    return this.leaflet.marker(latlong, { icon: customIcon }).bindPopup("<b>Du är här!</b><br>").openPopup();
  }
}
