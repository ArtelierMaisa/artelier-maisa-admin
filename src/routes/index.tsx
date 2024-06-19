import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from '../components';
import { UserProvider } from '../contexts';
import { About, Banners, Categories, Events, Login, NotFound } from '../pages';

export function Router() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute variant='public'>
                <Login />
              </ProtectedRoute>
            }
            errorElement={<NotFound />}
            ErrorBoundary={NotFound}
          />

          <Route
            path='/admin/banners'
            element={
              <ProtectedRoute>
                <Banners />
              </ProtectedRoute>
            }
            errorElement={<NotFound />}
          />
          <Route
            path='/admin/categories'
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            }
            errorElement={<NotFound />}
          />

          <Route
            path='/admin/events'
            element={
              <ProtectedRoute>
                <Events />
              </ProtectedRoute>
            }
            errorElement={<NotFound />}
          />

          <Route
            path='/admin/about'
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
            errorElement={<NotFound />}
          />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
