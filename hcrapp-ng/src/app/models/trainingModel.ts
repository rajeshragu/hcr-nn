export class TrainingModel { 
    DataSet: Array<string>;
    TargetCharacter: string;
    constructor(dataSet: Array<string>, targetChar: string){
        this.DataSet = dataSet;
        this.TargetCharacter = targetChar;
    }
} 