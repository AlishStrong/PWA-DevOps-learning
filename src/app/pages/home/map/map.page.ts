import { Component, Inject, OnInit } from '@angular/core';
import { LeafletMap, LeafletTileLayer, LEAFLET_TOKEN } from 'src/app/leaflet/leaflet.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: LeafletMap;
  tiles: LeafletTileLayer;

  constructor(@Inject(LEAFLET_TOKEN) private leaflet: any) { }

  ngOnInit() {
    // Leaflet requires a timeout to render properly!
    setTimeout(() => {
      const mymap = this.leaflet.map('mapid');

      mymap.setView([60.1918347, 24.8373201], 13);

      this.leaflet.tileLayer(
        'https://cdn.digitransit.fi/map/v1/{id}/{z}/{x}/{y}@2x.png',
        {
          attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
          maxZoom: 19,
          tileSize: 512,
          zoomOffset: -1,
          id: 'hsl-map'
        }).addTo(mymap);

      const customIcon = this.leaflet.icon({
        iconUrl: '/svg/location-sharp.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 39],
        popupAnchor: [0.5, -20],
      });

      this.leaflet.marker([60.1918347, 24.8373201], { icon: customIcon }).bindPopup("<b>Du är här!</b><br>").openPopup().addTo(mymap);
    }, 10)
  }

}
