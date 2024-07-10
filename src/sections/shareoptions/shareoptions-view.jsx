import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Box, Card, Stack, Paper, Button, Container, IconButton, Typography } from '@mui/material';

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
  const { id, empid } = params;
  const { employees, loading, selectedEmployeeDetails } = useEmployees({ id, empid });
  const { generatePDF, pdfUrl, printGeneratedPdf } = useGenerateReport();

  const [open, setOpen] = useState(false);

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

  const handlePrintPdf = ({ shareOption }) => {
    printGeneratedPdf({ empDetails: selectedEmployeeDetails, shareDetail: shareOption });
  };

  const handlePreview = ({ shareOption }) => {
    generatePDF({ empDetails: selectedEmployeeDetails, shareDetail: shareOption });
    setOpen(Boolean(pdfUrl));
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const shareOptionsColumns = [
    {
      field: 'clientId',
      headerName: 'Client ID',
      valueGetter: (value) => value?.split('_')[1] ?? value,
      flex: 1,
    },
    {
      field: 'employeeId',
      headerName: 'Employee ID',
      valueGetter: (value) => value?.split('_')[1] ?? value,
      flex: 1,
    },
    {
      field: 'exercisePrice',
      headerName: 'Exercise Price',
      type: 'number',
      editable: false,
      flex: 1,
    },
    {
      field: 'issueDate',
      headerName: 'Issue Date',
      // type: 'date',
      editable: false,
      flex: 1,
    },
    {
      field: 'marketValue',
      headerName: 'Market Vlaue',
      type: 'number',
      flex: 1,
      editable: false,
    },
    {
      field: 'noOfOptions',
      headerName: '# of Options',
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      flex: 1,
      renderCell: (data) => (
        <>
          <IconButton
            aria-label="Download"
            onClick={() => handlePrintPdf({ shareOption: data.row })}
          >
            <img src={Download} alt="Download" width={20} height={20} />
          </IconButton>
          <IconButton aria-label="Preview" onClick={() => handlePreview({ shareOption: data.row })}>
            <img src={Preview} alt="Preview" width={20} height={20} />
          </IconButton>
        </>
      ),
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
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Paper
          sx={{
            p: 2,
            width: '60%',
            boxShadow:
              '0 0 0px 0 rgba(145, 158, 171, 0.08),0 10px 50px 0px rgba(145, 158, 171, 0.08)',
          }}
        >
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            {console.log(selectedEmployeeDetails, 'selectedEmployeeDetails')}
            <Typography variant="body1">
              Employee Id: {selectedEmployeeDetails?.employeeDetail?.EmployeeID ?? ''}
            </Typography>
            <Typography variant="body1">
              Employee Name: {selectedEmployeeDetails?.employeeDetail?.EmployeeFullName ?? ''}
            </Typography>
          </Box>
        </Paper>
      </Stack>

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
      <PreviewReport open={open} handleClose={handleClosePreview} pdfUrl={pdfUrl} />
    </Container>
  );
}
