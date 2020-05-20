import { UserProfile } from '../../../models/interfaces/user-profile.interface';
import { Component, OnInit } from '@angular/core';

const alisher: UserProfile = {
  bio: `
  Friendly, outgoing and cheerful!
  Best thing ever existed after the sliced bread
  `,
  city: 'Espoo',
  country: 'Finland',
  dateOfBirth: new Date(1995, 2, 23),
  firstName: 'Alisher',
  lastName: 'Aliev',
  interests: ['Gym', 'Food', 'Parties'],
  userId: 1
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userProfile: UserProfile;
  userAge: number;

  constructor() { }

  ngOnInit() {
    this.userProfile = alisher;
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
