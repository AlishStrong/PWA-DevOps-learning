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
  userAge: number;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.userProfile = this.profileService.getUserProfile();
    this.userAge = this.getAge(this.userProfile.dateOfBirth);
  }

  editProfile() {
    console.log('edit profile');
  }

  private getAge(dob: Date): number {
    const today = Date.now();
    const dateDiff = today - dob.getTime();
    const age = Math.abs((new Date(dateDiff)).getFullYear() - 1970);
    return age;
  }
}
