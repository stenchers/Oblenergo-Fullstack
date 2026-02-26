import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import { addSubscriber } from '../services/api';

const statuses = [
  { value: 'ACTIVE', label: 'Активний' },
  { value: 'INACTIVE', label: 'Неактивний' },
  { value: 'DISCONNECTED', label: 'Відключений' },
  { value: 'UNDER_REPAIR', label: 'На ремонті' },
];

const AddSubscriberModal = ({ open, onClose, onAdded }) => {
  const [form, setForm] = useState({
    fullName: '', address: '', phone: '', contractNumber: '', status: 'ACTIVE'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await addSubscriber(form);
      onAdded();
      onClose();
      setForm({ fullName: '', address: '', phone: '', contractNumber: '', status: 'ACTIVE' });
    } catch (err) {
      alert('Помилка додавання: ' + (err.response?.data || err.message));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Додати нового абонента</DialogTitle>
      <DialogContent>
        <TextField name="fullName" label="ПІБ" fullWidth margin="dense" onChange={handleChange} />
        <TextField name="address" label="Адреса" fullWidth margin="dense" onChange={handleChange} />
        <TextField name="phone" label="Телефон" fullWidth margin="dense" onChange={handleChange} />
        <TextField name="contractNumber" label="Номер договору" fullWidth margin="dense" onChange={handleChange} />
        
        <FormControl fullWidth margin="dense">
          <InputLabel>Статус</InputLabel>
          <Select name="status" value={form.status} onChange={handleChange}>
            {statuses.map(s => (
              <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Скасувати</Button>
        <Button variant="contained" onClick={handleSubmit}>Додати</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSubscriberModal;