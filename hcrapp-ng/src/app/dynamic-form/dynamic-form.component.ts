import { Component, OnInit } from '@angular/core';
import { person } from '../models/person';
import { HttpServices } from '../services/http.services';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  person: any;
  
  constructor(private httpServices: HttpServices) {}  

  ngOnInit() {
    this.person = person;    
  }
}
