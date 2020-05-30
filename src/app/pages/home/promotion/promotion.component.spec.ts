import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Place } from '../grid/grid.page';
import { PromotionComponent } from './promotion.component';


const alishers: Place = {
  title: `Alisher's`,
  img: 'alishers',
  type: ['eatery']
}

describe('PromotionComponent', () => {
  let component: PromotionComponent;
  let fixture: ComponentFixture<PromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PromotionComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PromotionComponent);
    component = fixture.componentInstance;
    component.selectedPlace = alishers;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
