import { useContext, useEffect, useState } from 'react';
import { Outlet, Route, Routes } from 'react-router';
import { API } from './API';
import { Header } from './components/Header';
import { Page404 } from './components/Page404';
import { PostPage } from './components/PostPage';
import { PostList } from './components/PostList';
import { MeContext } from './Contexts';

export function App() {
  // ---------------------------------------------------------------------------
  const [me, updateMe] = useContext(MeContext);

  // ---------------------------------------------------------------------------
  useEffect(() => {
    (async () => {
      updateMe(await API.whoAmI());
    })();
  }, []);

  // ---------------------------------------------------------------------------
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="App">
            <Header />
            <Outlet />
            <footer>Basic footer</footer>
          </div>
        }
      >
        <Route path="search" element={<PostList />} />
        <Route path="post/:postID" element={<PostPage />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}