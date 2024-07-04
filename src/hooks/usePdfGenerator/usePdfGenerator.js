/* eslint-disable new-cap */
import jsPDF from 'jspdf';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PDFDocument } from 'pdf-lib';

const usePdfGenerator = () => {
  const generatePdf = async () => {
    const doc = new jsPDF();

    // Add content to the PDF
    doc.text('Hello world!', 10, 10);
    doc.text('This is a sample PDF file created using jsPDF in a React.js project.', 10, 20);

    console.log(getBase64Image('/'));
    // Save the PDF
    doc.save('report.pdf');
  };

  const UpdatePDF = async (pdfBytes, updatedText) => {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
  
    firstPage.drawText(updatedText, {
      x: 50,
      y: 700,
      size: 24,
    });
  
    const pdfBytesModified = await pdfDoc.save();
    return pdfBytesModified;
  };

  const generatePDFReport = async () => {
    const existingPdfBytes = new Uint8Array(/* your existing PDF bytes here */);
    const updatedPdfBytes = await UpdatePDF(existingPdfBytes, 'Updated Text');
    const doc1 = new jsPDF();
    const pdfData = new Uint8Array(updatedPdfBytes);
    const blob = new Blob([pdfData], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    console.log(doc1, "doc1");

    const link = document.createElement('a');
    link.href = url;
    link.download = 'updated_report.pdf';
    link.click();
    URL.revokeObjectURL(url);
  };

  const getBase64Image = (file) => {
    console.log(file, 'file');
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return {
    generatePdf,
    generatePDFReport, 
  };
};

export default usePdfGenerator;
