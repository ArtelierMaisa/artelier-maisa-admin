import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { UserProvider } from '../contexts';
import { About, Banners, Categories, Events, Login, NotFound } from '../pages';

export function Router() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} errorElement={<NotFound />} />
          <Route
            path='/admin/banners'
            element={<Banners />}
            errorElement={<NotFound />}
          />
          <Route
            path='/admin/categories'
            element={<Categories />}
            errorElement={<NotFound />}
          />
          <Route
            path='/admin/events'
            element={<Events />}
            errorElement={<NotFound />}
          />
          <Route
            path='/admin/about'
            element={<About />}
            errorElement={<NotFound />}
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
