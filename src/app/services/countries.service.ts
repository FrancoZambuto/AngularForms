import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }

  getCountries() {
    return this.http.get('https://restcountries.eu/rest/v2/lang/es')
             .pipe(map( (resp:any[]) => {
               return resp.map( country => {
                 return {
                   name: country.name,
                   code: country.alpha3Code
                 }
               });
             }));
  }
}
