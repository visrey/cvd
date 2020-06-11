import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataproviderService {
  private coordinates: [];
  private circledata: any;

  private coordinatesSource = new Subject<[]>();
  coordinates$ = this.coordinatesSource.asObservable();

  private circleSource = new Subject<any>();
  circleSource$ = this.circleSource.asObservable();

  publishCoordinates(newCoordinates: any) {
    this.coordinatesSource.next(newCoordinates);
  }

  publishCircleData(newCircleData: any) {
    this.circleSource.next(newCircleData);
  }

  constructor(private http: HttpClient) { }

  getDataForWorld(): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/05-04-2020.csv', {responseType: 'text'});
    // tslint:disable-next-line:max-line-length
    // return this.http.get('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/05-03-2020.csv').subscribe( (data) => {
    //   return data;
    // }, (error) => {
    //   console.log(error);
    //   return [];
    // });
  }

}
