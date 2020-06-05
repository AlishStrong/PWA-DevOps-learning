import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { of, Subscription } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { LEAFLET_TOKEN } from 'src/app/leaflet/leaflet.service';
import { PlacesService } from 'src/app/services/places/places.service';
import { Place } from 'src/models';

const helsinkiLatLong = [60.1699, 24.9384];
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, OnDestroy {
  map: any;
  layer: any;
  userLatLong: number[];
  mapPlaces: Place[];

  placesSubscription: Subscription;

  constructor(
    @Inject(LEAFLET_TOKEN) private leaflet: any,
    public toastController: ToastController,
    private placesService: PlacesService
  ) { }

  ngOnInit() {
    console.log('MapPage.ngOnInit()');

    // throwError('I am an error')
    //   .pipe(
    //     catchError(error => {
    //       return of(null);
    //     })
    //   )
    //   .subscribe(
    //     data => {
    //       if (data) {
    //         console.log(data);
    //       } else {
    //         console.error(data);
    //       }
    //     },
    //     error => console.error(error),
    //     () => console.warn('subscription ended!')
    //   );

    this.placesSubscription = this.placesService.getPlaces()
      .pipe(
        tap((places: Place[]) => {
          // Step 1: get places
          this.mapPlaces = places;
        }),
        catchError(error => {
          console.error('Failed to get Places from Places Service', error);
          return of(null);
        }),
        delay(1)
      )
      .subscribe(
        () => {
          if (this.mapPlaces) {
            console.log('mapPlaces', this.mapPlaces);
          }

          // Step 2: render the map
          this.map = this.leaflet.map('mapid');

          this.layer = this.leaflet.tileLayer(
            'https://cdn.digitransit.fi/map/v1/{id}/{z}/{x}/{y}@2x.png',
            {
              attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
              maxZoom: 19,
              tileSize: 512,
              zoomOffset: -1,
              id: 'hsl-map'
            });

          this.map.addLayer(this.layer);

          this.map.locate({
            setView: true
          });

          this.map.on('locationfound', (locationEvent) => {
            console.log('LocationEvent', locationEvent);
            this.map.setView(locationEvent.latlng, 13);
          });

          this.map.on('locationerror', (locationError) => {
            this.map.setView(helsinkiLatLong, 13);
          });
        }
      );
  }

  ngOnDestroy() {
    this.placesSubscription.unsubscribe();
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
      this.prepareToast('Location permission denied. Navigating to default location', 'warning')
        .then((toast: HTMLIonToastElement) => {
          toast.present();
        });
      this.userLatLong = helsinkiLatLong;
    }
  }

  private positionSuccess() {
    return (position: Position) => {
      console.log(position);
      this.userLatLong = helsinkiLatLong; // TODO remove for pushes
      // this.userLatLong = [position.coords.latitude, position.coords.longitude];
      console.log('positionSuccess().userLatLong', this.userLatLong);
    };
  }

  private positionError() {
    return (positionError: PositionError) => {
      console.error(positionError);
      if (positionError.code === 1) {
        this.prepareToast('Location permission denied. Navigating to default location', 'warning')
          .then((toast: HTMLIonToastElement) => {
            toast.present();
          });
      } else if (positionError.code === 2) {
        this.prepareToast('Unable to determine your location. Navigating to default location', 'danger')
          .then((toast: HTMLIonToastElement) => {
            toast.present();
          });
      }
      this.userLatLong = helsinkiLatLong;
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
