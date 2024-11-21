import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import CruzTiles from '../components/CruzTiles/CruzTiles';
import CruzDetailPage from '../components/CruzDetailPage/CruzDetailPage';
// import MapComponent from '../components/MapComponent/MapComponent';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <CruzTiles />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/cruz/:id",
        element: <CruzDetailPage />,
      },
      {
        path: "*",
        element: <h1>Page Does Not Exist</h1>,
      },
    ],
  },
]);