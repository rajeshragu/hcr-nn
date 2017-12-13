import { Component, OnInit } from '@angular/core';
import { HttpServices } from '../services/http.services';
import { TestModel } from '../models/testModel';

@Component({
  selector: 'app-test-network',
  templateUrl: './test-network.component.html',
  styleUrls: ['./test-network.component.scss']
})
export class TestNetworkComponent implements OnInit {
  public filesToUpload: Array<File> = [];
  public fileUploadArray: Array<any> = [];
  public fileNameArray: Array<any> = [];
  public dataSet: Array<string> = [];
  public testData = new TestModel([]);
  public IsUploaded = true;

  constructor(private httpServices: HttpServices) { }

  ngOnInit() {}

  public upload() {
    const files: Array<File> = this.filesToUpload;
    for(let fileName of this.fileNameArray){
      this.testData.DataSet.push(fileName.name);
    }
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

  public testNetwork(){
    console.log(this.testData);
    this.httpServices.post('hcr/test-network', this.testData).subscribe((resp) => {
      console.log('--resp--', resp);
    },
    error => {
        console.log('http error', error);
    });
  }

}
