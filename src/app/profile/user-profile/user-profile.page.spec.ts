import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { UserProfile } from 'src/models/interfaces/user-profile.interface';
import { AgePipe } from '../pipes/age.pipe';
import { ProfileService } from '../services/profile.service';
import { UserProfilePage } from './user-profile.page';

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

describe('ProfilePage', () => {
  let component: UserProfilePage;
  let fixture: ComponentFixture<UserProfilePage>;

  const mockProfileService = {
    getUserProfile: () => alisher
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfilePage, AgePipe],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ProfileService, useValue: mockProfileService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
