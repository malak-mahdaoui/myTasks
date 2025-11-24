import { Box, Typography, Divider } from '@mui/material';
import React from 'react';
import { CheckCircleOutline, FavoriteBorderRounded } from '@mui/icons-material';
import TaskFilter from './TaskFilter';

const Sidebar = () => {
  return (
    <Box
      flex={{ sm: 2, md: 1 }}
      px={2}
      sx={{
        display: { xs: 'none', sm: 'block' },
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          width: { sm: '28%', md: '20%' },
          background: 'rgba(255, 255, 255, 0.10)',
          borderRadius: '18px',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
          p: 2,
          height: '90vh',
          overflow: 'hidden',
          animation: 'fadeSlide 0.6s ease',
          '@keyframes fadeSlide': {
            '0%': { opacity: 0, transform: 'translateX(-10px)' },
            '100%': { opacity: 1, transform: 'translateX(0)' },
          },
        }}
      >
        {/* Favorite Section */}
        <Typography
          variant="h6"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontWeight: 600,
            mb: 1,
            color: '#d1d1d1',
            transition: '0.3s',
            cursor: 'default',
            '&:hover': { color: '#ffffffd9' },
          }}
        >
          <FavoriteBorderRounded sx={{ color: '#ffb8d2', fontSize: '20px' }} />
          Favorite Tasks
        </Typography>

        <Box
          sx={{
            height: '35vh',
            overflowY: 'auto',
            pr: 1,
            '&::-webkit-scrollbar': { width: '6px' },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(255,255,255,0.3)',
              borderRadius: '10px',
            },
          }}
        >
          <TaskFilter favFilter={true} />
        </Box>

        <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.3)' }} />

        {/* Completed Section */}
        <Typography
          variant="h6"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontWeight: 600,
            mb: 1,
            color: '#d1d1d1',
            transition: '0.3s',
            cursor: 'default',
            '&:hover': { color: '#ffffffd9' },
          }}
        >
          <CheckCircleOutline sx={{ color: '#b1ffc8', fontSize: '20px' }} />
          Completed Tasks
        </Typography>

        <Box
          sx={{
            height: '40vh',
            overflowY: 'auto',
            pr: 1,
            '&::-webkit-scrollbar': { width: '6px' },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(255,255,255,0.3)',
              borderRadius: '10px',
            },
          }}
        >
          <TaskFilter favFilter={false} />
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
