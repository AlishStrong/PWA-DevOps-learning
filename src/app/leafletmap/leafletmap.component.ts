import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { Leaflet, LEAFLET_TOKEN } from '../leaflet/leaflet.service';
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

  constructor(
    @Inject(LEAFLET_TOKEN) private L: Leaflet
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      console.log('I 100 msec passed');
      const mymap = this.L.map('mapid');
      console.log('create Map');
      mymap.setView([60.1918347, 24.8373201], 13);
      const tiles = this.L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19
        }
      );
      setTimeout(() => {
        console.log('II 100 sec passed');
        tiles.addTo(mymap);
      }, 100);
    }, 100)
  }

}
