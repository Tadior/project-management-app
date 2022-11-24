import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { MainLayouts } from '../ layouts/MainLayouts';
import { NotFound } from '../pages/NotFoundPage/NotFound';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';
import { ProjectsPage } from '../pages/ProjectsPage/ProjectsPage';
import { SignInPage } from '../pages/SignInPage/SignInPage';
import { SignUpPage } from '../pages/SignUpPage/SignUpPage';
import WelcomePage from '../pages/WelcomePage/WelcomePage';
import { store } from '../App';
import { getCookie, getUserCookie } from '../helper/Helper';
import ProjectPage from '../pages/ProjectPage/ProjectPage';
import { columnApi, TaskApi } from '../types/types';
import {
  ProtectedAuthUserRoute,
  ProtectedNotAuthUserRoute,
  ProtectedRoute,
} from './ProtectedRoute/ProtectedRoute';

export const AppRoutes = () => {
  const projectsLoader = async () => {
    try {
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const projectLoader = async () => {
    // const projectId = store.getState().userReducer.activeProjectId;
    const { _id } = getUserCookie()!;
    const projectId = getCookie('projectId');
    console.log('projectID', projectId);
    // const userId = store.getState().userReducer.userData._id;
    const token = getCookie('token');

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
      ).then((data) => {
        console.log('data', data);
        return data;
      });
      console.log('allTasks', allTasks);
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
        <Route index element={<WelcomePage />} />
        <Route element={<ProtectedAuthUserRoute />}>
          <Route path="signIn" element={<SignInPage />} />
          <Route path="signUp" element={<SignUpPage />} />
        </Route>
        <Route element={<ProtectedNotAuthUserRoute />}>
          <Route path="projects" element={<ProjectsPage />} loader={projectsLoader} />
          <Route path="projects/:title" element={<ProjectPage />} loader={projectLoader} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
