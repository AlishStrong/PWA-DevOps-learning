import { EditProfileComponent} from './../edit-profile/edit-profile.component';
import { UserProfile } from './../../../models/interfaces/user-profile.interface';
import { ProfileService } from './../services/profile.service';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';

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
    console.log('Open edit profile modal');
    this.modalElement = await this.modalController.create({
      component: EditProfileComponent,
      componentProps: {
        modalController: this.modalController,
        currentUserProfile: this.userProfile
      }
    })

    this.modalElement.present();
    this.modalElement.onDidDismiss().then(output => {
      if (output.data) {
        this.userProfile = {...output.data};
        console.log('Profile updated');
      } else {
        console.log('Edit profile was cancelled');
      }
    });
  }
}
