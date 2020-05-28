import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Place } from '../grid/grid.page';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss'],
})
export class PromotionComponent implements OnInit {
  @Input() modalController: ModalController;
  @Input() selectedPlace: Place;

  constructor() { }

  ngOnInit() { }

  close() {
    this.modalController.dismiss();
  }
}
