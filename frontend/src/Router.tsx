import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/Login.page';
import SignupPage from './pages/Signup.page';
import CreateGroupPage from './pages/CreateGroup.page';
import GroupPage from './pages/Group.page';
import ViewGroupsPage from './pages/ViewGroups.page';

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
    path: '/group',
    element: <GroupPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
