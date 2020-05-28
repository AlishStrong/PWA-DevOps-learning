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
      img: 'alishers'
    },
    { title: `Peppi's`, img: 'peppis' },
    { title: `Paulina and co.`, img: 'paulina_and_co' },
    { title: `Matisserie`, img: 'matisserie' },
    { title: `Lebanon delights`, img: 'lebanon_delights' },
    { title: `Viihdemaa`, img: 'viihdemaa' },
    { title: `Movie nation`, img: 'movie_nation' },
    { title: `Sea adventures`, img: 'sea_adventures' },
    { title: `Sailor's bar`, img: 'sailors_bar' },
    { title: `Seven friends`, img: 'seven_friends' },
    { title: `Vegicious`, img: 'vegicious' },
    { title: `Body+`, img: 'body_plus' },
    { title: `Laser polygon`, img: 'laser_polygon' },
    { title: `Music bar`, img: 'music_bar' },
    { title: `Karaoke, chill and bar`, img: 'karaoke_chill_and_bar' },
    { title: 'Dupligo', img: 'dupligo' }
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
  img: string
}