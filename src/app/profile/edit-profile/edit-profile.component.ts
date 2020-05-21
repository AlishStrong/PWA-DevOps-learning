import { UserProfile } from './../../../models/interfaces/user-profile.interface';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  @Input() modalController: ModalController;

  constructor() { }

  ngOnInit() {}

  dismissModal() {
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
