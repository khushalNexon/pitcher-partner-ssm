import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';

import { Box, Card, Stack, Paper, Button, Container, IconButton, Typography } from '@mui/material';

import useEmployees from 'src/hooks/useEmployees/useEmployees';
import useShareOptions from 'src/hooks/useShareOptions/useShareOptions';
import useGenerateReport from 'src/hooks/usePdfGenerator/usePdfGenerator';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import DataGridTable from 'src/components/data-grid/DataGrid';

import Preview from '../../assets/preview.svg';
import { PreviewReport } from './previewReport';
import Download from '../../assets/download.svg';
import ShareOptionsModal from './shareoptions-modal';

// ----------------------------------------------------------------------

export default function ShareOptionsView() {
  const navigate = useNavigate();
  const methods = useForm();
  const params = useParams();
  const { id, empid } = params;
  const clientId = id?.split('_')[1] ?? id;
  const employeeId = empid?.split('_')[1] ?? empid;
  const { employees, loading, selectedEmployeeDetails } = useEmployees({ id, empid });
  const { generatePDF, pdfUrl, printGeneratedPdf } = useGenerateReport();
  const { shareOptionloading, createShareOption, shareOptionsList } = useShareOptions({
    id,
    empid,
  });

  const [open, setOpen] = useState(false);
  const [openShareOptionModal, setOpenShareOptionModal] = useState(false);

  const handleGoBack = () => {
    navigate(`/client/${id}`);
  };

  const rows = shareOptionsList;

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

  const handleOnAddShareOptionsSubmit = (data) => {
    createShareOption({ clientId, employeeId, payload: data })
      .then((res) => {
        methods.reset();
        setOpenShareOptionModal(false);
      })
      .catch((err) => console.log(err, 'this is err'));
  };

  const shareOptionsColumns = [
    {
      field: 'issueDate',
      headerName: 'Issue Date',
      // type: 'date',
      editable: false,
      flex: 1,
      align: 'left',
    },
    {
      field: 'exercisePrice',
      headerName: 'Exercise Price',
      // type: 'number',
      editable: false,
      flex: 1,
      align: 'left',
    },
    {
      field: 'marketValue',
      headerName: 'Market Value',
      // type: 'number',
      flex: 1,
      editable: false,
      align: 'left',
    },
    {
      field: 'noOfOptions',
      headerName: 'Options Allocated',
      flex: 1,
      align: 'left',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      flex: 1,
      align: 'left',
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
            <Typography variant="body1">Employee Id: {employeeId ?? ''}</Typography>
            <Typography variant="body1">
              Employee Name: {selectedEmployeeDetails?.employeeDetail?.EmployeeFullName ?? ''}
            </Typography>
          </Box>
        </Paper>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => {
            setOpenShareOptionModal(true);
          }}
        >
          New Share Options
        </Button>
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
      <ShareOptionsModal
        methods={methods}
        isOpen={openShareOptionModal}
        handleToggle={() => {
          methods.reset();
          setOpenShareOptionModal(false);
        }}
        loading={shareOptionloading}
        onSubmit={handleOnAddShareOptionsSubmit}
      />
    </Container>
  );
}
