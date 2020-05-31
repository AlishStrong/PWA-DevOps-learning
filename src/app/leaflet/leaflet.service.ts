import { InjectionToken } from '@angular/core';

export let LEAFLET_TOKEN = new InjectionToken<Leaflet>('leaflet');

/* Warning: Leaflet implementation is not 100% complete! */
export interface Leaflet {
  map(divId: string, options?: LeafletMapOptions | { [key: string]: any }): LeafletMap;
  tileLayer(url: string, options: LeafletTileLayerOptions): LeafletTileLayer;
}

export interface LeafletMap {
  setView(center: number[], zoom: number, animationOptions?: any): this;
}

export interface LeafletMapOptions {
  center?: number[],
  zoom?: number,
  minZoom?: number,
  maxZoom?: number
}

export interface LeafletTileLayer extends LeafletGridLayer {
  options: LeafletTileLayerOptions;
}

export interface LeafletTileLayerOptions extends LeafletGridLayerOptions {

}

export interface LeafletGridLayer extends LeafletLayer {
  options: LeafletGridLayerOptions;
}

export interface LeafletGridLayerOptions extends LeafletLayerOptions {
  tilesize?: number,
  maxZoom?: number
}

export interface LeafletLayer {
  options: LeafletLayerOptions;
  addTo(map: LeafletMap): this;
}

export interface LeafletLayerOptions {
  attribution?: string;
}