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
import { getCookie, getUserCookie } from '../helper/Helper';
import ProjectPage from '../pages/ProjectPage/ProjectPage';
import { columnApi, TaskApi } from '../types/types';
import { ProtectedAuthUserRoute, ProtectedNotAuthUserRoute } from './ProtectedRoute/ProtectedRoute';

export const AppRoutes = () => {
  const projectLoader = async () => {
    const projectId = getCookie('projectId');
    const { _id } = getUserCookie()!;
    const token = getCookie('token');

    try {
      const responseColumns = await fetch(
        `https://mana-project-back.up.railway.app/boards/${projectId}/columns`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true',
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
              'Access-Control-Allow-Origin': 'http://localhost:3000',
              'Access-Control-Allow-Credentials': 'true',
            },
          }
        );
      const allTasks: TaskApi[][] = await Promise.all(
        allColumnsIds.map(async (item) => {
          const response = await responseTasks(item);
          return response.json();
        })
      ).then((data) => {
        return data;
      });
      const sortedTasks = allTasks.map((item) => {
        return item.sort((prev, curr) => {
          if (prev.order > curr.order) {
            return 1;
          } else {
            return -1;
          }
        });
      });
      const out = allColumns.map((column, index) => {
        return { ...column, tasks: sortedTasks[index] };
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
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:title" element={<ProjectPage />} loader={projectLoader} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
