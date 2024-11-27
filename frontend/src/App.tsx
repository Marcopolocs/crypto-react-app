import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import appRoutes from './routes/app-routes';
import './index.css';

const App: React.FC = () => {
  const router = createBrowserRouter([...appRoutes()]);

  return <RouterProvider router={router} />;
};

export default App;
