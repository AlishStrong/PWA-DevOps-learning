import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PlacesService } from 'src/app/services/places/places.service';
import { Place } from 'src/models';
import { PromotionComponent } from '../promotion/promotion.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.page.html',
  styleUrls: ['./grid.page.scss'],
})
export class GridPage implements OnInit {
  modalElement: HTMLIonModalElement;
  showTypes = false;
  showSort = false;
  types: Set<string>;
  selectedTypes: string[] = [];
  placesFromPS: Observable<Place[]>;

  constructor(private modalController: ModalController, private placeService: PlacesService) { }

  ngOnInit() {
    console.warn('GridPage.onInit()');
    this.placesFromPS = this.placeService.getPlaces().pipe(
      tap(places => {
        // Make types property non-immutable after initial value assignment
        if (!this.types) {
          this.setAllTypes(places);
        }
      })
    );
  }

  isSelectedType(type: string): string {
    if (this.selectedTypes.includes(type)) {
      return 'primary';
    }
    return;
  }

  onTypePress(type: string) {
    if (this.selectedTypes.includes(type)) {
      this.selectedTypes = this.selectedTypes.filter(t => t !== type);
    } else {
      this.selectedTypes.push(type);
    }
    this.placeService.setSelectedTypesSubject(this.selectedTypes);
  }

  sortOrderChanged(event: any): void {
    this.placeService.setSortOrderSubject(event.detail.value);
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

  async placeSelected(selectedPlace: Place) {
    console.log('Selected ', selectedPlace.title);
    this.modalElement = await this.modalController.create({
      component: PromotionComponent,
      componentProps: {
        modalController: this.modalController,
        selectedPlace
      }
    })

    this.modalElement.present();
    this.modalElement.onDidDismiss().then(() => {
      console.log('Back in Home Grid');
    });
  }

  private setAllTypes(places: Place[]): void {
    this.types = new Set(places.flatMap(p => p.type));
  }
}
