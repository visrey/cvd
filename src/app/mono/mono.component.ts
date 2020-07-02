import { element } from 'protractor';
import { DataproviderService } from './../service/dataprovider.service';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import * as zeu from 'zeu';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  innerWidth: any;
  countryData: any;
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


  // tslint:disable-next-line:variable-name
  constructor(private dataProvider: DataproviderService, private _snackBar: MatSnackBar) {
    this.coordinatessubscription = dataProvider.coordinates$.subscribe((coordinates) => {
      this.mapcoordinates = coordinates;
    });
    this.circleDataSubscription = dataProvider.coordinates$.subscribe((circledata) => {
      this.circleData = circledata;
    });

  }

  ngOnInit(): void {
    this.updatedMins = 1;
    this.updateTimeUnits = 'Day';
    this.dataProvider.publishCoordinates([23.8859, 45.0792]);
    // this.dataProvider.publishCircleData([[23.8859, 45.0792]]);
    /* Constructor */
    this.digitalClock = new zeu.DigitalClock('clock', this.clockOptions);

    if (this.dataProvider.worldData) {
      const worldData = JSON.parse(this.csvJSON(this.dataProvider.worldData));
      // // tslint:disable-next-line:prefer-const
      // let worldCurrentData = worldData.filter((country) => {
      //   return country.Date === '2020-06-30';
      // });
      // tslint:disable-next-line:prefer-const
      let worldCurrentData = worldData[worldData.length - 2 ];
      this.totalNoOfCases = worldCurrentData.Confirmed;
      this.totalRecoveredCases = worldCurrentData.Recovered;
      this.totalFatalCases  = worldCurrentData.Deaths;
      this.totalActiveCases = this.totalNoOfCases - this.totalRecoveredCases - this.totalFatalCases;
      this.infectionCircleOptions.text.value = parseFloat(worldCurrentData['Increase rate']).toFixed(2);
      this.infectionCircle = new zeu.SpeedCircle('infection-circle', this.infectionCircleOptions);
      const fatalRate = (this.totalFatalCases / this.totalNoOfCases) * 100;
      this.fatalCircleOptions.text.value = fatalRate.toFixed(2);
      this.fatalCircle = new zeu.SpeedCircle('fatal-circle', this.fatalCircleOptions);
      // // tslint:disable-next-line:prefer-const
      // let worldPrevData = worldData.filter((country) => {
      //   return country.Date === '2020-06-29';
      // });
      // tslint:disable-next-line:prefer-const
      let worldPrevData = worldData[worldData.length - 3];
      this.changeInFCases = this.totalFatalCases - worldPrevData.Deaths;
      this.changeInRCases = this.totalRecoveredCases - worldPrevData.Recovered;
      this.changeFSymbol = '+';
      this.changeRSymbol = '+';
    } else {
      this.dataProvider.getWorldAggregated().subscribe((wdata) => {
        const worldData = JSON.parse(this.csvJSON(wdata));
        // tslint:disable-next-line:prefer-const
        // let worldCurrentData = worldData.filter((country) => {
        //   return country.Date === '2020-06-30';
        // });
        // tslint:disable-next-line:prefer-const
        let worldCurrentData = worldData[worldData.length - 2 ];
        this.totalNoOfCases = worldCurrentData.Confirmed;
        this.totalRecoveredCases = worldCurrentData.Recovered;
        this.totalFatalCases = worldCurrentData.Deaths;
        this.totalActiveCases = this.totalNoOfCases - this.totalRecoveredCases - this.totalFatalCases;
        this.infectionCircleOptions.text.value = parseFloat(worldCurrentData['Increase rate']).toFixed(2);
        this.infectionCircle = new zeu.SpeedCircle('infection-circle', this.infectionCircleOptions);
        const fatalRate = (this.totalFatalCases / this.totalNoOfCases) * 100;
        this.fatalCircleOptions.text.value = fatalRate.toFixed(2);
        this.fatalCircle = new zeu.SpeedCircle('fatal-circle', this.fatalCircleOptions);
        // tslint:disable-next-line:prefer-const
        let worldPrevData = worldData[worldData.length - 3];
        // let worldPrevData = worldData.filter((country) => {
        //   return country.Date === '2020-06-29';
        // });
        this.changeInFCases = this.totalFatalCases - worldPrevData.Deaths;
        this.changeInRCases = this.totalRecoveredCases - worldPrevData.Recovered;
        this.changeFSymbol = '+';
        this.changeRSymbol = '+';
      });
    }

    if (this.dataProvider.completeWorldData) {
      this.countryData = JSON.parse(this.csvJSON(this.dataProvider.completeWorldData));

      const dateDataPick = this.countryData[this.countryData.length - 2];
      const circleData = this.countryData.filter((country) => {
        return country.Date === dateDataPick.Date;
      });
      if (this.dataProvider.referenceData) {
        this.dataProvider.publishCircleData(circleData);
        this.dataProvider.publishCompWorldData(circleData);
      } else {
        this.dataProvider.loadCountryRefernceData().subscribe((refdata) => {
          this.dataProvider.referenceData = refdata;
          this.dataProvider.publishCircleData(circleData);
          this.dataProvider.publishCompWorldData(circleData);
        });
      }
    } else {
      this.dataProvider.getWorldTimeSereies().subscribe((data) => {
        this.countryData = JSON.parse(this.csvJSON(data));
        const dateDataPick = this.countryData[this.countryData.length - 2];
        // tslint:disable-next-line:prefer-const
        let circleData = this.countryData.filter((country) => {
          return country.Date === dateDataPick.Date;
        });
        if (this.dataProvider.referenceData) {
          this.dataProvider.publishCircleData(circleData);
          this.dataProvider.publishCompWorldData(circleData);
        } else {
          this.dataProvider.loadCountryRefernceData().subscribe((refdata) => {
            this.dataProvider.referenceData = refdata;
            this.dataProvider.publishCircleData(circleData);
            this.dataProvider.publishCompWorldData(circleData);
          });
        }
      }, (error) => {
        console.log(error);
      });
    }
  }

  ngAfterViewInit(): void {
    // tslint:disable-next-line:max-line-length
    this._snackBar.open('This website use cookies for anlytics without any obstrucation to the user privacy and by using our website you are agreeing for the same.', 'Agreed', {
      duration: 2000,
    });
    // this.dataProvider.publishCircleData([[37.0902, -95.7129], [23.8859, 45.0792], [20.5937, 78.9629]]);
  }

  ngOnDestroy(): void {
    this.coordinatessubscription.unsubscribe();
    this.circleDataSubscription.unsubscribe();
  }

  csvJSON(csv) {
    const lines = csv.split('\n');
    lines[0] = lines[0].trim();

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
