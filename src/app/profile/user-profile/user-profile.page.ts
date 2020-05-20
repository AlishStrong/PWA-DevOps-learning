import { UserProfile } from './../../../models/interfaces/user-profile.interface';
import { ProfileService } from './../services/profile.service';
import { UserProfile } from '../../../models/interfaces/user-profile.interface';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-userprofile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  userProfile: UserProfile;
  modalElement: HTMLIonModalElement;

  constructor(private profileService: ProfileService, private modalController: ModalController) { }

  ngOnInit() {
    this.userProfile = this.profileService.getUserProfile();
  }

  async editProfile() {
    console.log('edit profile');
    console.log('Open modal');
    this.modalElement = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        'modalController': this.modalController
      }
    })

    this.modalElement.present();
    this.modalElement.onDidDismiss().then((output) => {
      console.log(output.data);
      this.userProfile = {...output.data};
    });
  }
}

@Component({
  selector: 'modal-page',
  template: `
            <ion-header translucent>
            <ion-toolbar>
              <ion-title>Modal Content</ion-title>
              <ion-buttons slot="end">
                <ion-button (click)="dismissModal()">Close</ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content fullscreen>
            <ion-list>
              <ion-item>
                <ion-label>
                  <h2>Gollum</h2>
                  <p>Sneaky little hobbitses!</p>
                </ion-label>
              </ion-item>
              <ion-item>
                <ion-label>
                  <h2>Frodo</h2>
                  <p>Go back, Sam! I'm going to Mordor alone!</p>
                </ion-label>
              </ion-item>
              <ion-item>
                <ion-label>
                  <h2>Samwise</h2>
                  <p>What we need is a few good taters.</p>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-content>
  `
})
export class ModalPage {
  @Input() modalController: ModalController;

  constructor() {}

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    const akmal: UserProfile = {
      bio: 'Father of Alisher',
      city: 'Tashkent',
      country: 'Uzbekistan',
      dateOfBirth: new Date(1968, 5, 9),
      firstName: 'Akmal',
      lastName: 'Aliev',
      interests: [],
      userId: 1
    };
    this.modalController.dismiss(akmal);
  }
}
