import { useContext, useEffect, useState } from 'react';
import { Outlet, Route, Routes } from 'react-router';
import { API } from './API';
import { Header } from './components/Header';
import { Page404 } from './components/Page404';
import { PostPage } from './components/PostPage';
import { SearchPage } from './components/SearchPage';
import { MeContext } from './Contexts';
import { AuthorPage } from './components/AuthorPage';

export function App() {
  // ---------------------------------------------------------------------------
  const [_, updateMe] = useContext(MeContext);

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
          <div id="app">
            <Header />
            <Outlet />
            <footer>Basic Footer</footer>
          </div>
        }
      >
        <Route index element={<SearchPage />} />
        <Route path="post/:postID" element={<PostPage />} />
        <Route path="author/:authorID" element={<AuthorPage />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}
