import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-csv",
  templateUrl: "./csv.component.html",
  styleUrls: ["./csv.component.scss"]
})
export class CsvComponent implements OnInit {
  @ViewChild("csvfileImport") csvfileImport: any;
  csvRecords = [];
  constructor() {}
  ngOnInit() {}

  // called when upload csv
  fileupload($event): void {
    const input = $event.target;
    const files = input.files;
    if (!this.isCSVFile(files[0])) {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
    const reader = new FileReader();
    reader.readAsText(input.files[0]);
    reader.onload = data => {
      const csvData = reader.result;
      const csvRecordsArray = csvData.split(/\r\n|\n/);
      this.csvRecords = this.getDataFromCSVFile(csvRecordsArray, ",");
      this.downloadCSV(this.csvRecords);
      if (this.csvRecords == null) {
        this.fileReset();
      }
    };
    reader.onerror = function() {
      alert("Unable to read " + input.files[0]);
    };
  }

  getDataFromCSVFile(csvRecordsArray, Delimeter) {
    let dataArr = [];
    for (let i = 0; i < csvRecordsArray.length - 1; i++) {
      let data = csvRecordsArray[i].split(Delimeter);
      let sum = 0;
      for (let j = 0; j < data.length; j++) {
        sum += +data[j];
      }
      dataArr.push(sum);
    }
    return dataArr;
  }
  downloadCSV(outputDataArray) {
    let csvOutputData = this.convertToCSV(outputDataArray);
    let blob = new Blob([csvOutputData], { type: "text/csv;charset=utf-8;" });
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, "output.csv");
    } else {
      const link = document.createElement("a");
      if (link.download !== undefined) {
        let url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "output.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
    this.fileReset();
  }
  convertToCSV(outputDataArray: any) {
    let str = "";
    for (let i = 0; i < outputDataArray.length; i++) {
      str += outputDataArray[i] + "\r\n";
    }
    return str;
  }
  fileReset() {
    this.csvfileImport.nativeElement.value = "";
    this.csvRecords = [];
  }
  isCSVFile(file) {
    return file.name.endsWith(".csv");
  }
}
