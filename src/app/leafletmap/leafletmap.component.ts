import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-leafletmap',
  template: `
<div>
<p class="alisheraliev">
leafletmap works!
</p>
<div id="mapid"
style="height: 50vh; width: 50vw; border: 5px solid red;"></div>
</div>
  `,
  styleUrls: ['./leafletmap.component.css']
})
export class LeafletmapComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      console.log('20 msec passes');
      var mymap = L.map('mapid').setView([60.1918347, 24.8373201], 13);

      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });

      console.log(tiles);
      setTimeout(() => {
        console.log('2 sec passes');
        tiles.addTo(mymap);
      }, 100);
    }, 100)
  }

}
