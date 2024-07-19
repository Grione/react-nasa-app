import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/http';
import './App.css';
import MainPage from './routes/MainPage';
import ExplorerPage from './routes/ExplorerPage';
import Root from './routes/Root';
import FavoritePage from './routes/FavoritesPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <MainPage />,

      },
      {
        path: '/explorer',
        element: <ExplorerPage />
      },
      {
        path: '/favorites',
        element: <FavoritePage />
      },
    ]
  },

])

function App() {
  return <QueryClientProvider client={queryClient}><RouterProvider router={router} /></QueryClientProvider>;
}

export default App;
