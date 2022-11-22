import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
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
import ProjectPage from '../pages/ProjectPage/ProjectPage';
import { columnApi, TaskApi } from '../types/types';
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute';

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

const projectLoader = async () => {
  const projectId = store.getState().userReducer.activeProjectId;
  const userId = store.getState().userReducer.userData._id;
  const token = getCookieToken();

  try {
    const responseColumns = await fetch(
      `https://mana-project-back.up.railway.app/boards/${projectId}/columns`,
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }
    );
    const allColumns: columnApi[] = await responseColumns.json();
    const allColumnsIds = allColumns.map((column) => {
      return column._id;
    });
    const responseTasks = async (columnId: string) =>
      await fetch(
        `https://mana-project-back.up.railway.app/boards/${projectId}/columns/${columnId}/tasks`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      );
    const allTasks = await Promise.all(
      allColumnsIds.map(async (item) => {
        const response = await responseTasks(item);
        return response.json();
      })
    ).then((data) => data);
    const out = allColumns.map((column, index) => {
      return { ...column, tasks: allTasks[index] };
    });
    return out;
  } catch (error) {
    console.log(error);
  }
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayouts />}>
      <Route element={<ProtectedRoute />}>
        <Route path="signIn" element={<SignUpPage />} />
        <Route path="signUp" element={<SignUpPage />} />
      </Route>
      <Route index element={<WelcomePage />} />
      <Route path="projects" element={<ProjectsPage />} loader={projectsLoader} />
      <Route path="projects/:title" element={<ProjectPage />} loader={projectLoader} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
