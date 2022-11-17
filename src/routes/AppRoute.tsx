import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { MainLayouts } from '../ layouts/MainLayouts';
import { NotFound } from '../pages/NotFoundPage/NotFound';
import { ProjectsPage } from '../pages/ProjectsPage/ProjectsPage';
import { SignInPage } from '../pages/SignInPage/SignInPage';
import { SignUpPage } from '../pages/SignUpPage/SignUpPage';
import WelcomePage from '../pages/WelcomePage/WelcomePage';
import { store } from '../App';
import { getCookieToken } from '../helper/Helper';

const projectsLoader = async () => {
  const id = store.getState().userReducer.userData._id;
  const token = getCookieToken();

  try {
    const response = await fetch(`https://mana-project-back.up.railway.app/boardsSet/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
    const out = await response.json();
    return out;
  } catch (error) {
    console.log(error);
  }
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayouts />}>
      <Route index element={<WelcomePage />} />
      <Route path="signIn" element={<SignInPage />} />
      <Route path="signUp" element={<SignUpPage />} />
      <Route path="projects" element={<ProjectsPage />} loader={projectsLoader} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
