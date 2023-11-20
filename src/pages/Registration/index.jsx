import React from 'react';

import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import axios from '../../axios';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';


import styles from './Login.module.scss';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const [avatarUrl, setAvatarUrl] = React.useState('');
  const inputFileRef = React.useRef(null);

  const handleChangeFile = async (evt) => {
    try {
      const formData = new FormData();
      const file = evt.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setAvatarUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert('Bad upload');
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (value) => {
    const values = { ...value, avatarUrl };
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert('Bad log in');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
          <Avatar
            sx={{ width: 100, height: 100 }}
            src={`${avatarUrl}`}
            onClick={() => inputFileRef.current.click()}
          />
        <input
          ref={inputFileRef}
          type="file"
          name='image'
          onChange={handleChangeFile}
          hidden
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Укажите Name' })}
          className={styles.field}
          label="Полное имя"
          fullWidth
        />
        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register('email', { required: 'Укажите почту' })}
          className={styles.field}
          label="E-Mail"
          fullWidth
        />
        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите password' })}
          className={styles.field}
          label="Пароль"
          fullWidth
        />
        <Button
          type="submit"
          disabled={!isValid}
          size="large"
          variant="contained"
          fullWidth
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
