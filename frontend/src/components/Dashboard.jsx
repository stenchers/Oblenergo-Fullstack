import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField, Box, AppBar, Toolbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import SubscriberTable from './SubscriberTable';
import AddSubscriberModal from './AddSubscriberModal';
import { getSubscribers, searchSubscribers, deleteSubscriber, updateSubscriberStatus } from '../services/api';

const Dashboard = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const loadSubscribers = async (query = '') => {
    try {
      const res = query 
        ? await searchSubscribers(query) 
        : await getSubscribers();
      setSubscribers(res.data);
    } catch (err) {
      alert('Помилка завантаження даних');
    }
  };

  useEffect(() => {
    loadSubscribers();
  }, []);

  const handleSearch = (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    loadSubscribers(q);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Видалити абонента?')) return;
    try {
      await deleteSubscriber(id);
      loadSubscribers(searchQuery);
    } catch (err) {
      alert('Не вдалося видалити');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateSubscriberStatus(id, status);
      loadSubscribers(searchQuery);
    } catch (err) {
      alert('Не вдалося оновити статус');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Довідник абонентів Прикарпаттяобленерго
          </Typography>
          <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>
            Вийти
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <TextField
            label="Пошук (ПІБ, адреса, договір)"
            variant="outlined"
            fullWidth
            sx={{ maxWidth: 500 }}
            value={searchQuery}
            onChange={handleSearch}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setModalOpen(true)}
          >
            Додати абонента
          </Button>
        </Box>

        <SubscriberTable 
          subscribers={subscribers} 
          onDelete={handleDelete} 
          onStatusChange={handleStatusChange} 
        />
      </Container>

      <AddSubscriberModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onAdded={() => loadSubscribers(searchQuery)} 
      />
    </>
  );
};

export default Dashboard;