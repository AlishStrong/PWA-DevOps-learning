import { Component, Inject, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LeafletMap, LeafletTileLayer, LEAFLET_TOKEN } from 'src/app/leaflet/leaflet.service';
import { Place } from '../grid/grid.page';

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
  mapPlaces = places;

  constructor(
    @Inject(LEAFLET_TOKEN) private leaflet: any,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.obtainCurrentLocation();
  }

  mapTypeToIcon(type: string): string {
    console.log('type', type);
    switch (type) {
      case 'active':
        return 'pulse';
      case 'eatery':
        return 'restaurant';
      case 'bar':
        return 'beer';
      case 'sports':
        return 'trophy';
      case 'karaoke':
        return 'mic';
      case 'water':
        return 'boat';
      case 'games':
        return 'game-controller';
      case 'night club':
        return 'wine';
      case 'movies':
        return 'videocam';
      case 'music':
        return 'musical-notes';
      default:
        return '';
    }
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
      this.prepareToast('Location permission denied. Navigating to default location', 'warning')
        .then((toast: HTMLIonToastElement) => {
          toast.present();
        });
    }
  }

  private positionSuccess() {
    return (position: Position) => {
      console.log(position);
      this.userLatLong = [position.coords.latitude, position.coords.longitude];
      // this.renderLeafletMap(this.userLatLong);
      this.renderLeafletMap(helsinkiLatLong);
    };
  }

  private positionError() {
    return (positionError: PositionError) => {
      console.error(positionError);
      this.renderLeafletMap();
      if (positionError.code === 1) {
        this.prepareToast('Location permission denied. Navigating to default location', 'warning')
          .then((toast: HTMLIonToastElement) => {
            toast.present();
          });
      } else if (positionError.code === 2) {
        this.prepareToast('Unable to determine your location', 'danger')
          .then((toast: HTMLIonToastElement) => {
            toast.present();
          });
      }
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
      this.setPlaceLocationIcon(mymap);
    }, 100)
  }

  private setUserLocationIcon(latlong: number[]): any {
    const customIcon = this.leaflet.divIcon({
      iconSize: [40, 40],
      className: 'customDivIcon',
      iconAnchor: [20, 39],
      popupAnchor: [0.5, -20],
      html: '<ion-icon name="location-sharp" color="success"></ion-icon>'
    });
    return this.leaflet.marker(latlong, { icon: customIcon }).bindPopup("<b>Du är här!</b><br>").openPopup();
  }

  types = ['alisher', 'madina'];

  private setPlaceLocationIcon(leafletMap: any) {
    this.mapPlaces.forEach(place => {
      const divIcon = this.leaflet.divIcon({
        iconSize: [40, 40],
        className: 'customDivIcon',
        iconAnchor: [20, 39],
        popupAnchor: [0.5, -20],
        html: '<ion-icon name="location-sharp" color="danger"></ion-icon>'
      });

      // bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options)
      this.leaflet.marker(place.location, { icon: divIcon }).bindPopup(this.returnHTMLel(place)).openPopup().addTo(leafletMap);
    });
  }

  private returnHTMLel(place: Place): string {
    var toReturn = `<div style="width: 100%"><b>${place.title}</b></div><div style="margin-top: 0; margin-bottom: 0; display: inline-block;">`;
    place.type.forEach(t => {
      const iconName = this.mapTypeToIcon(t);
      toReturn += `
      <div style="display: inline-block;"><ion-icon style="zoom:2.0" name="${iconName}"></ion-icon></div>
      `;
    })
    toReturn += '</div>';
    return toReturn;
  }

  private prepareToast(message: string, color: string): Promise<HTMLIonToastElement> {
    return this.toastController.create({
      duration: 2500,
      position: 'bottom',
      color,
      message
    });
  }
}

const places: Place[] = [
  {
    title: `Alisher's`,
    img: 'alishers',
    type: ['eatery'],
    location: [60.250825, 25.015528]
  },
  {
    title: `Peppi's`,
    img: 'peppis',
    type: ['eatery'],
    location: [60.230401, 24.884753]
  },
  {
    title: `Paulina and co.`,
    img: 'paulina_and_co',
    type: ['eatery'],
    location: [60.184635, 24.943316]
  },
  {
    title: `Matisserie`,
    img: 'matisserie',
    type: ['eatery'],
    location: [60.164922, 24.928706]
  },
  {
    title: `Lebanon delights`,
    img: 'lebanon_delights',
    type: ['eatery'],
    location: [60.213540, 25.082449]
  },
  {
    title: `Viihdemaa`,
    img: 'viihdemaa',
    type: ['active', 'movies', 'games', 'sports'],
    location: [60.188624, 24.940774]
  },
  {
    title: `Movie nation`,
    img: 'movie_nation',
    type: ['movies'],
    location: [60.187353, 24.977346]
  },
  {
    title: `Sea adventures`,
    img: 'sea_adventures',
    type: ['sports', 'games', 'water'],
    location: [60.146097, 24.988103]
  },
  {
    title: `Sailor's bar`,
    img: 'sailors_bar',
    type: ['eatery', 'bar', 'karaoke'],
    location: [60.155719, 24.930845]
  },
  {
    title: `Seven friends`,
    img: 'seven_friends',
    type: ['bar', 'eatery', 'night club'],
    location: [60.168641, 24.960282]
  },
  {
    title: `Vegicious`,
    img: 'vegicious',
    type: ['eatery'],
    location: [60.173077, 24.928037]
  },
  {
    title: `Body+`,
    img: 'body_plus',
    type: ['sports'],
    location: [60.158558, 24.879491]
  },
  {
    title: `Laser polygon`,
    img: 'laser_polygon',
    type: ['sports', 'games'],
    location: [60.165681, 24.902614]
  },
  {
    title: `Music bar`,
    img: 'music_bar',
    type: ['bar', 'eatery', 'karaoke', 'music'],
    location: [60.183211, 24.919162]
  },
  {
    title: `Karaoke, chill and bar`,
    img: 'karaoke_chill_and_bar',
    type: ['bar', 'karaoke', 'night club'],
    location: [60.191223, 24.959682]
  },
  {
    title: 'Dupligo',
    img: 'dupligo',
    type: ['eatery', 'bar', 'music'],
    location: [60.196987, 24.948177]
  }
];