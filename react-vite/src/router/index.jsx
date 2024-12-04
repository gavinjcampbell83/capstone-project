import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import CruzTiles from '../components/CruzTiles/CruzTiles';
import CruzDetailPage from '../components/CruzDetailPage/CruzDetailPage';
import CreateCruzForm from '../components/CreateCruzForm/CreateCruzForm';
import CruzManagementPage from '../components/CruzManagementPage/CruzManagementPage';
import UpdateCruzForm from '../components/UpdateCruzForm/UpdateCruzForm';
import FavoritesPage from '../components/FavoritesPage/FavoritesPage';
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
        path: "/cruz/new",
        element: <CreateCruzForm />,
      },
      {
        path: "/cruz/manage",
        element: <CruzManagementPage />,
      },
      {
        path: "/cruz/:id/edit",
        element: <UpdateCruzForm />,
      },
      {
        path: "/favorites",
        element: <FavoritesPage />,
      },
      {
        path: "*",
        element: <h1>Page Does Not Exist</h1>,
      },
    ],
  },
]);