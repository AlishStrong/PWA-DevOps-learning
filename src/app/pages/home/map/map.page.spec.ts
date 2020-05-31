import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { LeafletMap, LeafletTileLayer, LEAFLET_TOKEN } from 'src/app/leaflet/leaflet.service';
import { MapPage } from './map.page';


describe('MapPage', () => {
  let component: MapPage;
  let fixture: ComponentFixture<MapPage>;

  beforeEach(async(() => {
    const testMap: LeafletMap = {
      setView: () => null
    };
    const testTiles: LeafletTileLayer = {
      options: {},
      addTo: () => null
    }
    const mockLeaflet = {
      map: () => testMap,
      tileLayer: () => testTiles
    }
    TestBed.configureTestingModule({
      declarations: [MapPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: LEAFLET_TOKEN, useValue: mockLeaflet }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
