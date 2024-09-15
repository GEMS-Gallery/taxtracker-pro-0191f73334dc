import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, CircularProgress } from '@mui/material';
import DataTable from 'react-data-table-component';
import { useForm, Controller } from 'react-hook-form';
import { backend } from 'declarations/backend';

type TaxPayerRecord = {
  tid: string;
  firstName: string;
  lastName: string;
  address: string;
};

const columns = [
  { name: 'TID', selector: (row: TaxPayerRecord) => row.tid, sortable: true },
  { name: 'First Name', selector: (row: TaxPayerRecord) => row.firstName, sortable: true },
  { name: 'Last Name', selector: (row: TaxPayerRecord) => row.lastName, sortable: true },
  { name: 'Address', selector: (row: TaxPayerRecord) => row.address, sortable: true },
];

function App() {
  const [taxPayers, setTaxPayers] = useState<TaxPayerRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTid, setSearchTid] = useState('');
  const { control, handleSubmit, reset } = useForm<TaxPayerRecord>();

  useEffect(() => {
    fetchTaxPayers();
  }, []);

  const fetchTaxPayers = async () => {
    setLoading(true);
    try {
      const result = await backend.getTaxPayers();
      setTaxPayers(result);
    } catch (error) {
      console.error('Error fetching tax payers:', error);
    }
    setLoading(false);
  };

  const onSubmit = async (data: TaxPayerRecord) => {
    setLoading(true);
    try {
      await backend.addTaxPayer(data);
      reset();
      await fetchTaxPayers();
    } catch (error) {
      console.error('Error adding tax payer:', error);
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!searchTid) return;
    setLoading(true);
    try {
      const result = await backend.searchTaxPayer(searchTid);
      if (result) {
        setTaxPayers([result]);
      } else {
        setTaxPayers([]);
      }
    } catch (error) {
      console.error('Error searching tax payer:', error);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        TaxPayer Management
      </Typography>

      <TextField
        label="Search by TID"
        variant="outlined"
        value={searchTid}
        onChange={(e) => setSearchTid(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />
      <Button variant="contained" onClick={handleSearch} style={{ marginLeft: '1rem' }}>
        Search
      </Button>
      <Button variant="outlined" onClick={fetchTaxPayers} style={{ marginLeft: '1rem' }}>
        Show All
      </Button>

      {loading ? (
        <CircularProgress />
      ) : (
        <DataTable
          columns={columns}
          data={taxPayers}
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
      )}

      <Typography variant="h5" component="h2" gutterBottom style={{ marginTop: '2rem' }}>
        Add New TaxPayer
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="tid"
          control={control}
          defaultValue=""
          rules={{ required: 'TID is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="TID"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          rules={{ required: 'First Name is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          rules={{ required: 'Last Name is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="address"
          control={control}
          defaultValue=""
          rules={{ required: 'Address is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Address"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          Add TaxPayer
        </Button>
      </form>
    </Container>
  );
}

export default App;
