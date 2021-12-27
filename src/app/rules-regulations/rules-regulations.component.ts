import { Component, OnInit } from '@angular/core';
import { config } from '../config';
import { PDFProgressData } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-rules-regulations',
  templateUrl: './rules-regulations.component.html',
  styleUrls: ['./rules-regulations.component.css']
})
export class RulesRegulationsComponent implements OnInit {

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
