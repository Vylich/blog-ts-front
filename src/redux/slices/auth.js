import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../axios';

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params) => {
  const { data } = await axios.post('/auth/login', params);
  return data;
});

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async () => {
  const { data } = await axios.get('/auth/me');
  return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
  const { data } = await axios.post('/auth/reg', params);
  return data;
});

const initialState = {
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    }
  },
  extraReducers: {
    [fetchUserData.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchUserData.fulfilled]: (state, action) => {
      state.status = 'loading';
      state.data = action.payload;
    },
    [fetchUserData.rejected]: (state, action) => {
      state.status = 'error';
      state.data = null;
    },
    [fetchLogin.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchLogin.rejected]: (state, action) => {
      state.status = 'error';
      state.data = null;
    },
    [fetchRegister.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchRegister.rejected]: (state, action) => {
      state.status = 'error';
      state.data = null;
    },
  }
});

export const selectIsAuth = state => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const {logout} = authSlice.actions;
