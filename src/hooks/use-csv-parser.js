// eslint-disable-next-line import/no-extraneous-dependencies
import Papa from 'papaparse';
import { useState } from 'react';

import { csvObjectMapper } from 'src/utils/csvObject';

const useCSVParser = () => {
  const [jsonData, setJsonData] = useState([]);
  const [csvData, setCsvData] = useState('');

  const parseCSVToJSON = (file) =>
    new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          console.log(results.data);
          setJsonData(results.data);
          resolve(results.data);
        },
        error: (error) => {
          reject(error);
        },
      });
    });

  const parseJSONToCSV = (data) => {
    const csv = Papa.unparse(data);
    setCsvData(csv);
    return csv;
  };

  const formattedFile = async ({ file }) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const fetchJsonData = await parseCSVToJSON(file);
      const formattedData = csvObjectMapper(fetchJsonData);
      const newCSVFile = parseJSONToCSV(formattedData);
      const blob = new Blob([newCSVFile], { type: 'text/csv;charset=utf-8;' });
      return blob;
    } catch (error) {
      throw error;
    }
  };

  return {
    jsonData,
    parseCSVToJSON,
    parseJSONToCSV,
    csvData,
    formattedFile,
  };
};

export default useCSVParser;
