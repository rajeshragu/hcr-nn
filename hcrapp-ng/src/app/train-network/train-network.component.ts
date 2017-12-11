import { Component, OnInit } from '@angular/core';
import { HttpServices } from '../services/http.services';
import { ITrainingData } from '../models/trainingData';

@Component({
  selector: 'app-train-network',
  templateUrl: './train-network.component.html',
  styleUrls: ['./train-network.component.scss']
})
export class TrainNetworkComponent implements OnInit {
  public filesToUpload: Array<File> = [];
  public fileUploadArray: Array<any> = [];
  public fileNameArray: Array<any> = [];
  public dataSet: Array<string> = [];
  public IsUploaded:boolean = true;

  constructor(private httpServices: HttpServices){}  

  ngOnInit() {} 

  public upload() {
    const files: Array<File> = this.filesToUpload;
    this.httpServices.upload('hcr/upload', files).subscribe((files) => {
      console.log('files', files);
      this.IsUploaded = false;
    },
    error => {
        console.log('http error', error);
        this.IsUploaded = true;
    });
  }

  public fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    this.fileUploadArray = [];

    for(let i=0; i<this.filesToUpload.length; i++){
      var file = this.filesToUpload[i];
      this.fileNameArray.push(
        { name: file.name, checked: false}
      );
      var myReader:FileReader = new FileReader();
      myReader.readAsDataURL(file);
      myReader.onloadend = (e) => {
        var previewPic:any = e.target;
        this.fileUploadArray.push(previewPic.result);
      };
    }    
  }
}
