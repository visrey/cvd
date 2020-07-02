import { element } from 'protractor';
import { DataproviderService } from './../service/dataprovider.service';
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import '@ansur/leaflet-pulse-icon/dist/L.icon.pulse.js';

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
      attributionControl: false,
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
    L.control.attribution({
      position: 'topright'
    }).addTo(this.map);
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
    //   console.log(this.dataProvider.referenceData);
      this.circleData.forEach((circleelement) => {
        // tslint:disable-next-line:prefer-const
        let countryData = this.dataProvider.referenceData.filter((country) => {
            return country.Country_Region === circleelement.Country.replace(/"/g, '');
        });

        const latlng = L.latLng(countryData[0].Lat, countryData[0].Long_);
        const pulsingIcon = L.icon.pulse({iconSize: [8, 8], color: 'red'});
        const circleMarker = L.marker([countryData[0].Lat, countryData[0].Long_], {icon: pulsingIcon});

        //   const circleMarker = L.circle([circleelement.Lat, circleelement.Long_], {
        //     color: '#f4c363',
        //     fillColor: '#f4c363',
        //     // fillOpacity: 0.2,
        //     className: 'blinking',
        //     radius: 5000
        //   });
        //   const latlng = L.latLng(circleelement.Lat, circleelement.Long_);
        circleMarker.on('click', () => {
              this.map.flyTo(latlng, 5);
        });
        const currentActive = circleelement.Confirmed - circleelement.Recovered - circleelement.Deaths;
        circleMarker.bindPopup(
              '<table><th class="popupHeading" colspan="2">' + countryData[0].Combined_Key.replace(/"/g, '')
              + '</th><tr><td class="popupLabel">Confirmed:</td><td class="popupValue darkblue">' + circleelement.Confirmed
              + '</td></tr><tr><td class="popupLabel">Active:</td><td  class="popupValue darkblue">' + currentActive
              + '</td></tr><tr><td class="popupLabel">Recovered:</td><td  class="popupValue green">' + circleelement.Recovered
              + '</td></tr><tr><td class="popupLabel">Deaths:</td><td  class="popupValue red">' + circleelement.Deaths
            //   + '</td></tr><tr><td class="popupLabel">Last Updated:</td><td  class="popupValue">' + circleelement.Last_Update
              + '</td></tr></table>');
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
