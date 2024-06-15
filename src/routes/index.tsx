import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { About, Banners, Categories, Events, Login, NotFound } from '../pages';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/admin/banners' element={<Banners />} />
        <Route path='/admin/categories' element={<Categories />} />
        <Route path='/admin/events' element={<Events />} />
        <Route path='/admin/about' element={<About />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
