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
  map: any; // should be Leaflet.Map
  tileLayer: any; // should be Leaflet.Layer
  places: Place[];
  placeMarkerMap = new Map<string, any>(); // should be Map<string, Leaflet.Marker>

  placesSubscription: Subscription;

  constructor(
    @Inject(LEAFLET_TOKEN) private leaflet: any,
    public toastController: ToastController,
    private placesService: PlacesService
  ) { }

  ngOnInit() {
    this.placesSubscription = this.placesService.getPlaces()
      .pipe(
        tap((places: Place[]) => {
          // Step 1: get places
          this.places = places;
        }),
        catchError(error => {
          console.error('Failed to get Places from Places Service', error);
          return of(null);
        }),
        delay(1)
      )
      .subscribe(
        () => {
          // Step 2: render the map if it was not rendered yet!
          if (!this.map) {
            console.log('MapPage.onInit().subscription - rendering Map');
            this.renderMap();
          } else {
            console.log('MapPage.onInit().subscription - Map already EXIST');
          }
          // Step 3: add/remove Markers of places
          if (this.places) {
            this.updatepPlaceMarkers();
          }
        }
      );
  }

  ngOnDestroy() {
    this.placesSubscription.unsubscribe();
  }

  private renderMap(): void {
    // Step 2.1: bind Map to html element of id 'mapid
    this.map = this.leaflet.map('mapid');

    // Step 2.2: define Layer for the map
    this.tileLayer = this.leaflet.tileLayer(
      'https://cdn.digitransit.fi/map/v1/{id}/{z}/{x}/{y}@2x.png',
      {
        attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
        maxZoom: 19,
        tileSize: 512,
        zoomOffset: -1,
        id: 'hsl-map'
      });

    // Step 2.3: add the Layer to the Map  
    this.map.addLayer(this.tileLayer);

    // Step 2.4: locate user's position
    this.map.locate({
      setView: true
    });

    // Step 2.4.1: add location icon on locationfound-event
    this.map.on('locationfound', (locationEvent) => {
      this.setUserLocationIcon(locationEvent.latlng);
      this.map.setView(locationEvent.latlng, 13);
    });
    // Step 2.4.2: set view to Helsinki on locationerror-event
    this.map.on('locationerror', (locationError) => {
      console.log(locationError);
      this.map.setView(helsinkiLatLong, 13);
      let errorPromise: Promise<HTMLIonToastElement>;
      switch (locationError.code) {
        // Geolocation not supported
        case 0:
          errorPromise = this.prepareToast(
            'Your device does not support geolocation! Navigating to default location.',
            'warning');
          break;

        // User denied position obtainment
        case 1:
          errorPromise = this.prepareToast(
            'Location permission denied! Navigating to default location.',
            'warning');
          break;

        // Position unavailable  
        case 2:
          errorPromise = this.prepareToast(
            'Unable to determine your location! Navigating to default location.',
            'danger');
          break;

        // Timeout 
        case 3:
          errorPromise = this.prepareToast(
            'Location determination vailed after the maximum timeout! Navigating to default location.',
            'danger');
          break;

        default:
          errorPromise = this.prepareToast(locationError.message, 'danger');
          break;
      }
      errorPromise.then((toast: HTMLIonToastElement) => {
        console.error('location error');
        toast.present();
      });
    });
  }

  private setUserLocationIcon(latlong: number[]) {
    const customIcon = this.leaflet.divIcon({
      iconSize: [40, 40],
      className: 'customDivIcon',
      iconAnchor: [20, 39],
      popupAnchor: [0.5, -20],
      html: '<ion-icon name="location-sharp" color="success"></ion-icon>'
    });
    this.leaflet.marker(latlong, { icon: customIcon }).bindPopup("<b>Du är här!</b><br>").openPopup().addTo(this.map);
  }

  private updatepPlaceMarkers() {
    const titlesRemove = new Set<string>(this.placeMarkerMap.keys());

    this.places.forEach(place => {
      if (titlesRemove.has(place.title)) {
        titlesRemove.delete(place.title);
      } else {
        this.placeMarkerMap.set(place.title, this.setPlaceMarker(place));
      }
    });

    for (let toRemove of titlesRemove) {
      this.removePlaceMarker(toRemove);
    }
  }

  private setPlaceMarker(place: Place): any {
    const divIcon = this.leaflet.divIcon({
      iconSize: [40, 40],
      className: 'customDivIcon',
      iconAnchor: [20, 39],
      popupAnchor: [0.5, -20],
      html: '<ion-icon name="location-sharp" color="danger"></ion-icon>'
    });
    return this.leaflet.marker(place.location, { icon: divIcon }).bindPopup(this.returnHTMLel(place)).openPopup().addTo(this.map);
  }

  private removePlaceMarker(placeTitle: string): void {
    this.placeMarkerMap.get(placeTitle).remove();
    this.placeMarkerMap.delete(placeTitle);
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

  private mapTypeToIcon(type: string): string {
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

  private prepareToast(message: string, color: string): Promise<HTMLIonToastElement> {
    return this.toastController.create({
      duration: 3000,
      position: 'bottom',
      color,
      message,
      buttons: [
        {
          side: 'end',
          role: 'cancel',
          icon: 'close-circle-outline'
        }
      ]
    });
  }
}
