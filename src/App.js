import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';

import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login } from './pages';

import { fetchLogin, selectIsAuth } from './redux/slices/auth';


function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);


  React.useEffect(() => {
    dispatch(fetchLogin());
  }, [])


  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/posts/:id' element={<FullPost />}/>
          <Route path='/posts/:id/edit' element={<AddPost />}/>
          <Route path='/add-post' element={<AddPost />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/reg' element={<Registration />}/>
        </Routes>
      </Container>
    </>
  );
}

export default App;
