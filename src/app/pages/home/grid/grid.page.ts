import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PromotionComponent } from '../promotion/promotion.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.page.html',
  styleUrls: ['./grid.page.scss'],
})
export class GridPage implements OnInit {
  places: Place[] = [
    {
      title: `Alisher's`,
      img: 'alishers',
      type: ['eatery']
    },
    {
      title: `Peppi's`,
      img: 'peppis',
      type: ['eatery']
    },
    {
      title: `Paulina and co.`,
      img: 'paulina_and_co',
      type: ['eatery']
    },
    {
      title: `Matisserie`,
      img: 'matisserie',
      type: ['eatery']
    },
    {
      title: `Lebanon delights`,
      img: 'lebanon_delights',
      type: ['eatery']
    },
    {
      title: `Viihdemaa`,
      img: 'viihdemaa',
      type: ['active', 'movies', 'games', 'sports']
    },
    {
      title: `Movie nation`,
      img: 'movie_nation',
      type: ['movies']
    },
    {
      title: `Sea adventures`,
      img: 'sea_adventures',
      type: ['sports', 'games', 'water']
    },
    {
      title: `Sailor's bar`,
      img: 'sailors_bar',
      type: ['eatery', 'bar', 'karaoke']
    },
    {
      title: `Seven friends`,
      img: 'seven_friends',
      type: ['bar', 'eatery', 'night club']
    },
    {
      title: `Vegicious`,
      img: 'vegicious',
      type: ['eatery']
    },
    {
      title: `Body+`,
      img: 'body_plus',
      type: ['sports']
    },
    {
      title: `Laser polygon`,
      img: 'laser_polygon',
      type: ['sports', 'games']
    },
    {
      title: `Music bar`,
      img: 'music_bar',
      type: ['bar', 'eatery', 'karaoke', 'music']
    },
    {
      title: `Karaoke, chill and bar`,
      img: 'karaoke_chill_and_bar',
      type: ['bar', 'karaoke', 'night club']
    },
    {
      title: 'Dupligo',
      img: 'dupligo',
      type: ['eatery', 'bar', 'music']
    }
  ];

  modalElement: HTMLIonModalElement;
  showTypes = false;
  showSort = false;
  sortOrder = 'ASC';
  types: Set<string>;
  selectedTypes: string[] = [];
  showedPlaces: Place[] = [];

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.types = this.getAllTypes(this.places);
    this.filterPlaces();
  }

  getAllTypes(places: Place[]): Set<string> {
    return new Set(places.flatMap(p => p.type));
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
    this.filterPlaces();
  }

  sortOrderChanged(event: any): void {
    this.sortOrder = event.detail.value;
    this.sortPlaces();
  }

  private filterPlaces(): void {
    if (this.selectedTypes.length > 0) {
      this.showedPlaces = this.places.filter(place => {
        let toShow = false;
        place.type.forEach(type => {
          if (this.selectedTypes.includes(type)) {
            toShow = true;
          }
        });
        return toShow;
      });
    } else {
      this.showedPlaces = this.places;
    }
    this.sortPlaces();
  }

  private sortPlaces(): void {
    if (this.sortOrder === 'ASC') {
      // sort in ascending order (A to Z)
      this.showedPlaces = this.showedPlaces.sort((p1: Place, p2: Place) => {
        if (p1.title > p2.title) {
          return 1;
        } else if (p1.title === p2.title) {
          return 0;
        } else {
          return -1;;
        }
      });
    } else {
      // sort in descending order (Z to A)
      this.showedPlaces = this.showedPlaces.sort((p1: Place, p2: Place) => {
        if (p1.title > p2.title) {
          return -1;
        } else if (p1.title === p2.title) {
          return 0;
        } else {
          return 1;;
        }
      });
    }
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
}

export interface Place {
  title: string,
  img: string,
  type?: string[]
}