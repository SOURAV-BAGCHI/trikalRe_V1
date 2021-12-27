import { Component, OnInit } from '@angular/core';
import { config } from 'src/app/config';
import { PDFProgressData } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-rulesandregulations',
  templateUrl: './rulesandregulations.component.html',
  styleUrls: ['./rulesandregulations.component.css']
})
export class RulesandregulationsComponent implements OnInit {

  constructor() { }
  pdfSrc:String=config.hostname+"PDF/RulesAndRegulations.pdf";
  isloading:boolean=false;
  errorloading:boolean=false;
  ngOnInit(): void {
    this.isloading=true;
  }
  onProgress(progressData: PDFProgressData) {
    // do anything with progress data. For example progress indicator
    // console.log('ON progress');
    this.isloading=true;
  }
  pageRendered(e: CustomEvent) {
    // console.log('(page-rendered)', e);
    this.isloading=false;
  }

  onError(error: any) {
    this.errorloading=true;
    this.isloading=false;
  }
}
