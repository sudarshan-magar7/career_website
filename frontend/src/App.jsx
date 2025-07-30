import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import SignupPage from './pages/signup';
import SignInPage from './pages/signin';
import CareerDashboard from './pages/testing';
import CareerLaunchNavbar from './component/navbar'
import './App.css';
import HomePage from './pages/HomePage';

const Layout = () => {
  return (
    <>
      <CareerLaunchNavbar />
      <div className="">
        <Outlet />
      </div>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SignInPage/>,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/login",
        element: <SignInPage />,
      },
      {
        path: "/test",
        element: <HomePage />,
      }
    ],
  },
]);



function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;