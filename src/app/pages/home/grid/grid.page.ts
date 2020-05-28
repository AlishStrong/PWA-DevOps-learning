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

  constructor(private modalController: ModalController) { }

  ngOnInit() {
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