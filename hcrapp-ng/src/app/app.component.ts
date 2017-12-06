import { Component, OnInit } from '@angular/core';
import { HttpServices } from './services/http.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public inputDataArr: Array<any> = [
    {
      'image': '../assets/images/A.jpg', 'value': [0,0,1,0,0,0,1,0,1,0,1,0,0,0,1,1,1,1,1,1,1,0,0,0,1]
    },
    {
      'image': '../assets/images/B.jpg', 'value': [1,1,1,1,0,1,0,0,0,1,1,1,1,1,0,1,0,0,0,1,1,1,1,1,0]
    },
    {
      'image': '../assets/images/C.jpg', 'value': [0,1,1,1,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,1,1,1]
    },
    {
      'image': '../assets/images/D.jpg', 'value': [1,1,1,1,0,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,0]
    }
  ];

  public inputData: Array<number> = [];
  public outputData: Array<string> = [];

  constructor(private httpServices: HttpServices){}
  ngOnInit(){}

  public sendData(){    
    this.httpServices.post('hcr', {'inputData': this.inputData.toString()}).subscribe((resp) => {
      console.log('resp', resp);
      this.outputData = resp.data;
    },
    error => {
        console.log('http error', error);
    });
  }
}
