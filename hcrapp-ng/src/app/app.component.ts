import { Component, OnInit } from '@angular/core';
import { HttpServices } from './services/http.services';
import { ITrainingData } from './models/trainingData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

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
  public filesToUpload: Array<File> = [];
  public fileUploadArray: Array<any> = [];
  public fileNameArray: Array<string> = [];
  public dataSet: Array<string> = [];

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

  public upload() {
    const files: Array<File> = this.filesToUpload;
    this.httpServices.upload('hcr/upload', files).subscribe((files) => {
      console.log('files', files);
    },
    error => {
        console.log('http error', error);
    });
  }

  public fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    this.fileUploadArray = [];

    for(let i=0; i<this.filesToUpload.length; i++){
      var file = this.filesToUpload[i];
      this.fileNameArray.push(file.name);
      var myReader:FileReader = new FileReader();
      myReader.readAsDataURL(file);
      myReader.onloadend = (e) => {
        var previewPic:any = e.target;
        this.fileUploadArray.push(previewPic.result);
      };
    }    
  }
}
