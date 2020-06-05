import { Component, Inject, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LeafletMap, LeafletTileLayer, LEAFLET_TOKEN } from 'src/app/leaflet/leaflet.service';
import { PlacesService } from 'src/app/services/places/places.service';
import { Place } from 'src/models';

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
  mapPlaces: Place[];

  constructor(
    @Inject(LEAFLET_TOKEN) private leaflet: any,
    public toastController: ToastController,
    private placesService: PlacesService
  ) { }

  ngOnInit() {
    console.log('MapPage.ngOnInit()');

    this.placesService.getPlaces()
      // .pipe(
      //   tap((places: Place[]) => {
      //     // Step 1: get places from PlacesService;
      //     this.mapPlaces = places;
      //     // Step 2: obtain location;
      //     // this.obtainCurrentLocation();
      //     //For DEV only! Hardcoded location
      //     this.userLatLong = helsinkiLatLong;
      //   }),
      // )
      .subscribe(

        () => {
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

          mymap.setView(helsinkiLatLong, 13);
        }
      );

    // Step 4: set LeafletMap view to location;
    // Step 5: set icons for places on LeafletMap;
  }

  renderLeafletMap() {
    console.log('inside renderLeafletMap()')
    return () => {

    };
  }

  mapTypeToIcon(type: string): string {
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
      // this.renderLeafletMap();
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
      // this.renderLeafletMap(helsinkiLatLong);
    };
  }

  private positionError() {
    return (positionError: PositionError) => {
      console.error(positionError);
      // this.renderLeafletMap();
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

  // private renderLeafletMap(latlong?: number[]): void {
  //   // Leaflet requires a timeout to render properly!
  //   setTimeout(() => {
  //     const mymap = this.leaflet.map('mapid');

  //     this.leaflet.tileLayer(
  //       'https://cdn.digitransit.fi/map/v1/{id}/{z}/{x}/{y}@2x.png',
  //       {
  //         attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
  //         maxZoom: 19,
  //         tileSize: 512,
  //         zoomOffset: -1,
  //         id: 'hsl-map'
  //       }).addTo(mymap);

  //     // If user's location was obtained, location icon will be added  
  //     if (latlong) {
  //       mymap.setView(latlong, 13);
  //       this.setUserLocationIcon(latlong).addTo(mymap);
  //     } else {
  //       mymap.setView(helsinkiLatLong, 13);
  //     }
  //     this.setPlaceLocationIcon(mymap);
  //   }, 100)
  // }

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
