import { Component, Inject, OnInit } from '@angular/core';
import { Leaflet, LeafletMap, LeafletTileLayer, LEAFLET_TOKEN } from 'src/app/leaflet/leaflet.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: LeafletMap;
  tiles: LeafletTileLayer;

  constructor(@Inject(LEAFLET_TOKEN) private leaflet: Leaflet) { }

  ngOnInit() {
    // Leaflet requires a timeout to render properly!
    setTimeout(() => {
      console.log('I 100 msec passed');
      const mymap = this.leaflet.map('mapid');
      console.log('create Map');
      mymap.setView([60.1918347, 24.8373201], 13);
      const tiles = this.leaflet.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19
        }
      );
      tiles.addTo(mymap);
    }, 10)
  }

}
