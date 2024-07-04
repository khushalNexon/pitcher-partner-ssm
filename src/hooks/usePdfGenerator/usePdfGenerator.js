/* eslint-disable new-cap */
import jsPDF from 'jspdf';

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
  };
};

export default usePdfGenerator;
