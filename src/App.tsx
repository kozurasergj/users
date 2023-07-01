import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Users from './components/Users/Users';
import { useAppDispatch } from './hooks/useRedux';
import { fetchAlbums, fetchPosts, fetchUsers } from './store/slices/usersSlice';
import UserAlbums from './components/UserAlbums/UserAlbums';
import UserPosts from './components/UserPosts/UserPosts';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname.includes('/users/') && location.pathname.includes('/albums')) {
      const userId = Number(location.pathname.split('/')[2]);
      dispatch(fetchAlbums(userId));
    } else if (location.pathname.includes('/users/') && location.pathname.includes('/posts')) {
      const userId = Number(location.pathname.split('/')[2]);
      dispatch(fetchPosts(userId));
    }
  }, [dispatch, location]);

  return (
    <Routes>
      <Route path="/users" element={<Users />} />
      <Route path="/users/:userId/albums" element={<UserAlbums />} />
      <Route path="/users/:userId/posts" element={<UserPosts />} />
    </Routes>
  )
}

export default App;
