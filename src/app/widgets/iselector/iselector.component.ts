import { DataproviderService } from './../../service/dataprovider.service';
import { Component, OnInit, Input } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

export interface CountriesDataEl {
  Date: string;
  Country: string;
  Confirmed: number;
  Recovered: number;
  Deaths: number;
}
const ELEMENT_DATA: CountriesDataEl[] = [];

// const ELEMENT_DATA: CountriesDataEl[] = [
//   {country: 'United States', cases: 8000000, deaths: 1000, latlong: [37.0902, 5.7129]},
//   {country: 'Italy', cases: 8000000, deaths: 1000, latlong: [37.0902, 5.7129]},
//   {country: 'Spain', cases: 8000000, deaths: 1000, latlong: [37.0902, 5.7129]},
//   {country: 'China', cases: 8000000, deaths: 1000, latlong: [37.0902, 5.7129]},
//   {country: 'Iran', cases: 8000000, deaths: 1000, latlong: [37.0902, 5.7129]},
//   {country: 'United Kingdom', cases: 8000000, deaths: 1000, latlong: [37.0902, 5.7129]},
//   {country: 'Japan', cases: 8000000, deaths: 1000, latlong: [37.0902, 5.7129]},
//   {country: 'Iraq', cases: 8000000, deaths: 1000, latlong: [37.0902, 5.7129]},
//   {country: 'Russia', cases: 8000000, deaths: 1000, latlong: [37.0902, 5.7129]},
// ];

@Component({
  selector: 'app-iselector',
  templateUrl: './iselector.component.html',
  styleUrls: ['./iselector.component.scss']
})
export class IselectorComponent implements OnInit {

  // @Input() list: any;
  worldDataSubscription: any;
  worldData: any;

  constructor(private dataProvider: DataproviderService) {
    this.worldDataSubscription = dataProvider.compWorldData$.subscribe((worldData) => {
      this.worldData = worldData;
      this.initData();
    });
  }
  displayedColumns: string[] = ['Country', 'Confirmed', 'Deaths'];
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  CountriesDataEl: any;
  dataSource: any;

  ngOnInit(): void {
  }

  initData() {
      // const countryData = JSON.parse(this.csvJSON(this.worldData));
      // const worldData = this.worldData.filter((country) => {
      //   return country.Date === '2020-06-30';
      // });
      this.CountriesDataEl = this.worldData;
      this.dataSource = new MatTableDataSource(this.CountriesDataEl);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
