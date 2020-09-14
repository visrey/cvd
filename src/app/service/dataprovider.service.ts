import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataproviderService {
  private coordinates: [];
  private circledata: any;
  public referenceData: any;
  countryRefernceData: any;
  completeWorldData: any;
  worldData: any;

  private coordinatesSource = new Subject<[]>();
  coordinates$ = this.coordinatesSource.asObservable();

  private circleSource = new Subject<any>();
  circleSource$ = this.circleSource.asObservable();

  private compWorldDataSource = new Subject<any>();
  compWorldData$ = this.compWorldDataSource.asObservable();

  publishCoordinates(newCoordinates: any) {
    this.coordinatesSource.next(newCoordinates);
  }

  publishCircleData(newCircleData: any) {
    this.circleSource.next(newCircleData);
  }

  publishCompWorldData(compWorldData: any) {
    this.compWorldDataSource.next(compWorldData);
  }

  constructor(private http: HttpClient) { }

  getDataForWorld(): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/06-29-2020.csv', {responseType: 'text'});
    // tslint:disable-next-line:max-line-length
    // return this.http.get('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/05-03-2020.csv').subscribe( (data) => {
    //   return data;
    // }, (error) => {
    //   console.log(error);
    //   return [];
    // });
  }

  getWorldTimeSereies(): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get('https://raw.githubusercontent.com/datasets/covid-19/master/data/countries-aggregated.csv', {responseType: 'text'});
  }

  getReferenceForWorld(): Observable<any> {
    return this.http.get('https://raw.githubusercontent.com/datasets/covid-19/master/data/reference.csv', {responseType: 'text'});
  }

  loadCountryRefernceData() {
    return this.http.get('assets/data/countryRefernce.json');
  }

  getWorldAggregated(): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get('https://raw.githubusercontent.com/datasets/covid-19/master/data/worldwide-aggregate.csv', {responseType: 'text'});
  }

}
