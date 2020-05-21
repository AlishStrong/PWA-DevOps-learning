import { EditProfileComponent } from './../edit-profile/edit-profile.component';
import { UserProfile } from './../../../models/interfaces/user-profile.interface';
import { ProfileService } from './../services/profile.service';
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
      component: EditProfileComponent,
      componentProps: {
        modalController: this.modalController
      }
    })

    this.modalElement.present();
    this.modalElement.onDidDismiss().then((output) => {
      console.log(output.data);
      this.userProfile = {...output.data};
    });
  }
}
