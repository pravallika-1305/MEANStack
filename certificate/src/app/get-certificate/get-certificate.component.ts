import { Component, OnInit } from '@angular/core';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-get-certificate',
  templateUrl: './get-certificate.component.html',
  styleUrls: ['./get-certificate.component.css']
})
export class GetCertificateComponent  {

//title = 'html-to-pdf-angular-application';
public convetToPDF()
{
var data = document.getElementById('contentToConvert');
html2canvas(data).then(canvas => {
// Few necessary setting options
var imgWidth = 210;
var pageHeight = 300;
var imgHeight = canvas.height * imgWidth / canvas.width;
var heightLeft = imgHeight;
 
const contentDataURL = canvas.toDataURL('image/png')
let pdf = new jsPDF();
var position = 0;
pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
pdf.save('certificate.pdf'); // Generated PDF
});
}
}
 