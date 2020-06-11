import { element } from 'protractor';
import { DataproviderService } from './../service/dataprovider.service';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import * as zeu from 'zeu';
// declare  var zeu: any;
export interface CountriesDataEl {
  country: string;
  cases: number;
  deaths: number;
  latlong: any;
}

const ELEMENT_DATA: CountriesDataEl[] = [
  { country: 'United States', cases: 8000000, deaths: 1000, latlong: [37.0902, 95.7129] },
  { country: 'Italy', cases: 8000000, deaths: 1000, latlong: [37.0902, 95.7129] },
  { country: 'Spain', cases: 8000000, deaths: 1000, latlong: [37.0902, 95.7129] },
  { country: 'China', cases: 8000000, deaths: 1000, latlong: [37.0902, 95.7129] },
  { country: 'Iran', cases: 8000000, deaths: 1000, latlong: [37.0902, 95.7129] },
  { country: 'United Kingdom', cases: 8000000, deaths: 1000, latlong: [37.0902, 95.7129] },
  { country: 'Japan', cases: 8000000, deaths: 1000, latlong: [37.0902, 95.7129] },
  { country: 'Iraq', cases: 8000000, deaths: 1000, latlong: [37.0902, 95.7129] },
  { country: 'Russia', cases: 8000000, deaths: 1000, latlong: [37.0902, 95.7129] },
];

@Component({
  selector: 'app-mono',
  templateUrl: './mono.component.html',
  styleUrls: ['./mono.component.scss']
})
export class MonoComponent implements OnInit, OnDestroy, AfterViewInit {

  completeData: any;
  coordinatessubscription: any;
  mapcoordinates: any;
  circleDataSubscription: any;
  circleData: any;
  digitalClock: any;
  infectionCircle: any;
  fatalCircle: any;
  updatedMins = 1;
  totalNoOfCases = 1023280;
  totalActiveCases = 11231;
  totalRecoveredCases = 1231231;
  totalFatalCases = 22;
  changeASymbol = '+';
  changeRSymbol = '+';
  changeFSymbol = '+';
  changeInACases = 2132;
  changeInRCases = 2312;
  changeInFCases = 1;
  updateTimeUnits = 'min';
  defaultList = [
    {
      name: 'US',
      cases: '60000',
      deaths: '1200',
      trend: [1, 5, 10, 16, 30],
      latlong: [37.0902, 95.7129]
    },
    {
      name: 'Spain',
      cases: '60000',
      deaths: '1200',
      trend: [1, 5, 10, 16, 30],
      latlong: [37.0902, 95.7129]
    },
    {
      name: 'Italy',
      cases: '60000',
      deaths: '1200',
      trend: [1, 5, 10, 16, 30],
      latlong: [37.0902, 95.7129]
    }
  ];

  clockOptions = {
    // Digital number color.
    numberColor: '#fdffff',
    // Background dash color.
    dashColor: '#45474d',
    // Hour offset.
    hourOffset: 0
  };

  infectionCircleOptions = {
    // Text value and color
    text: {
      value: '0',
      color: '#f4c363'
    },
    // Circle color and rotation speed. Circle 1 to 4 starts from outside towards center.
    circle1: {
      speed: 1,
      color: '#f4c363'
    },
    circle2: {
      speed: -1,
      color: '#f4c363'
    },
    circle3: {
      speed: 1,
      color: '#007bfb'
    },
    circle4: {
      speed: -1,
      color: '#f4c363'
    }
  };

  fatalCircleOptions = {
    // Text value and color
    text: {
      value: '0',
      color: '#bbbbbb'
    },
    // Circle color and rotation speed. Circle 1 to 4 starts from outside towards center.
    circle1: {
      speed: 1,
      color: '#bbbbbb'
    },
    circle2: {
      speed: -1,
      color: '#bbbbbb'
    },
    circle3: {
      speed: 1,
      color: '#007bfb'
    },
    circle4: {
      speed: -1,
      color: '#bbbbbb'
    }
  };


  constructor(private dataProvider: DataproviderService) {
    this.coordinatessubscription = dataProvider.coordinates$.subscribe((coordinates) => {
      this.mapcoordinates = coordinates;
    });
    this.circleDataSubscription = dataProvider.coordinates$.subscribe((circledata) => {
      this.circleData = circledata;
    });

  }

  ngOnInit(): void {
    this.dataProvider.publishCoordinates([23.8859, 45.0792]);
    // this.dataProvider.publishCircleData([[23.8859, 45.0792]]);
    /* Constructor */
    this.digitalClock = new zeu.DigitalClock('clock', this.clockOptions);
    this.infectionCircle = new zeu.SpeedCircle('infection-circle', this.infectionCircleOptions);
    this.fatalCircle = new zeu.SpeedCircle('fatal-circle', this.fatalCircleOptions);
    this.dataProvider.getDataForWorld().subscribe((data) => {
      this.completeData = JSON.parse(this.csvJSON(data));
      // tslint:disable-next-line:prefer-const
      console.log(this.completeData);
      // tslint:disable-next-line:prefer-const
      let circleData = this.completeData.filter((country) => {
        // tslint:disable-next-line:quotemark
        // tslint:disable-next-line:triple-equals
        return country.Admin2 == '';
      });
      console.log(circleData);
      this.dataProvider.publishCircleData(circleData);
    }, (error) => {
      console.log(error);
    });
  }

  ngAfterViewInit(): void {
    // this.dataProvider.publishCircleData([[37.0902, -95.7129], [23.8859, 45.0792], [20.5937, 78.9629]]);
  }

  ngOnDestroy(): void {
    this.coordinatessubscription.unsubscribe();
    this.circleDataSubscription.unsubscribe();
  }

  csvJSON(csv) {
    const lines = csv.split('\n');

    const result = [];

    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {

      // tslint:disable-next-line:prefer-const
      let obj = {};
      // tslint:disable-next-line:prefer-const
      let currentline = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);

    }
    return JSON.stringify(result); // JSON
  }

}
