import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/Login.page';
import SignupPage from './pages/Signup.page';
import CreateGroupPage from './pages/CreateGroup.page';
import GroupPage from './pages/Group.page';
import ViewGroupsPage from './pages/ViewGroups.page';
import React from "react";
import NotFoundPage from "@/pages/NotFound.page";

const router = createBrowserRouter([
  {
    path: '/',
    element: <ViewGroupsPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/group/create',
    element: <CreateGroupPage />,
  },
  {
    path: '/group/:id',
    element: <GroupPage />,
  },
  { path: '*', element: <NotFoundPage /> },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
