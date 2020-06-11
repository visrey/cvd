import { Component, OnInit, Input } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

export interface CountriesDataEl {
  country: string;
  cases: number;
  deaths: number;
  latlong: any;
}

const ELEMENT_DATA: CountriesDataEl[] = [
  {country: 'United States', cases: 8000000, deaths: 1000, latlong: [37.0902, 5.7129]},
  {country: 'Italy', cases: 8000000, deaths: 1000, latlong: [37.0902, 5.7129]},
  {country: 'Spain', cases: 8000000, deaths: 1000, latlong: [37.0902, 5.7129]},
  {country: 'China', cases: 8000000, deaths: 1000, latlong: [37.0902, 5.7129]},
  {country: 'Iran', cases: 8000000, deaths: 1000, latlong: [37.0902, 5.7129]},
  {country: 'United Kingdom', cases: 8000000, deaths: 1000, latlong: [37.0902, 5.7129]},
  {country: 'Japan', cases: 8000000, deaths: 1000, latlong: [37.0902, 5.7129]},
  {country: 'Iraq', cases: 8000000, deaths: 1000, latlong: [37.0902, 5.7129]},
  {country: 'Russia', cases: 8000000, deaths: 1000, latlong: [37.0902, 5.7129]},
];

@Component({
  selector: 'app-iselector',
  templateUrl: './iselector.component.html',
  styleUrls: ['./iselector.component.scss']
})
export class IselectorComponent implements OnInit {

  // @Input() list: any;

  constructor() { }
  displayedColumns: string[] = ['country', 'cases', 'deaths'];
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
