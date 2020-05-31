import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import * as leaflet from 'leaflet';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LEAFLET_TOKEN } from './leaflet/leaflet.service';
import { LeafletmapComponent } from './leafletmap/leafletmap.component';

// const leaflet: Leaflet =
@NgModule({
  declarations: [AppComponent, LeafletmapComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule],
  providers: [
    {
      provide: LEAFLET_TOKEN,
      useValue: leaflet
    },
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
