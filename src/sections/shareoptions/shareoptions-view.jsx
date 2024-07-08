import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Card, Stack, Button, Container, IconButton } from '@mui/material';

import useEmployees from 'src/hooks/useEmployees/useEmployees';
import useGenerateReport from 'src/hooks/usePdfGenerator/usePdfGenerator';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import DataGridTable from 'src/components/data-grid/DataGrid';

import Preview from '../../assets/preview.svg';
import { PreviewReport } from './previewReport';
import Download from '../../assets/download.svg';

// ----------------------------------------------------------------------

export default function ShareOptionsView() {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params, 'params');
  const { id, empid } = params;
  const { employees, loading } = useEmployees({ id });
  const { generatePDF, pdfUrl, printGeneratedPdf } = useGenerateReport();

  // const methods = useForm();

  const [open, setOpen] = useState(false);

  // const handleCreateNewEmployee = () => {
  //   setOpen(!open);
  // };

  const handleGoBack = () => {
    navigate(-1);
  };

  const rows = employees
    ?.filter((employee) => employee.EmployeeID === empid)
    ?.flatMap((employee) =>
      employee?.shareOptions?.map((option, index) => ({
        // ...option,
        issueDate: option.IssueDate,
        marketValue: option.MarketValue,
        noOfOptions: option.NumberOfOptions,
        employeeId: option.EmployeeID,
        exercisePrice: option.ExercisePrice,
        id: `${option.EmployeeID}_${index}`,
        clientId: employee.ClientID,
      }))
    );

  console.log(rows, 'this are rows');

  // useEffect(() => {
  //   if (!open) {
  //     methods.reset();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [open]);

  // useEffect(() => {
  //   if (pdfUrl) {
  //     setOpen(Boolean(pdfUrl));
  //   }
  // }, [pdfUrl]);

  const handlePrintPdf = () => {
    printGeneratedPdf();
  };

  const handlePreview = () => {
    generatePDF();
    console.log('handlePreview', pdfUrl, generatePDF());
    setOpen(Boolean(pdfUrl));
  };

  const handleClosePreview = () => {
    console.log('this is preview');
    setOpen(false);
  };

  const shareOptionsColumns = [
    {
      field: 'clientId',
      headerName: 'Client ID',
      valueGetter: (value) => value?.split('_')[1] ?? value,
    },
    {
      field: 'employeeId',
      headerName: 'Employee ID',
      valueGetter: (value) => value?.split('_')[1] ?? value,
    },
    {
      field: 'exercisePrice',
      headerName: 'Exercise Price',
      type: 'number',
      editable: false,
    },
    {
      field: 'issueDate',
      headerName: 'Issue Date',
      // type: 'date',
      editable: false,
    },
    {
      field: 'marketValue',
      headerName: 'Market Vlaue',
      type: 'number',
      editable: false,
    },
    {
      field: 'noOfOptions',
      headerName: '# of Options',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (data) => {
        console.log(data, 'log');
        console.log(Preview, Download, 'preview download');
        return (
          <>
            <IconButton aria-label="Download" onClick={handlePrintPdf}>
              <img src={Download} alt="Download" width={20} height={20} />
            </IconButton>
            <IconButton aria-label="Preview" onClick={handlePreview}>
              <img src={Preview} alt="Preview" width={20} height={20} />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="ion:chevron-back-outline" />}
          onClick={handleGoBack}
        >
          Back
        </Button>
      </Stack>
      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">SharedOptions</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleCreateNewEmployee}
        >
          New Share Option
        </Button>
      </Stack> */}

      <Card sx={{ p: 5 }}>
        <Scrollbar>
          <DataGridTable
            checkboxSelection={false}
            data={employees}
            columns={shareOptionsColumns}
            rows={rows}
            loading={loading}
          />
        </Scrollbar>
      </Card>
      {console.log(open, 'open')}
      <PreviewReport open={open} handleClose={handleClosePreview} pdfUrl={pdfUrl} />
    </Container>
  );
}
