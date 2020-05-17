import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, IonCardTitle } from '@ionic/angular';

import { HomePage } from './home.page';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be MASTER title', () => {
    expect(
      debugElement.query(By.directive(IonCardTitle)).nativeElement.textContent
      ).toContain('MASTER TO FAIL')
  });
});
