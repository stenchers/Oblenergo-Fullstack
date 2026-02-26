import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const statusColors = {
  ACTIVE: 'success',
  INACTIVE: 'warning',
  DISCONNECTED: 'error',
  UNDER_REPAIR: 'info',
};

const SubscriberTable = ({ subscribers, onDelete, onStatusChange }) => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'fullName', headerName: 'ПІБ', flex: 1 },
    { field: 'address', headerName: 'Адреса', flex: 1.5 },
    { field: 'phone', headerName: 'Телефон', width: 130 },
    { field: 'contractNumber', headerName: 'Договір', width: 120 },
    {
      field: 'status',
      headerName: 'Статус',
      width: 140,
      renderCell: (params) => (
        <Chip
          label={params.value === 'ACTIVE' ? 'Активний' :
                 params.value === 'INACTIVE' ? 'Неактивний' :
                 params.value === 'DISCONNECTED' ? 'Відключений' : 'На ремонті'}
          color={statusColors[params.value]}
          size="small"
        />
      )
    },
    {
      field: 'actions',
      headerName: 'Дії',
      width: 180,
      renderCell: (params) => (
        <>
          <select
            value={params.row.status}
            onChange={(e) => onStatusChange(params.row.id, e.target.value)}
            style={{ marginRight: 8, padding: '4px' }}
          >
            <option value="ACTIVE">Активний</option>
            <option value="INACTIVE">Неактивний</option>
            <option value="DISCONNECTED">Відключений</option>
            <option value="UNDER_REPAIR">На ремонті</option>
          </select>
          <IconButton color="error" onClick={() => onDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      )
    }
  ];

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={subscribers}
        columns={columns}
        pageSizeOptions={[10, 25, 50]}
        initialState={{ pagination: { paginationModel: { pageSize: 15 } } }}
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default SubscriberTable;