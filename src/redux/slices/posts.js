import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (params = 'new') => {
  const { data } = await axios.get(`/posts/${params}`);
  return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

export const fetchComments = createAsyncThunk('posts/fetchComments', async () => {
  const { data } = await axios.get('/comments');
  return data;
});

export const fetchRemoveComment = createAsyncThunk('posts/fetchRemoveComment', async (id) =>
  axios.delete(`/comment/${id}`)
);

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) =>
  axios.delete(`/posts/${id}`)
);

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
  comments: {
    items: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]: (state, action) => {
      state.posts.items = [];
      state.posts.status = 'loaded';
    },
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: (state, action) => {
      state.tags.items = [];
      state.tags.status = 'loaded';
    },
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
    },
    [fetchComments.pending]: (state) => {
      state.comments.items = [];
      state.comments.status = 'loading';
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = 'loaded';
    },
    [fetchComments.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = 'loaded';
    },
  },
});

export const postsReducer = postsSlice.reducer;
