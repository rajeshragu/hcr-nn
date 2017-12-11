import { Component, OnInit } from '@angular/core';
import { HttpServices } from '../services/http.services';
import { TrainingModel } from '../models/trainingModel';

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
  public IsDataSelected:boolean = true;
  public trainingData = new TrainingModel([], '');
  public targetCharArr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  
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

  public chooseTarget(){
    for(let fileName of this.fileNameArray){
      if(fileName.checked){
        this.trainingData.DataSet.push(fileName.name);
      }
    }
    if(this.trainingData.DataSet.length>0)
      this.IsDataSelected = false;
  }

  public trainNetwork(){
    console.log(this.trainingData);
    this.httpServices.post('hcr/train-network', this.trainingData).subscribe((resp) => {
      console.log('--resp--', resp);
    },
    error => {
        console.log('http error', error);
    });
  }
}
