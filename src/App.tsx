import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import MainPage from './routes/MainPage';
import ExplorerPage from './routes/ExplorerPage';
import Root from './routes/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children:[
      {
        path: '/',
        element: <MainPage />,

      },
      {
        path: '/explorer',
        element: <ExplorerPage />
      },
    ]
  },

])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
