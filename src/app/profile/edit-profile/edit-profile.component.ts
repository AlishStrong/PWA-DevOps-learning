import { UserProfile } from './../../../models/interfaces/user-profile.interface';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  @Input() modalController: ModalController;
  @Input() currentUserProfile: UserProfile;
  profileForm: FormGroup;
  firstnameControlS: Subscription;
  lastnameControlS: Subscription;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.profileForm = this.prepareFormGroup();
    this.firstnameControlS = this.profileForm.get('firstname').valueChanges
    .subscribe( (newFirstName: string) => {
      this.currentUserProfile = { ...this.currentUserProfile, firstName: newFirstName };
    });
    this.lastnameControlS = this.profileForm.get('lastname').valueChanges
    .subscribe( (lastName: string) => {
      this.currentUserProfile = { ...this.currentUserProfile, lastName };
    });
  }

  updateProfile(passedValues) {
    this.firstnameControlS.unsubscribe();
    this.lastnameControlS.unsubscribe();
    this.modalController.dismiss(this.currentUserProfile);
  }

  cancelUpdate() {
    this.firstnameControlS.unsubscribe();
    this.lastnameControlS.unsubscribe();
    this.modalController.dismiss();
  }

  private prepareFormGroup(): FormGroup {
    return this.formBuilder.group({
      firstname: [this.currentUserProfile.firstName, Validators.required],
      lastname: [this.currentUserProfile.lastName, Validators.required]
    });
  }
}
