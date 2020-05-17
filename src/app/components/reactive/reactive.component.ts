import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

 form: FormGroup;



  constructor( private formBuilder: FormBuilder, private validate: ValidateService) { 

  this.createFornm();
  this.createListeners();

  }

  ngOnInit(): void {
  }

  get hobbies() {
    return this.form.get('hobby') as FormArray;
  }

  get validName() {
    return this.form.get('name').invalid && this.form.get('name').touched;
  }


  get validLastName() {
    return this.form.get('lastName').invalid && this.form.get('lastName').touched;
  }

  get validEmail() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  get validUserName() {
    return this.form.get('userName').invalid && this.form.get('userName').touched;
  }

  get validPassword1() {
    return this.form.get('password1').invalid && this.form.get('password1').touched;
  }

  get validPassword2() {
    const pass1 = this.form.get('password1').value;
    const pass2 = this.form.get('password2').value;

    return ( pass1 === pass2) ? false: true;
  }

  get validDistric() {
    return this.form.get('address.distric').invalid && this.form.get('address.distric').touched;
  }

  get validCity() {
    return this.form.get('address.city').invalid && this.form.get('address.city').touched;
  }



  createFornm(){
   
   this.form = this.formBuilder.group({
     name: ['', [Validators.required, Validators.minLength(5)]],
     lastName: ['', [Validators.required, Validators.minLength(2)]],
     email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
     userName: ['', , this.validate.userExists],
     password1: ['', [Validators.required]],
     password2: ['', [Validators.required]],
     address: this.formBuilder.group({
       distric: ['', Validators.required],
       city: ['', Validators.required]
     }),
     hobby: this.formBuilder.array([])
   }, {
     validators: this.validate.samePasswords('password1','password2')
   });

  }

  createListeners() {
    this.form.valueChanges.subscribe( value => {
     console.log(value);
    });
  }


  addHobby() {
    this.hobbies.push(this.formBuilder.control(''));
  }


  DeleteHobby(index: number) {
    this.hobbies.removeAt(index);
  }

  Save() {

    console.log(this.form);

    if(this.form.invalid){

      return Object.values(this.form.controls).forEach(control => {

        if(control instanceof FormGroup) {
          Object.values(control.controls).forEach( control =>  control.markAllAsTouched());
        } else {
          control.markAllAsTouched();
        }
      });
    }
  }

}
