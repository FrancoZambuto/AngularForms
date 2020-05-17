import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  user = {
    name : '',
    lastName: '',
    email: '' ,
    country: ''
  }

  countries: any[] = [];

  constructor(private countryService: CountriesService) { }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(countries => {
      this.countries =  countries;
      this.countries.unshift({
        name: 'Select a country',
        code: ''
      });
    })
  }


  Save(form: NgForm) {

    if(form.invalid){

      Object.values(form.controls).forEach(control => {
      control.markAllAsTouched();
      })

      return;
    }
    console.log(form.value);
  }

}
