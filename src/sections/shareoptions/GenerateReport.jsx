import { saveAs } from 'file-saver';
import React, { useState } from 'react';
import { rgb, PDFDocument } from 'pdf-lib';

import { getTodayDate } from 'src/utils/date';

import pdfBytes from '../../assets/reportFormate.pdf';

// eslint-disable-next-line no-shadow
const UpdatePDF = async (pdfBytes1) => {
  const pdfDoc = await PDFDocument.load(pdfBytes1);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Example of updating specific fields (coordinates are placeholders, adjust them accordingly)

  // const date = Date();
  // date.getFullYear();
  const year = new Date().getFullYear();

  firstPage.drawText(`${year}`, {
    x: 510,
    y: 770,
    size: 12,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText('John Doe', {
    x: 50,
    y: 685,
    size: 10,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText('Address line 1', {
    x: 50,
    y: 651,
    size: 10,
    color: rgb(0, 0, 0),
  });
  firstPage.drawText('Address line 2', {
    x: 50,
    y: 635,
    size: 10,
    color: rgb(0, 0, 0),
  });
  firstPage.drawText('Address line 3', {
    x: 50,
    y: 619,
    size: 10,
    color: rgb(0, 0, 0),
  });
  firstPage.drawText('Address line 4', {
    x: 50,
    y: 601,
    size: 10,
    color: rgb(0, 0, 0),
  });

  // TFN no
  firstPage.drawText('1234567890123456', {
    x: 67,
    y: 567,
    size: 10,
    color: rgb(0, 0, 0),
  });

  // ABN no
  firstPage.drawText('1234567890123456', {
    x: 67,
    y: 545,
    size: 10,
    color: rgb(0, 0, 0),
  });

  // Number of options acquired
  firstPage.drawText('100', {
    x: 435,
    y: 322,
    size: 10,
    color: rgb(0, 0, 0),
  });

  // Market value of ordinary shares on the date options acquired.
  firstPage.drawText('100', {
    x: 435,
    y: 291,
    size: 10,
    color: rgb(0, 0, 0),
  });
  firstPage.drawText('00', {
    x: 530,
    y: 291,
    size: 10,
    color: rgb(0, 0, 0),
  });

  // Exercise price pe options acquired.
  firstPage.drawText('100', {
    x: 435,
    y: 259,
    size: 10,
    color: rgb(0, 0, 0),
  });
  firstPage.drawText('00', {
    x: 530,
    y: 259,
    size: 10,
    color: rgb(0, 0, 0),
  });

  // Acquisition date
  firstPage.drawText('DD-MM-YYYY', {
    x: 435,
    y: 227,
    size: 10,
    color: rgb(0, 0, 0),
  });

  // Employer ABN
  firstPage.drawText('1234567890123456', {
    x: 115,
    y: 152,
    size: 10,
    color: rgb(0, 0, 0),
  });
  // Employer name
  firstPage.drawText('Employer name', {
    x: 115,
    y: 124,
    size: 10,
    color: rgb(0, 0, 0),
  });
  // Signature of authorised person
  firstPage.drawText('Signature of authorised person', {
    x: 170,
    y: 89,
    size: 10,
    color: rgb(0, 0, 0),
  });

  // Date
  const date = getTodayDate({type: 'dd-mm-yyyy'});
  firstPage.drawText(`${date}`, {
    x: 437,
    y: 89,
    size: 10,
    color: rgb(0, 0, 0),
  });

  // Continue updating other fields as necessary...

  const pdfBytesModified = await pdfDoc.save();
  return pdfBytesModified;
};

const GenerateReport = () => {
  const [pdfUrl, setPdfUrl] = useState('');

  const generatePDF = async () => {
    // Fetch the existing PDF bytes
    const existingPdfBytes = await fetch(pdfBytes).then((res) => res.arrayBuffer());

    // Update the PDF
    const updatedPdfBytes = await UpdatePDF(existingPdfBytes);

    // Convert the updated PDF bytes to a Blob
    const blob = new Blob([updatedPdfBytes], { type: 'application/pdf' });

    const url = URL.createObjectURL(blob);
    setPdfUrl(url);

    // Save the updated PDF
    return blob;
  };

  const printGeneratedPdf = async () => {
    const blob = await generatePDF();
    saveAs(blob, 'updated_report.pdf');
  };

  return (
    <div>
      <h1>Generate Report</h1>
      <button type="button" onClick={generatePDF}>
        Generate PDF
      </button>
      <button type="button" onClick={printGeneratedPdf}>
        Print PDF
      </button>
      {pdfUrl && (
        <>
          <h2>Preview</h2>
          <iframe src={pdfUrl} width="100%" height="600px" title="PDF Preview" />
        </>
      )}
    </div>
  );
};

export default GenerateReport;
