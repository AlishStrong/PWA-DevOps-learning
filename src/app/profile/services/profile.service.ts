import { UserProfile } from '../../../models/interfaces/user-profile.interface';
import { Injectable } from '@angular/core';

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

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }

  getUserProfile(): UserProfile {
    return alisher;
  }
}
