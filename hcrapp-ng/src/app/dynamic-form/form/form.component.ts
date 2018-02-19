import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpServices } from '../../services/http.services';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  @Input() dataObject;
  form: FormGroup;
  objectProps:any;

  constructor(private httpServices: HttpServices) {}  

  ngOnInit() {
    const formGroup = {};
    formGroup['Id'] = new FormControl('Id');
    this.form = new FormGroup(formGroup);

    this.httpServices.get('formElements/sendElements').subscribe((resp) => {
      console.log('--resp--', resp);
      for(let apiData of resp.data){
        for(let key in apiData){
          this.dataObject[key] = resp.data[0][key];
        }
      }      
      
      this.objectProps =
      Object.keys(this.dataObject)
      .map(prop => {
        return Object.assign({}, { key: prop } , this.dataObject[prop]);
      });
      
      for(let prop of Object.keys(this.dataObject)) {
        formGroup[prop] = new FormControl(this.dataObject[prop].value || '', this.mapValidators(this.dataObject[prop].validation));
      }  
      this.form = new FormGroup(formGroup);
    },
    error => {
        console.log('http error', error);
    });    
  }
  
  private mapValidators(validators) {
    const formValidators = [];  
    if(validators) {
      for(const validation of Object.keys(validators)) {
        if(validation === 'required') {
          formValidators.push(Validators.required);
        } else if(validation === 'min') {
          formValidators.push(Validators.min(validators[validation]));
        }
      }
    }  
    return formValidators;
  }

  public onSubmit(form) {
    console.log(form);
  }
}
