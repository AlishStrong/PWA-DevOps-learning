import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GridPage } from './grid.page';

describe('GridPage', () => {
  let component: GridPage;
  let fixture: ComponentFixture<GridPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GridPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
