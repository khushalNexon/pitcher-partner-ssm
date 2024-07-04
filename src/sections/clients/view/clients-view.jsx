import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import useClients from 'src/hooks/useClients/useClients';

import { clientColumns } from 'src/utils/getDataGridColumns';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import DataGridTable from 'src/components/data-grid/DataGrid';

import ClientModal from '../client-modal';

// ----------------------------------------------------------------------

export default function ClientsPage() {
  const { clients, loading, createClient } = useClients();
  const navigate = useNavigate();

  const methods = useForm();

  const [open, setOpen] = useState(false);

  const handleOnCellClick = (cell, row) => {
    navigate(`/client/${cell.id}`);
  };

  const handleCreateNewClients = (id) => {
    // console.log('handleCreateNewEmployee', id);
    setOpen(!open);
  };

  const onSubmit = (data) => {
    createClient({ payload: data })
      .then(() => setOpen(!open))
      .catch((err) => err);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const rows = clients?.map((v, index) => ({
    id: `${v.id}_${index}`,
    clientId: v.id,
    abnNo: v.ClientABNNo,
    name: v.ClientName,
    email: v.ClientEmail ?? '',
    ...v,
  }));

  useEffect(() => {
    if (!open) {
      methods.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // if (!loading && clients.length === 0) return <p>No records found</p>;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Clients</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleCreateNewClients}
        >
          New Clients
        </Button>
      </Stack>

      <Card>
        <Scrollbar>
          <DataGridTable
            checkboxSelection={false}
            data={clients}
            columns={clientColumns}
            rows={rows}
            loading={loading}
            handleOnCellClick={handleOnCellClick}
          />
        </Scrollbar>
      </Card>

      <ClientModal
        methods={methods}
        isOpen={open}
        handleToggle={handleToggle}
        onSubmit={onSubmit}
        loading={loading}
      />
    </Container>
  );
}
