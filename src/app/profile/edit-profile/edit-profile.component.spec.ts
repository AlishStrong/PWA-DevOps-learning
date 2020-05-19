import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserProfile } from 'src/models/interfaces/user-profile.interface';
import { EditProfileComponent } from './edit-profile.component';

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

describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditProfileComponent],
      providers: [FormBuilder],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    component.currentUserProfile = alisher;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
