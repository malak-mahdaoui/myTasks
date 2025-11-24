import { Delete, Favorite, FavoriteBorder } from '@mui/icons-material';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  IconButton,
  Typography
} from '@mui/material';
import { removeTask, updatedTask } from '../features/tasks/taskSlice';
import UpdateForm from './UpdateForm';
import { useDispatch } from 'react-redux';

const Task = ({ task }) => {
  const dispatch = useDispatch();

  const priorityStyles = {
    high: 'rgba(255, 235, 150, 0.35)',
    urgent: 'rgba(255, 150, 150, 0.35)',
    normal: 'rgba(255,255,255,0.12)'
  };

  const priorityGlow = {
    high: '0 0 10px rgba(255, 235, 150, 0.5)',
    urgent: '0 0 10px rgba(255, 150, 150, 0.5)',
    normal: 'none'
  };

  return (
    <Box sx={{ minWidth: 300}}>
      <Card
        variant="outlined"
        sx={{
          background: task.taskCompleted
            ? 'rgba(200,200,200,0.35)'
            : priorityStyles[task.priority] || priorityStyles.normal,
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.18)',
          boxShadow: task.taskCompleted
            ? '0 4px 10px rgba(0,0,0,0.15)'
            : priorityGlow[task.priority],
          transition: '0.3s',
          p: 1,
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.25)'
          }
        }}
      >
        <CardContent>
          {/* Mark as complete */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Checkbox
              checked={task.taskCompleted}
              onClick={() =>
                dispatch(
                  updatedTask({
                    taskId: task._id,
                    taskData: { taskCompleted: !task.taskCompleted }
                  })
                )
              }
              sx={{
                color: '#90caf9',
                '&.Mui-checked': {
                  color: '#42a5f5'
                }
              }}
            />
            <Typography
              sx={{
                fontWeight: 600,
                color: task.taskCompleted ? '#4caf50' : '#ffeb3b'
              }}
            >
              {task.taskCompleted ? 'Completed' : 'Mark as complete'}
            </Typography>
          </Box>

          <Typography
            sx={{ fontSize: 13, color: 'text.secondary', mt: 1 }}
            gutterBottom
          >
            Task Details
          </Typography>

          <Typography
            variant="body1"
            component={task.taskCompleted ? 'del' : 'div'}
            sx={{
              fontSize: '1rem',
              mb: 1,
              color: 'white'
            }}
          >
            {task.taskItem}
          </Typography>

          <Typography
            sx={{
              color: task.taskCompleted ? '#80e27e' : '#ff867c',
              fontWeight: 600
            }}
          >
            {task.taskCompleted ? 'Completed' : 'Not completed'}
          </Typography>
        </CardContent>

        {/* Icons: Favorite, Update, Delete */}
        <CardActions sx={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            icon={<FavoriteBorder sx={{ color: 'white' }} />}
            checkedIcon={<Favorite sx={{ color: 'red' }} />}
            checked={task.favorite}
            onClick={() =>
              dispatch(
                updatedTask({
                  taskId: task._id,
                  taskData: { favorite: !task.favorite }
                })
              )
            }
            sx={{
              ml: -1,
              '& .MuiSvgIcon-root': { fontSize: 26 }
            }}
          />

          <UpdateForm taskToUpdate={task} />

          <IconButton
            aria-label="delete"
            onClick={() => dispatch(removeTask(task._id))}
            sx={{
              color: '#ff7979',
              '&:hover': { color: '#ff4d4d' }
            }}
          >
            <Delete />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Task;
