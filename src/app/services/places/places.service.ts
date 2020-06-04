import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Place } from 'src/models';


@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private url = 'assets/json/places.json';

  private sortOrderSubject: Subject<number> = new BehaviorSubject(1);
  private placesObs: Observable<Place[]>;
  private selectedTypesSubject: Subject<string[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {
    // console.log('PlacesService.constructor()');
    this.getAllPlaces();
  }

  getPlaces(): Observable<Place[]> {
    return combineLatest(this.sortOrderSubject, this.placesObs, this.selectedTypesSubject)
      .pipe(
        map((orderPlacesTypes: [number, Place[], string[]]) => {
          const sortOrder = orderPlacesTypes[0];
          const places = orderPlacesTypes[1];
          const filterTypes = orderPlacesTypes[2];

          const filteredPlaces = this.filterPlaces(filterTypes, places);
          const sortedPlaces = this.sortPlaces(sortOrder, filteredPlaces);

          // console.log('PlacesService.getPlaces().sortOrder', sortOrder);
          // console.log('PlacesService.getPlaces().filterTypes', filterTypes);
          // console.warn('PlacesService.getPlaces().filteredPlaces', filteredPlaces);
          // console.warn('PlacesService.getPlaces().sortedPlaces', sortedPlaces);
          return sortedPlaces;
        })
      );
  }

  getSortOrderSubject(): Subject<number> {
    return this.sortOrderSubject;
  }

  setSortOrderSubject(sortOrder: number): void {
    this.sortOrderSubject.next(sortOrder);
  }

  getSelectedTypesSubject(): Subject<string[]> {
    return this.selectedTypesSubject;
  }

  setSelectedTypesSubject(types: string[]): void {
    this.selectedTypesSubject.next(types);
  }

  private getAllPlaces(): Observable<Place[]> {
    // console.log('PlacesService.getAllPlaces()');
    return this.placesObs = this.http.get<Place[]>(this.url);
  }

  private filterPlaces(filterTypes: string[], places: Place[]): Place[] {
    if (filterTypes.length > 0) {
      return places.filter(place => {
        let toKeep = false;
        place.type.forEach(type => {
          if (filterTypes.includes(type)) {
            toKeep = true;
          }
        });
        return toKeep;
      });
    } else {
      return places;
    }
  }

  private sortPlaces(sortOrder: number, places: Place[]): Place[] {
    return places.sort((p1: Place, p2: Place) => {
      if (p1.title > p2.title) {
        return sortOrder;
      } else if (p1.title === p2.title) {
        return 0;
      } else {
        return -sortOrder;
      }
    });
  }
}
