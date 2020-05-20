import { ProfileService } from './../services/profile.service';
import { UserProfile } from '../../../models/interfaces/user-profile.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userprofile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  userProfile: UserProfile;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.userProfile = this.profileService.getUserProfile();
  }

  editProfile() {
    console.log('edit profile');
  }
}
