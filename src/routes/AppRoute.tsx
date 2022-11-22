import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Routes,
  BrowserRouter,
  useNavigate,
} from 'react-router-dom';
import { MainLayouts } from '../ layouts/MainLayouts';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { NotFound } from '../pages/NotFoundPage/NotFound';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';
import { ProjectsPage } from '../pages/ProjectsPage/ProjectsPage';
import { SignInPage } from '../pages/SignInPage/SignInPage';
import { SignUpPage } from '../pages/SignUpPage/SignUpPage';
import WelcomePage from '../pages/WelcomePage/WelcomePage';
import { store } from '../App';
import { getCookieToken } from '../helper/Helper';
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute';
import { useGetBoardsSetByIdQuery } from '../redux/query/BoardsQuery';
import { useEffect } from 'react';

export const AppRoutes = () => {
  const projectsLoader = async () => {
    try {
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayouts />}>
        <Route index element={<WelcomePage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="signIn" element={<SignUpPage />} />
          <Route path="signUp" element={<SignUpPage />} />
        </Route>
        <Route path="projects" element={<ProjectsPage />} loader={projectsLoader} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
