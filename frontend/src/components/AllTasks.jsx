import { Box, TextField, Typography, Checkbox, FormControlLabel, MenuItem, Select, Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { filterTask, getTasks, reset } from '../features/tasks/taskSlice';
import Task from './Task';
import { Cached } from '@mui/icons-material';

const AllTasks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tasks, isLoading, isError, message } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
    dispatch(getTasks());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, user, navigate, isError, message]);

  const [filterItem, setFilterItem] = useState({
    taskText: '',
    isComplete: false,
    isFavorite: false,
    isToday: false,
    priorityFilter: '',
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    const updatedFilterItem = {
      ...filterItem,
      [name]: newValue,
    };
    setFilterItem(updatedFilterItem);
    dispatch(filterTask(updatedFilterItem));
  };

  if (isLoading) {
    return (
      <Box
        flex={4}
        sx={{
          position: 'fixed',
          top: '50%',
          left: { xs: '40%', sm: '60%' },
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
        <Cached sx={{ width: '5rem', height: '5rem' }} />
      </Box>
    );
  }

  return (
    <>
      <Box flex={4}>
        
        {/* 🔍 SEARCH BAR CARD */}
        <Card
          sx={{
            backdropFilter: 'blur(12px)',
            background: 'rgba(52, 4, 39, 0.25)',
            borderRadius: 4,
            boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
            width: { xs: '100%', sm: '80%' },
            margin: '0 auto',
            p: 3,
            mb: 4,
          }}
        >
          {/* Search field */}
          <TextField
            fullWidth
            variant="outlined"
            name="taskText"
            placeholder="Search tasks..."
            value={filterItem.taskText}
            onChange={handleChange}
            sx={{
              mb: 3,
              backgroundColor: 'rgba(52, 4, 39, 0.5)',
              borderRadius: '12px',

              '& .MuiInputBase-input': {
                color: '#fff',
                fontWeight: 500,
              },

              '& .MuiInputBase-input::placeholder': {
                color: 'rgba(255,255,255,0.6)',
              },

              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.4)',
              },

              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.8)',
              },

              '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ff77d9',
                boxShadow: '0 0 8px rgba(255, 119, 217, 0.6)',
              },
            }}
          />

          {/* FILTERS */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              gap: 3,
            }}
          >
            {/* Checkboxes group */}
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isToday"
                    checked={filterItem.isToday}
                    onChange={handleChange}
                    sx={{ color: '#fff' }}
                  />
                }
                label={<Typography sx={{ color: '#fff' }}>Today</Typography>}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="isComplete"
                    checked={filterItem.isComplete}
                    onChange={handleChange}
                    sx={{ color: '#fff' }}
                  />
                }
                label={<Typography sx={{ color: '#fff' }}>Completed</Typography>}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="isFavorite"
                    checked={filterItem.isFavorite}
                    onChange={handleChange}
                    sx={{ color: '#fff' }}
                  />
                }
                label={<Typography sx={{ color: '#fff' }}>Favorite</Typography>}
              />
            </Box>

            {/* Priority select */}
            <Select
              name="priorityFilter"
              value={filterItem.priorityFilter}
              onChange={handleChange}
              displayEmpty
              sx={{
                minWidth: 160,
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#fff',
                borderRadius: 2,
                '& .MuiSvgIcon-root': { color: '#fff' },
              }}
            >
              <MenuItem value="all">All priority</MenuItem>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="urgent">Urgent</MenuItem>
            </Select>
          </Box>
        </Card>

        {/* TASKS GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 12,
          }}
        >
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => <Task key={task._id} task={task} />)
          ) : (
            <Box
              sx={{
                gridColumn: '1 / -1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
              }}
            >
              <Typography variant="h5" sx={{ textAlign: 'center', color: '#fff' }}>
                Tasks Not Found
              </Typography>
            </Box>
          )}
        </div>
      </Box>
    </>
  );
};

export default AllTasks;
