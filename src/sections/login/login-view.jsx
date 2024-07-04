import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { bgGradient } from 'src/theme/css';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Mocked authentication logic
    const { username, password } = data;
    if (username === 'user1' && password === 'password1') {
      // Assuming the JWT token is returned from a successful login
      const token = 'mocked-jwt-token';
      localStorage.setItem('token', token);
      navigate('/client');
    } else {
      alert('Invalid username or password');
    }
  };

  console.log(errors, 'this are errors');

  const renderForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <TextField
          name="username"
          {...register('username', { required: 'Username is required' })}
          label="Username"
        />
        {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          {...register('password', { required: 'Password is required' })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
      </Stack>

      <LoadingButton
        fullWidth
        sx={{ mt: 2 }}
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
      >
        Login
      </LoadingButton>
    </form>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
