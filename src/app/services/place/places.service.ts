import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Place } from 'src/models';


@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private url = 'assets/json/places.json';
  places: Place[];

  constructor(private http: HttpClient) { }

  getAllPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(this.url);
  }
}
