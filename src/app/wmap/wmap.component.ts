import { element } from 'protractor';
import { DataproviderService } from './../service/dataprovider.service';
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-wmap',
  templateUrl: './wmap.component.html',
  styleUrls: ['./wmap.component.scss']
})
export class WmapComponent implements AfterViewInit, OnDestroy {
  private map: any;
  private mapcoordinates: any;
  coordinateSubscription: any;
  circleData: any;
  circleDataSubscription: any;
  markersArray: any;

  constructor(private dataProvider: DataproviderService) {
    this.coordinateSubscription = dataProvider.coordinates$.subscribe((coordinates) => {
      this.mapcoordinates = coordinates;
      // this.initMap();
    });
    this.circleDataSubscription = dataProvider.circleSource$.subscribe((circleData) => {
      this.circleData = circleData;
      this.addMarkers();
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      // center: [23.8859, 45.0792],
      center: this.mapcoordinates,
      zoom: 2
    });
    // const tiles = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    //   maxZoom: 20,
    // tslint:disable-next-line:max-line-length
    //   attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    // });
    const tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      minZoom: 2,
      // tslint:disable-next-line:max-line-length
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">carto</a> &copy; <a href="https://visrey.me">VISREY</a>'
    });

    tiles.addTo(this.map);
    // let center = [0, 0];
    // let i = 0;
  }

  addMarkers() {
    if (this.map === undefined) {
      return;
    }
    if (this.markersArray !== undefined) {
      this.markersArray.forEach(elemento => {
        if (elemento !== undefined) {
          this.map.removeLayer(elemento);
        }
      });
    }
    this.markersArray = [];
    // let i = 0;
    if (this.circleData !== undefined) {
      this.circleData.forEach((circleelement) => {
          const circleMarker = L.circle([circleelement.Lat, circleelement.Long_], 500000, {
            color: '#bbbbbb',
            fillColor: '#f4c363',
            fillOpacity: .2
          }).bindPopup(
            '<h1>' + circleelement.Country_Region + '</h1><h5>Confirmed: ' + circleelement.Confirmed
            + '</h5><h5>Active: ' + circleelement.Active + '</h5>'
            + '</h5><h5>Recovered: ' + circleelement.Recovered + '</h5>'
            + '</h5><h5>Deaths: ' + circleelement.Deaths + '</h5>'
            + '</h5><h5>LastUpdated: ' + circleelement.Last_Update + '</h5>');
          this.markersArray.push(circleMarker);
          circleMarker.addTo(this.map);
          // }).addTo(this.map);
          // i++;
        // }
      });
      // this.map.center = this.circleData[this.circleData.length - 1];
    }
  }


  ngOnDestroy(): void {
    this.coordinateSubscription.unsubscribe();
    this.circleDataSubscription.unsubscribe();
  }

}
