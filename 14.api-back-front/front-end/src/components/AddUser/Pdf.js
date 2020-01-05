import React, { Component } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

class Pdf extends Component {

  createPdf() {
    var doc = new jsPDF('p', 'pt');

    doc.setFont('times');
    doc.setFontStyle("bold");
    doc.text('Confirmation Letter to Physicians and Medical Center', 105, 30);

    doc.setFontSize(12)
    doc.setFontStyle("none");
    doc.text("27-02-2019", 10, 50);

    doc.text("Sami Services Inc.", 10, 80);
    doc.text("4320 Stevens Creek Blvd; Suit120", 10, 92);
    doc.text("San Jose, CA 95129", 10, 104);

    doc.text("Provide Name", 10, 124);
    doc.text("Provider Designation and Specialty", 10, 136);
    doc.text("Provider Street Address", 10, 148);
    doc.text("Provider City, State and Zip Code", 10, 160);
    doc.text("Provider Telephone", 10, 172);
    doc.text("Attention: Provider Name", 10, 184);


    doc.text("Dear (Provider First Name),", 10, 204);
    doc.text("I wanted to thank you for taking the time to speak with our associate {Auto Populate Admin Name} today at {Auto Populate Date and Time of Provider Record creation}", 10, 224);

 
    doc.autoTable({
      head: [['Service Name', 'CPT Code', 'Speciality', 'Service Prices', 'Other fees', 'Cost to Customer']],
      body: [
        ['DavidDavidDavidDavidDaviidDavidDavidDavidDavidDaviid', 'test', 'test', 'test', 'test', 'test'],
        ['DavidDavidDavidDavidDaviid', 'DavidDavidDavidDavidDaviid', 'test', 'test', 'DavidDavidDavidDavidDaviid', 'test'],
      ],
      margin: [280, 10, 10, 10],
      theme: 'plain',
      styles: {
        lineWidth: 1,
        lineColor: [0, 0, 0]
      }
    });
    doc.save('Letter.pdf');
  }

  render() {
    return (
      <button onClick={() => this.createPdf()}> PDF FILE </button>
    );
  }
}

export default Pdf;