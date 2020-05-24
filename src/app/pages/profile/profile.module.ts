import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { UserProfilePage } from './user-profile/user-profile.page';
import { AgePipe } from './pipes/age.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProfilePageRoutingModule
  ],
  declarations: [
    UserProfilePage,
    AgePipe,
    EditProfileComponent
  ]
})
export class ProfilePageModule { }
