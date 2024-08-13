import { useState } from 'react';
import { saveAs } from 'file-saver';
import { rgb, PDFDocument } from 'pdf-lib';

import { getTodayDate } from 'src/utils/date';

import pdfBytes from '../../assets/reportFormate.pdf';

const useGenerateReport = () => {
  const [pdfUrl, setPdfUrl] = useState('');

  // eslint-disable-next-line no-shadow
  const UpdatePDF = async (pdfBytes1, empDetails, shareDetail) => {
    const { ClientName, ClientABNNo } = empDetails;
    const {
      EmployeeABNNo,
      EmployeeAddressLine1,
      EmployeeAddressLine2,
      EmployeeFullName,
      EmployeeTFNNo,
      Suburb,
      State,
      PostalCode,
    } = empDetails.employeeDetail;
    console.log(empDetails.employeeDetail, Suburb, State, PostalCode, 'empDetails.employeeDetail');
    const { noOfOptions, marketValue, issueDate, exercisePrice } = shareDetail;

    const pdfDoc = await PDFDocument.load(pdfBytes1);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const year = new Date().getFullYear();
    const date = getTodayDate({ type: 'dd-mm-yyyy' });

    firstPage.drawText(`${year}`, {
      x: 510,
      y: 770,
      size: 12,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(`${EmployeeFullName ?? ''}`, {
      x: 50,
      y: 685,
      size: 10,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(`${EmployeeAddressLine1 ?? ''}`, {
      x: 50,
      y: 651,
      size: 10,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(`${EmployeeAddressLine2 ?? ''}`, {
      x: 50,
      y: 635,
      size: 10,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(`${Suburb ?? ''}`, {
      x: 50,
      y: 619,
      size: 10,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(`${State ? `${State}, ` : ''}${PostalCode || ''}`, {
      x: 50,
      y: 601,
      size: 10,
      color: rgb(0, 0, 0),
    });

    // TFN no
    firstPage.drawText(`${EmployeeTFNNo ?? ''}`, {
      x: 67,
      y: 567,
      size: 10,
      color: rgb(0, 0, 0),
    });

    // ABN no
    firstPage.drawText(`${EmployeeABNNo ?? ''}`, {
      x: 67,
      y: 545,
      size: 10,
      color: rgb(0, 0, 0),
    });

    // Number of options acquired
    firstPage.drawText(`${noOfOptions ?? ''}`, {
      x: 435,
      y: 322,
      size: 10,
      color: rgb(0, 0, 0),
    });

    // Market value of ordinary shares on the date options acquired.
    firstPage.drawText(`${marketValue ?? ''}`, {
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
    firstPage.drawText(`${exercisePrice ?? ''}`, {
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
    firstPage.drawText(`${issueDate ?? ''}`, {
      x: 435,
      y: 227,
      size: 10,
      color: rgb(0, 0, 0),
    });

    // Employer ABN
    firstPage.drawText(`${ClientABNNo ?? ''}`, {
      x: 115,
      y: 152,
      size: 10,
      color: rgb(0, 0, 0),
    });
    // Employer name
    firstPage.drawText(`${ClientName ?? ''}`, {
      x: 115,
      y: 124,
      size: 10,
      color: rgb(0, 0, 0),
    });

    // Signature of authorised person
    // firstPage.drawText('Signature of authorised person', {
    //   x: 170,
    //   y: 89,
    //   size: 10,
    //   color: rgb(0, 0, 0),
    // });

    // Date
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

  const generatePDF = async ({ empDetails, shareDetail }) => {
    // Fetch the existing PDF bytes
    const existingPdfBytes = await fetch(pdfBytes, empDetails).then((res) => res.arrayBuffer());

    // Update the PDF
    const updatedPdfBytes = await UpdatePDF(existingPdfBytes, empDetails, shareDetail);

    // Convert the updated PDF bytes to a Blob
    const blob = new Blob([updatedPdfBytes], { type: 'application/pdf' });

    const url = URL.createObjectURL(blob);
    setPdfUrl(url);

    // Save the updated PDF
    return blob;
  };

  const printGeneratedPdf = async ({ empDetails, shareDetail }) => {
    const blob = await generatePDF({ empDetails, shareDetail });
    saveAs(blob, 'updated_report.pdf');
  };

  return {
    pdfUrl,
    printGeneratedPdf,
    generatePDF,
  };
};

export default useGenerateReport;
