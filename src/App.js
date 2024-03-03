
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Error from './Pages/ErrorPage';
import { useState } from 'react';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Contacts from './Pages/Contacts';
import { ToastContainer } from 'react-toastify';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <Error />,
      children: [
        { path: "/home/:id", element: <Home /> },
        { path: "/contacts", element: <Contacts /> }
      ]
    },
  ]);

  return (
    <>
      <RouterProvider router={router}>

      </RouterProvider>
      <ToastContainer />
    </>
  );
}

export default App;
